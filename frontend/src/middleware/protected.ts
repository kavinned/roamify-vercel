import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { parseCookies } from "../utils/parseCookies";

interface UserPayload {
    id: string;
    email: string;
    name: string;
}

export interface RequestWithUser extends Request {
    user?: UserPayload;
}

export const verifyJWT = (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
): void => {
    const cookieHeader = req.headers.cookie;
    const cookies = parseCookies(cookieHeader);
    const token = cookies.token;

    if (!token) {
        res.status(401).json({ message: "Unauthorized: No token provided" });
        return;
    }

    jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
        if (err) {
            console.log("Token Verification Error:", err);
            res.status(401).json({ message: "Unauthorized: Invalid token" });
            return;
        }

        req.user = decoded as UserPayload;

        next();
    });
};
