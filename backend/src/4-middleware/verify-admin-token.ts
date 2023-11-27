import { NextFunction, Request, Response } from "express";
import cyber from "../2-utils/cyber";

function verifyAdminToken(request: Request, response: Response, next: NextFunction): void {
    const authorizationHeader = request.header("authorization");
    const bearer = authorizationHeader?.split(" ")
    const token = bearer[1]
    cyber.verifyAdmin(token)
    next();
}

export default verifyAdminToken;