import { Router } from "express";
import {
  signUp,
  signIn,
  approveUser,
  blockUser,
  getProfileById,
  editOwnProfile,
  approveJob,
  blockJob,
} from "../controllers/auth.controller";
import {
  validation,
  authValidation,
  isApprovedUser,
  isAdmin,
} from "../middleware/validator";

const authRouter = Router();

authRouter.post("/signUp", validation, signUp);
authRouter.post("/signIn", signIn);
authRouter.patch("/user/approved/:id", authValidation, isAdmin, approveUser);
authRouter.patch("/user/block/:id", authValidation, isAdmin, blockUser);
authRouter.get("/profile", authValidation, isApprovedUser, getProfileById);
authRouter.patch(
  "/profile/edit",
  validation,
  authValidation,
  isApprovedUser,
  editOwnProfile
);
authRouter.patch("/job/approved/:id", authValidation, isAdmin, approveJob);
authRouter.patch("/job/block/:id", authValidation, isAdmin, blockJob);

export default authRouter;
