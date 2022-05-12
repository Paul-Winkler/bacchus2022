import readJsonFile from "./readJsonFile";
import writeJsonFile from "./writeJsonFile";

export default async function changeJsonFile<T = Object>(path: string, change: (data: T) => T): Promise<null> {
    return new Promise(async (resolve, reject) => {
        let data: T;
        try {
            data = await readJsonFile<T>(path);
        } catch (e) {
            reject(e);
            return;
        }
        
        data = change(data);

        try {
            await writeJsonFile(path, data);
            resolve(null);
        } catch (e) {
            reject(e);
        }
    });
}