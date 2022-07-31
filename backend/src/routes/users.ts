import { Router } from "express";
import {
  getAll,
  create,
  update,
  show,
  remove,
} from "../controllers/user.controller";
import { PeopleWhoCanSeeFreelancer } from "../middleware/validator";

const userRouter = Router();

userRouter.get("/", PeopleWhoCanSeeFreelancer, getAll);
userRouter.get("/:id", PeopleWhoCanSeeFreelancer, show);
userRouter.post("/", PeopleWhoCanSeeFreelancer, create);
userRouter.patch("/:id", PeopleWhoCanSeeFreelancer, update);
userRouter.delete("/:id", PeopleWhoCanSeeFreelancer, remove);

export default userRouter;
