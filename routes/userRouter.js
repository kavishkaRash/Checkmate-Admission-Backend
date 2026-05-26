import express from "express";
import { blockOrUnblock, createUser, getAllUser, getUser, googleLogin, loginUser } from "../controller/userController.js";

const userRouter = express.Router();

userRouter.post("/", createUser);

userRouter.get("/me", getUser);

userRouter.post("/login", loginUser)

userRouter.post("/google-login", googleLogin);

userRouter.get("/all-users", getAllUser);

userRouter.put("/block/:email", blockOrUnblock);

export default userRouter;
