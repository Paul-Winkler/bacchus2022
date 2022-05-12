import rounds from "@/static/data/wines/rounds.json";
import readJsonFile from "@/assets/code/helper/readJsonFile";
import { Round } from "~~/assets/code/interfaces/Round";


/**
 * API CALL:        '/api/round', method: 'GET'
 * QUERY PARAMS:    { id: string }, id of the round, 0 for all rounds
 * EFFEKT:          Reads the user file and responds with it's data
 */
export default defineEventHandler(async (event) => {
  const query = useQuery(event);
  const idUnparsed = query.id;

  if (!idUnparsed) return JSON.stringify(rounds);

  const id = parseInt(idUnparsed as string);
  if (isNaN(id)) {
      event.res.statusCode = 400;
      return { reason: "Die Anfrage wurde ohne mitgegebene ID durchgeführt" };
  }

  if (id === 0) {
    try {
      const data = await readAllRounds(rounds);

      return JSON.stringify(data);
    } catch (e) {
      console.error(e);
      event.res.statusCode = 500;
      return { reason: "Beim Auslesen der Weindaten ist ein Fehler aufgetreten", error: e };
    }
  } else {
    const name = `round-${id}`
    if (!rounds.includes(name)) {
      event.res.statusCode = 404;
      return { reason: "Die angegebene ID existiert nicht" };
    }

    try {
      return JSON.stringify(await readSingleRound(name));
    } catch (e) {
      console.error(e);
      event.res.statusCode = 500;
      return { reason: "Eine Weindatei konnte nicht ausgelesen werden", error: e };
    }
  }
})

async function readAllRounds(rounds: string[]): Promise<Round[]> {
  try {
    const data: Round[] = [];

    for (let i in rounds) {
      data.push(await readSingleRound(rounds[i]));
    }

    return data;
  } catch (e) {
    throw e;
  }
}

async function readSingleRound(name: string): Promise<Round> {
  try {
    return await readJsonFile<Round>(`static/data/wines/${name}.json`);
  } catch (e) {
    throw e;
  }
}