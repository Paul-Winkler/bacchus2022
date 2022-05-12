const passwd = "22bacc22";

/**
 * API CALL:        '/api/auth', method: 'POST'
 * QUERY PARAMS:    { p: string }, event password
 * EFFEKT:          returns true if the password is correct
 */
export default defineEventHandler(async (event) => {
    const query = useQuery(event);
    const givenPasswd = query.p as string;

    if (passwd === givenPasswd) {
        return {};
    }

    event.res.statusCode = 400;
    return { reason: "Authentifizierung fehlgeschlagen" };
})