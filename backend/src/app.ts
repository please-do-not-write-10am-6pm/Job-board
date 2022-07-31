import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";

import authRouter from "./routes/auth";
import userRouter from "./routes/users";
import jobRouter from "./routes/jobs";
import bidRouter from "./routes/bids";
import { authValidation, isApprovedUser, User } from "./middleware/validator";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user: User;
    }
  }
}

const app: Application = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  res.status(error.status || 500).send({
    status: "Error",
    message: error.message || "Internal Server Error",
  });
});

app.use("/api", authRouter);
app.use("/api/users", authValidation, isApprovedUser, userRouter);
app.use("/api/jobs", authValidation, isApprovedUser, jobRouter);
app.use("/api/bids", authValidation, isApprovedUser, bidRouter);

export default app;
