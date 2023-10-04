import express, { NextFunction, Request, Response } from "express";
import StatusCode from "../3-models/status-code";
import CredentialsModel from "../3-models/credential-model";
import UserModel from "../3-models/user-model";
import authService from "../5-services/auth-service";

const router = express.Router();

router.post("/register", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = new UserModel(request.body);
        const token = await authService.register(user);
        response.status(StatusCode.Created).json(token);
    }
    catch (err: any) {
        next(err);
    }
});

router.post("/login", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const credentials = new CredentialsModel(request.body);
        const token = await authService.login(credentials);
        response.json(token);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;

