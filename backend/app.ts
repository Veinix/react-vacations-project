import express from "express";
import appConfig from "./src/2-utils/app-config";
import vacationController from "./src/6-controllers/vacation-controller"
import authController from "./src/6-controllers/auth-controller"
import dal from "./src/2-utils/dal";
import routeNotFound from "./src/4-middleware/route-not-found";
import catchAll from "./src/4-middleware/catchall";
import cors from "cors";
import 'dotenv/config'
import usersController from "./src/6-controllers/users-controller";

const server = express();

server.use(cors())
server.use(express.json());

// Routes
// server.use("/", express.static(paths.frontendFolder))
server.use("/api/vacations", vacationController);
server.use("/api/auth", authController);
server.use("/api/users", usersController);

// Middleware
// server.use("/*", pageNotFound);
server.use("/api/*", routeNotFound);
server.use("*", routeNotFound);
server.use(catchAll);

server.listen(appConfig.port, async() => {
    await dal.connect();
    console.log("Listening on http://localhost:" + appConfig.port);
});
