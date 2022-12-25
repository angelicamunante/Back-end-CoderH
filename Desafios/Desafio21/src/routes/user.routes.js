import { Router } from "express";
const userRouter = Router();
import { registerUser } from "../controllers/user.controller.js";

userRouter.post("/register", registerUser);

export default userRouter;