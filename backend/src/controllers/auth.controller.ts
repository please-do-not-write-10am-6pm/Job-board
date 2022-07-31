import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { hash, compare } from "bcryptjs";

import prisma from "../prisma";
import { generateToken } from "../utils/jwt";

const ifUserExists = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
};

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (await ifUserExists(req.body.email))
      throw createHttpError(400, "User with the email already exists");

    const { password, rate, ...userInfo } = req.body;

    const newUser = await prisma.user.create({
      data: {
        rate: parseFloat(rate),
        password: String(await hash(password, 8)),
        ...userInfo,
      },
    });

    const token = await generateToken(
      {
        data: newUser,
        scope: "auth",
      },
      `${process.env.TOKEN_SECRET}`
    );

    res.status(201).send({
      status: "Success",
      payload: newUser,
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });

    if (!user || !(await compare(req.body.password, user.password))) {
      throw createHttpError(400, "Email or password do not match");
    }

    const token = await generateToken(
      {
        data: user,
        scope: "auth",
      },
      `${process.env.TOKEN_SECRET}`
    );
    res.status(200).send({
      status: "Success",
      payload: user,
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const approveUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await prisma.user.update({
      where: { id: +req.params.id },
      data: { isApproved: true },
    });

    if (!user) throw createHttpError(404, "User not found");

    res.status(200).send({
      status: "Success",
      payload: user,
    });
  } catch (error) {
    next(error);
  }
};

export const blockUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await prisma.user.update({
      where: { id: +req.params.id },
      data: { isApproved: false },
    });

    if (!user) throw createHttpError(404, "User not found");

    res.status(200).send({
      status: "Success",
      payload: user,
    });
  } catch (error) {
    next(error);
  }
};

export const approveJob = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const job = await prisma.job.update({
      where: { id: +req.params.id },
      data: { isApproved: true },
    });
    if (!job) throw createHttpError(404, "Job not found");

    res.status(200).send({
      status: "Success",
      payload: job,
    });
  } catch (error) {
    next(error);
  }
};

export const blockJob = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const job = await prisma.job.update({
      where: { id: +req.params.id },
      data: { isApproved: false },
    });

    if (!job) throw createHttpError(404, "Job not found");
  } catch (error) {
    next(error);
  }
};

export const getProfileById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: +req.user.id,
      },
    });

    if (!user) throw createHttpError(404, "User not found");

    res.status(200).send({
      status: "Success",
      payload: user,
    });
  } catch (error) {
    next(error);
  }
};

export const editOwnProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { oldPassword, password, ...userInfo } = req.body;

    const user = await prisma.user.findUnique({
      where: { id: +req.user.id },
    });

    if (!!user && !(await compare(oldPassword, user.password))) {
      createHttpError(422, "Old password doesn't match...");
    }

    if (!user) throw createHttpError(404, "User not found");

    const newUser = await prisma.user.update({
      where: {
        id: +req.user.id,
      },
      data: {
        password: String(await hash(password, 8)),
        ...userInfo,
      },
    });

    res.status(201).send({
      status: "Success",
      payload: newUser,
    });
  } catch (error) {
    next(error);
  }
};
