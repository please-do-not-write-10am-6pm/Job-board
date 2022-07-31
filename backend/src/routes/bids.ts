import { Router } from "express";
import {
  getAllOnEachjob,
  create,
  update,
  show,
  remove,
} from "../controllers/bid.controller";
import { PeopleWhoCanApplyBid } from "../middleware/validator";

const bidRouter = Router();

bidRouter.get("/job/:jobId", PeopleWhoCanApplyBid, getAllOnEachjob);
bidRouter.get("/job/:jobId/:bidId", PeopleWhoCanApplyBid, show);
bidRouter.post("/job/:jobId", PeopleWhoCanApplyBid, create);
bidRouter.patch("/job/:jobId/:bidId", PeopleWhoCanApplyBid, update);
bidRouter.delete("/job/:jobId/:bidId", PeopleWhoCanApplyBid, remove);

export default bidRouter;
