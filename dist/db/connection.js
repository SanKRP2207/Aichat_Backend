import { connect, disconnect } from "mongoose";
async function connectToDatabase() {
    try {
        // await connect(process.env.MONGODB_URL);
        const mongodbUrl = process.env.MONGODB_URL;
        if (!mongodbUrl) {
            throw new Error("MONGODB_URL is not defined");
        }
        await connect(mongodbUrl);
    }
    catch (error) {
        console.log(error);
        throw new Error("cannot connect to the database");
    }
}
async function dixconnectfromdatabase() {
    try {
        await disconnect();
    }
    catch (error) {
        console.log(error);
        throw new Error("cannot connect to the database");
    }
}
export { connectToDatabase, dixconnectfromdatabase };
