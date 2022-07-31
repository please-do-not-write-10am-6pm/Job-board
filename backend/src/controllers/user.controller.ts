import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { hash } from "bcryptjs";

import prisma from "../prisma";

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let users;
    if (req.user.role === "admin") {
      users = await prisma.user.findMany({
        where: {},
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          title: true,
          description: true,
          rate: true,
          isApproved: true,
        },
      });
    }

    if (req.user.role === "client") {
      users = await prisma.user.findMany({
        where: {
          role: "freelancer",
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          title: true,
          description: true,
          rate: true,
          isApproved: true,
        },
      });
    }

    res.status(200).send({
      status: "Success",
      payload: users,
    });
  } catch (error) {
    next(error);
  }
};

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.user.role === "admin") {
      const { password, ...userInfo } = req.body;

      const newUser = await prisma.user.create({
        data: {
          password: String(await hash(password, 8)),
          ...userInfo,
        },
      });

      res.status(201).send({
        status: "Success",
        payload: newUser,
      });
    } else {
      res.status(403).send({
        status: "Failed",
        payload: "Forbidden User",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: +req.params.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        title: true,
        description: true,
        rate: true,
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

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.user.role === "admin") {
      const { password, ...userInfo } = req.body;

      const user = await prisma.user.findUnique({
        where: {
          id: +req.params.id,
        },
      });

      if (!user) throw createHttpError(404, "User not found");

      const newUser = await prisma.user.update({
        where: {
          id: +req.params.id,
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
    } else {
      res.status(403).send({
        status: "Failed",
        payload: "Forbidden User",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const remove = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.user.role === "admin") {
      const user = await prisma.user.findUnique({
        where: {
          id: +req.params.id,
        },
      });
      if (!user) throw createHttpError(404, "User not found");

      const deleteUser = await prisma.user.delete({
        where: {
          id: +req.params.id,
        },
      });
      res.status(204).send({
        status: "Success",
        payload: deleteUser,
      });
    } else {
      res.status(403).send({
        status: "Failed",
        payload: "Forbidden User",
      });
    }
  } catch (error) {
    next(error);
  }
};
