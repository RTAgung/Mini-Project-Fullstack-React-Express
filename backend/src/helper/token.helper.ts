import jwt from "jsonwebtoken";

export function getTokenData(token: any): any {
    const decodedToken = jwt.decode(token);

    if (
        !decodedToken ||
        typeof decodedToken !== "object" ||
        !("___" in decodedToken)
    ) {
        throw new Error("Token missing required `___` field");
    }

    const buffer = Buffer.from(decodedToken.___, "base64");
    const data = buffer.toString("utf-8");

    return JSON.parse(data);
}
