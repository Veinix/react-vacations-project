import express, { NextFunction, Request, Response } from "express";
import StatusCode from "../3-models/status-code";
import vacationService from "../5-services/vacation-service";
import { VacationModel } from "../3-models/vacation-model";
import verifyUserToken from "../4-middleware/verify-user-token";
import verifyAdminToken from "../4-middleware/verify-admin-token";
import JwtToken from "../3-models/jwt-model";

const router = express.Router();
const baseMiddleware = [verifyUserToken];
const adminMiddleware = [verifyAdminToken];

// Vacation Routes
// Read All Vacations
router.get("/", baseMiddleware, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const products = await vacationService.readVacations();
        response.json(products);
    }
    catch (err: any) { next(err) }
});

// Read Single Vacation
router.get("/:_id([0-9a-fA-F]{24})", baseMiddleware, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const _id = request.params._id;
        const vacation = await vacationService.readSingleVacation(_id);
        response.json(vacation);
    }
    catch (err: any) { next(err) };
});

// Read Single Vacation's Followers
router.get("/followers/:_id([0-9a-fA-F]{24})", baseMiddleware, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const _id = request.params._id;
        const followers = await vacationService.readSingleVacationsFollowers(_id);
        response.json(followers);
    }
    catch (err: any) { next(err) };
});

// Read All Vacation's Followers
router.get("/followers/all", baseMiddleware, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacationFollowersArray = await vacationService.readAllVacationsFollowers();
        response.json(vacationFollowersArray);
    }
    catch (err: any) { next(err) };
});

// Create Single Vacation
router.post("/", adminMiddleware, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacation = new VacationModel(request.body);
        const addedVacation = await vacationService.createVacation(vacation);
        response.status(StatusCode.Created).json(addedVacation);
    }
    catch (err: any) { next(err) }
});

// Update Single User's Updated Vacation (Via the vacation id in the request params, and the user in the headers)
router.put("/:_id([0-9a-fA-F]{24})", baseMiddleware, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const authorizationHeader = request.header("authorization");
        const bearer = authorizationHeader?.split(" ")
        const userToken = bearer[1]
        
        const _id = request.params._id;
        await vacationService.updateUsersFollowedVacations(_id, userToken);
        response.sendStatus(StatusCode.Created);
    }
    catch (err: any) { next(err) };
});

// Update Single Vacation
router.put("/:_id", adminMiddleware, async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body._id = request.params._id;
        const vacation = new VacationModel(request.body);
        const updatedVacation = await vacationService.updateVacation(vacation);
        response.json(updatedVacation);
    }
    catch (err: any) { next(err) }
});

// Delete Single Vacation
router.delete("/:_id", adminMiddleware, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const _id = request.params._id;
        await vacationService.deleteVacation(_id);
        response.sendStatus(StatusCode.NoContent);
    }
    catch (err: any) { next(err) }
});

export default router;
