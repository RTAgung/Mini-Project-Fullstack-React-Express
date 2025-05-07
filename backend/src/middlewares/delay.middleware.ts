import { Request, Response, NextFunction } from "express";

export function delayMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const delay = 500; // Delay in milliseconds
    setTimeout(() => {
        next();
    }, delay);
}
