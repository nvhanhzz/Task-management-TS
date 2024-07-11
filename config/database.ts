import mongoose from "mongoose";

export const connect = async (): Promise<void> => {
    try {
        // console.log(parseInt(process.env.TOKEN_EXP, 10));
        await mongoose.connect(process.env.MONGO_URL as string);
        console.log("Connect db success!");
    } catch (error) {
        console.error("Connect db fail!", error);
    }
};