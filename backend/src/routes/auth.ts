import { Router } from "express";
import {
  signUp,
  signIn,
  getProfileById,
  editOwnProfile,
} from "../controllers/auth.controller";
import {
  validation,
  authValidation,
  isApprovedUser,
} from "../middleware/validator";

const authRouter = Router();

authRouter.post("/signUp", validation, signUp);
authRouter.post("/signIn", signIn);

authRouter.get("/profile", authValidation, isApprovedUser, getProfileById);
authRouter.patch(
  "/profile/edit",
  validation,
  authValidation,
  isApprovedUser,
  editOwnProfile
);

export default authRouter;
