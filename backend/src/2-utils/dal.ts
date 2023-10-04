import appConfig from "./app-config";
import mongoose from "mongoose";

// MongoDB Connection
async function connect(): Promise<void> {
    try {
        const db = await mongoose.connect(appConfig.mongoDbUri);
        console.log("Connected to MongoDB successfully");
        console.log(`Database: ${db.connections[0].name}`);
    }
    catch(err: any) {
        console.log(err)
    }
}

export default {
    connect
};