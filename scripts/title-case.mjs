import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const enAffixDir = path.join(__dirname, '../lexicon/en/affixes');
const DRY_RUN = !Deno.args.includes('--apply');
const LOG_FILE = path.join(__dirname, '../logs/title-case-diff.log');

let logContent = '# Title Case Normalization Diff\n\n';
let count = 0;

// 使用不可见私有区字符作为占位符，防止被 toLowerCase 破坏
const PH_START = '\uE000';
const PH_END = '\uE001';

function smartTitleCase(text) {
    if (!text) return text;

    // 1. 保护方括号、圆括号、引号内的内容
    const placeholders = [];
    let protectedText = text.replace(/(\[[^\]]+\]|\([^)]+\)|“[^”]+”|‘[^’]+’)/g, (match) => {
        placeholders.push(match);
        return `${PH_START}${placeholders.length - 1}${PH_END}`;
    });

    // 2. 按空白字符和斜杠切分，但保留分隔符
    const tokens = protectedText.split(/(\s+|\/)/);

    // 虚词列表 (仅保留最基础的冠词和连词)
    const smallWords = new Set([
        'a', 'an', 'and', 'of', 'the', 'or'
    ]);

    let isFirstWord = true;

    // 找出最后一个有效单词的索引（排除空白和斜杠）
    let lastRealWordIndex = tokens.length - 1;
    while (lastRealWordIndex >= 0 && (/^\s+$/.test(tokens[lastRealWordIndex]) || tokens[lastRealWordIndex] === '/')) {
        lastRealWordIndex--;
    }

    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];

        if (/^\s+$/.test(token) || token === '/') continue;

        // 如果这个 token 完全由占位符组成，直接跳过
        if (token === `${PH_START}${i}${PH_END}` || /^\uE000\d+\uE001$/.test(token)) {
            isFirstWord = false;
            continue;
        }

        let processedToken = token;

        // 处理带有连字符的复合词
        if (token.includes('-')) {
            processedToken = token.split('-').map((part, index) => {
                if (/^\d+$/.test(part)) return part;
                if (part.length > 1 && part === part.toUpperCase()) return part;
                const lowerPart = part.toLowerCase();
                if (smallWords.has(lowerPart) && index !== 0 && index !== token.split('-').length - 1) {
                    return lowerPart;
                }
                return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
            }).join('-');
        } else {
            const lowerToken = token.toLowerCase();

            // ✅ 修复：保护原本是大写的单字母（如 A）
            if (token.length === 1 && token === token.toUpperCase()) {
                processedToken = token;
            } else if (smallWords.has(lowerToken) && !isFirstWord && i !== lastRealWordIndex) {
                processedToken = lowerToken;
            } else if (token.length > 1 && token === token.toUpperCase()) {
                processedToken = token;
            } else {
                processedToken = token.charAt(0).toUpperCase() + token.slice(1).toLowerCase();
            }
        }

        tokens[i] = processedToken;
        isFirstWord = false;
    }

    let result = tokens.join('');

    // 3. 还原括号和引号
    result = result.replace(new RegExp(`${PH_START}(\\d+)${PH_END}`, 'g'), (_, index) => {
        const match = placeholders[parseInt(index, 10)];
        if (match.startsWith('“') || match.startsWith('‘')) {
            const inner = match.slice(1, -1);
            if (inner.length > 0) {
                const upperInner = inner.charAt(0).toUpperCase() + inner.slice(1);
                return match.charAt(0) + upperInner + match.slice(-1);
            }
        }
        return match;
    });

    return result;
}

function processFile(filePath) {
    const rawData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    if (!Array.isArray(rawData)) return;

    let modified = false;

    for (const item of rawData) {
        if (!item.description) continue;
        const original = item.description;

        let formatted = smartTitleCase(original);

        // ✅ 修复：强制修正特定特殊词缀
        if (item.name === 'IPE') formatted = formatted.replace('(Quasi-)long', '(Quasi-)Long');
        if (item.name === 'PFL') formatted = formatted.replace('(Quasi-)flat', '(Quasi-)Flat');
        if (item.name === 'PLE') formatted = formatted.replace('(Dis-)pleasure', '(Dis-)Pleasure');
        if (item.name === 'M05') formatted = formatted.replace(/\[anti\]parallel/i, '(Anti-)Parallel'); // 修复正则匹配
        if (item.name === 'LDA') formatted = formatted.replace('Measurement a *', 'Measurement A *'); // 新增 LDA 修正

        if (original !== formatted) {
            modified = true;
            count++;
            item.description = formatted;

            logContent += `## ${item.name}\n`;
            logContent += `- **Old**: ${original}\n`;
            logContent += `+ **New**: ${formatted}\n\n`;
        }
    }

    if (modified && !DRY_RUN) {
        fs.writeFileSync(filePath, JSON.stringify(rawData, null, 2) + '\n', 'utf-8');
    }
}

function traverse(dir) {
    for (const file of fs.readdirSync(dir)) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) traverse(fullPath);
        else if (file.endsWith('.json')) processFile(fullPath);
    }
}

console.log(DRY_RUN ? '👀 [DRY-RUN] 正在预览 Title Case 转换结果...' : '🚀 [APPLY] 正在应用 Title Case 并落盘...');
traverse(enAffixDir);
fs.writeFileSync(LOG_FILE, logContent, 'utf-8');

console.log(`\n✅ 处理完成！共 ${count} 条描述被修改。`);
console.log(`📄 详细对比日志已写入: ${LOG_FILE}`);