import express, { NextFunction, Request, Response } from "express";
import userService from "../5-services/user-service";
import StatusCode from "../3-models/status-code";

const router = express.Router();

router.get("/:_id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const _id = request.params._id;
        const user = await userService.getUser(_id);
        response.json(user);
    }
    catch (err: any) { next(err) };
});

router.get("/", async (request: Request, response: Response, next: NextFunction) =>{
    try {
        const users = await userService.getAllUsers()
        response.json(users)
    } catch(err: any) {
        next(err)
    }
});

export default router;