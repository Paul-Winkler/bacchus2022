import { readFile } from "fs";

export default async function readJsonFile<T = Object>(path: string): Promise<T> {
    return new Promise((resolve, reject) => {
        readFile(`./${path}`, (err, data) => {
            if (err) reject(err);
            else {
                const parsedData = JSON.parse(data as unknown as string) as T;
                resolve(parsedData);
            }
        });
    });
}