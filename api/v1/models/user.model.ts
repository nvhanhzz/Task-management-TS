import mongoose from "mongoose";

const userSchema: mongoose.Schema = new mongoose.Schema(
    {
        fullName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        deleted: { type: Boolean, default: false }
        // phone
        // avatar
        // status
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema, "users");

export default User;