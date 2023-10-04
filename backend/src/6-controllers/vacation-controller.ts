import express, { NextFunction, Request, Response } from "express";
import StatusCode from "../3-models/status-code";
import vacationService from "../5-services/vacation-service";
import doorman from "../4-middleware/doorman";
import { VacationModel } from "../3-models/vacation-model";

const router = express.Router();

router.get("/", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const products = await vacationService.getAllVacations();
        response.json(products);
    }
    catch (err: any) { next(err) }
});

router.get("/:_id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const _id = request.params._id;
        const vacation = await vacationService.getSingleVacation(_id);
        response.json(vacation);
    }
    catch (err: any) { next(err) };
});

router.get("/followers/:_id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const _id = request.params._id;
        const followers = await vacationService.getVacationFollowers(_id);
        response.json(followers);
    }
    catch (err: any) { next(err) };
});

router.post("/", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacation = new VacationModel(request.body);
        const addedVacation = await vacationService.addVacation(vacation);
        response.status(StatusCode.Created).json(addedVacation);
    }
    catch (err: any) { next(err) }
});

router.put("/:_id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body._id = request.params._id;
        const vacation = new VacationModel(request.body);
        const updatedVacation = await vacationService.updateVacation(vacation);
        response.json(updatedVacation);
    }
    catch (err: any) { next(err) }
});

router.delete("/:_id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const _id = request.params._id;
        await vacationService.deleteVacation(_id);
        response.sendStatus(StatusCode.NoContent);
    }
    catch (err: any) { next(err) }
});

export default router;
