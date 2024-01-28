export async function readJsonFiles<T>(path: string): Promise<T[]> {
    const target: T[] = []

    // Get filenames and sort
    const filenames: string[] = []
    for await (const file of Deno.readDir(path)) {
        if (file.isFile) {
            filenames.push(file.name)
        }
    }
    filenames.sort();

    for (let i = 0; i < filenames.length; i++) {
        const json = Deno.readTextFileSync(`${path}/${filenames[i]}`);
        const data: T = JSON.parse(json);
        target.push(data)
    }

    return target;
}