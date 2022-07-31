import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { verifyToken } from "../utils//jwt";

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  title?: string;
  description?: string;
  rate?: number;
  isApproved: boolean;
  role?: string;
}

export const validation = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const emailReg =
      // eslint-disable-next-line no-useless-escape
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const passwordReg =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    if (!emailReg.test(email)) throw createHttpError(400, "Invalid email");

    if (!passwordReg.test(password)) {
      throw createHttpError(
        400,
        "Password must contain at least 8 characters plus 1 alphabet, 1 special character and 1 number"
      );
    }
    next();
  } catch (error) {
    next(error);
  }
};

export const PeopleWhoCanSeeFreelancer = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  req.user.role !== "freelancer"
    ? next()
    : res.status(403).send("Access Forbidden.");
};

export const isAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  req.user.role === "admin"
    ? next()
    : res.status(403).send("Access Forbidden.");
};

export const PeopleWhoCanApplyBid = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  req.user.role !== "client"
    ? next()
    : res.status(403).send("Access Forbidden");
};

export const isApprovedUser = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  req.user.isApproved === true
    ? next()
    : res.status(403).send("Access Forbidden");
};

export const authValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.headers.authorization && process.env.TOKEN_SECRET) {
    const token = req.headers.authorization.split(" ")[1];

    try {
      const userInfo = verifyToken(token, process.env.TOKEN_SECRET);
      req.user = userInfo.data;
    } catch (error) {
      next(error);
    }
  }
  next();
};
