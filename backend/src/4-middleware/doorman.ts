import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../3-models/error-models";
import appConfig from "../2-utils/app-config";

function doorman(request: Request, response: Response, next: NextFunction): void {
    const doormanKey = appConfig.apiKey

    if(request.header("doormanKey") !== doormanKey) {
        next(new UnauthorizedError("You are not authorized!"));
        return;
    }

    next();
}

export default doorman;
