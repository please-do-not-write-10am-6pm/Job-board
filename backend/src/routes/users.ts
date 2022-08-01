import { Router } from "express";
import {
  getAll,
  create,
  update,
  show,
  remove,
  approveUser,
  blockUser,
} from "../controllers/user.controller";
import {
  PeopleWhoCanSeeFreelancer,
  authValidation,
  isAdmin,
} from "../middleware/validator";

const userRouter = Router();

userRouter.get("/", PeopleWhoCanSeeFreelancer, getAll);
userRouter.get("/:id", PeopleWhoCanSeeFreelancer, show);
userRouter.post("/", PeopleWhoCanSeeFreelancer, create);
userRouter.patch("/:id", PeopleWhoCanSeeFreelancer, update);
userRouter.delete("/:id", PeopleWhoCanSeeFreelancer, remove);

userRouter.patch("/:id/approve", authValidation, isAdmin, approveUser);
userRouter.patch("/:id/block", authValidation, isAdmin, blockUser);

export default userRouter;
