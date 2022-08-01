import { Router } from "express";
import {
  getAll,
  create,
  update,
  show,
  remove,
  approveJob,
  blockJob,
} from "../controllers/job.controller";
import {
  PeopleWhoCanSeeFreelancer,
  authValidation,
  isAdmin,
} from "../middleware/validator";

const jobRouter = Router();

jobRouter.get("/", getAll);
jobRouter.get("/:id", show);
jobRouter.post("/", PeopleWhoCanSeeFreelancer, create);
jobRouter.patch("/:id", PeopleWhoCanSeeFreelancer, update);
jobRouter.delete("/:id", PeopleWhoCanSeeFreelancer, remove);

jobRouter.patch("/:id/approve", authValidation, isAdmin, approveJob);
jobRouter.patch("/:id/block", authValidation, isAdmin, blockJob);

export default jobRouter;
