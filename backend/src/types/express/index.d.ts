import { UserPayload } from "../../helper/token.helper";

declare global {
    namespace Express {
        interface Request {
            user?: UserPayload;
        }
    }
}
