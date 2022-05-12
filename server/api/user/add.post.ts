import fileExists from "~~/assets/code/helper/fileExists";
import changeJsonFile from "~~/assets/code/helper/changeJsonFile";
import writeJsonFile from "~~/assets/code/helper/writeJsonFile";
import { createUserWithName, userIsInitialized } from "~~/assets/code/interfaces/User";


/**
 * API CALL:        '/api/user/add', method: 'POST'
 * QUERY PARAMS:    { surname: string; name: string }, surname and name of user
 * EFFEKT:          Registers the user and creates a user file
 */
export default defineEventHandler(async (event) => {
    const query = useQuery(event);
    const [surname, name] = [query.surname as string, query.name as string];
    
    const user = createUserWithName(surname, name);

    if (!userIsInitialized(user)) {
        event.res.statusCode = 400;
        return { reason: "Es wurden nicht genügend Argumente angegeben: Für eine korrekte Anfrage werden Name, Vorname und Pseudonym benötigt"};
    }

    const alreadyExists = await fileExists(`static/data/user/${user.id}.json`);
    if (alreadyExists) {
        event.res.statusCode = 400;
        return { reason: "Diese Person existiert bereits"};
    }

    try {
        changeJsonFile("static/data/user/all.json", (data) => {
            data["allUser"].push(user.id);
            return data;
        });
    } catch (e) {
        console.error(e);
        event.res.statusCode = 500;
        return { reason: "Die Person konnte nicht registriert werden", error: e };
    }

    try {
        await writeJsonFile(`static/data/user/${user.id}.json`, user);
        return {};
    } catch (e) {
        console.error(e);
        event.res.statusCode = 500;
        return { reason: "Eine Datei konnte nicht geschrieben werden", error: e };
    }
})