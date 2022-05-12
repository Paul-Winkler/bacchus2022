import readJsonFile from "~~/assets/code/helper/readJsonFile";
import changeJsonFile from "~~/assets/code/helper/changeJsonFile";
import User, { Answer } from "~~/assets/code/interfaces/User";
import UserRegistry from "~~/assets/code/interfaces/UserRegistry";
import { Round } from "~~/assets/code/interfaces/Round";


/**
 * API CALL:        '/api/user/answer', method: 'POST'
 * QUERY PARAMS:    { id: string; answer: "blue" | "yellow"; round: number }, id of the user, their answer and the associated round
 * EFFEKT:          Registers the user's answer in the round file and user data
 */
export default defineEventHandler(async (event) => {
    const query = useQuery(event);
    const [id, answer, round] = [query.id as string, query.answer as Answer, parseInt(query.round as string)];


    if (!id || !answer || Number.isNaN(round)) {
        event.res.statusCode = 400;
        return { reason: "Nicht genügend oder falsche Argumente: Für eine korrekte Anfrage werden ID, Antwort und Punkte benötigt" };
    }

    try {
        const users = await readJsonFile<UserRegistry>("static/data/user/all.json");
        if (!users.allUser.includes(id)) {
            event.res.statusCode = 404;
            return { reason: "Die angegebene ID existiert nicht" };
        }
    } catch (e) {
        console.error(e);
        event.res.statusCode = 500;
        return { reason: "Die Registerdatei konnte nicht ausgelesen werden", error: e };
    }

    try {
        await changeJsonFile<User>(`static/data/user/${id}.json`, (data) => {
            data.answers.push(answer);
            return data;
        })
    } catch (e) {
        console.error(e);
        event.res.statusCode = 500;
        return { reason: "Die Nutzerdatei konnte nicht geändert werden", error: e };
    }

    try {
        await changeJsonFile<Round>(`static/data/wines/round-${round}.json`, (data) => {
            (answer === "yellow" ? data.yellow : data.blue).choosenBy.push(id);
            return data;
        })
    } catch (e) {
        console.error(e);
        event.res.statusCode = 500;
        return { reason: "Die Nutzerdatei konnte nicht geändert werden", error: e };
    }

    return {};
})