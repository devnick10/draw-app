import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config"

export const authMidlleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token || "";
    console.log(token);
    try {
        const decode = jwt.verify(token, JWT_SECRET) as JwtPayload
        if (decode.userId) {
            // @ts-ignore
            req.userId = decode.userId
            next();
        } else {
            res.status(401).json({
                message: "Unauthorized"
            })
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}