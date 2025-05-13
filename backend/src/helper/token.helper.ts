import jwt from "jsonwebtoken";

export interface UserPayload {
    id: string;
    email: string;
    username: string;
}

export function getTokenData(token: any): UserPayload {
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
