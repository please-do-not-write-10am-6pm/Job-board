import { Router } from "express";
import {
  getAll,
  create,
  update,
  show,
  remove,
} from "../controllers/job.controller";
import { PeopleWhoCanSeeFreelancer } from "../middleware/validator";

const jobRouter = Router();

jobRouter.get("/", getAll);
jobRouter.get("/:id", show);
jobRouter.post("/", PeopleWhoCanSeeFreelancer, create);
jobRouter.patch("/:id", PeopleWhoCanSeeFreelancer, update);
jobRouter.delete("/:id", PeopleWhoCanSeeFreelancer, remove);

export default jobRouter;
