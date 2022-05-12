import { writeFile } from "fs";

export default async function writeJsonFile(path: string, data: Object): Promise<Object> {
    return new Promise((resolve, reject) => {
        const writeData = JSON.stringify(data, null, 2);

        writeFile(`./${path}`, writeData, (err) => {
            if (err) reject(err);
            else resolve(null);
        });
    });
}