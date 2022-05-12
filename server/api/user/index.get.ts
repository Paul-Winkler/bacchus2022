import readJsonFile from "~~/assets/code/helper/readJsonFile";


/**
 * API CALL:        '/api/user', method: 'GET'
 * QUERY PARAMS:    { id: string}, id of the targeted user
 * EFFEKT:          Reads the user file and responds with it's data
 */
export default defineEventHandler(async (event) => {
    const query = useQuery(event);
    const id = query.id;

    if (!id) {
        event.res.statusCode = 400;
        return { reason: "Für eine korrekte Anfrage wird eine ID benötigt" };
    }

    try {
        const users = await readJsonFile("static/data/user/all.json");
        if (!users["allUser"].includes(id)) {
            return JSON.stringify(users["allUser"]);
        }
    } catch (e) {
        console.error(e);
        event.res.statusCode = 500;
        return { reason: "Eine Datei konnte nicht ausgelesen werden", error: e };
    }

    try {
        const user = await readJsonFile(`static/data/user/${id}.json`);
        return JSON.stringify(user);
    } catch (e) {
        console.error(e);
        event.res.statusCode = 500;
        return { reason: "Eine Datei konnte nicht ausgelesen werden", error: e };
    }
})