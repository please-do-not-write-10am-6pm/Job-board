import { Status } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";

import prisma from "../prisma";

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let jobs;
    const id = req.user.id;
    const active: Status = "active";

    if (req.user.role === "admin") {
      jobs = await prisma.job.findMany({
        include: {
          author: {
            select: {
              name: true,
            },
          },
        },
      });
    }

    if (req.user.role === "client") {
      jobs = await prisma.job.findMany({
        where: {
          authorId: id,
          isApproved: true,
        },
        include: {
          author: {
            select: {
              name: true,
            },
          },
        },
      });
    }

    if (req.user.role === "freelancer") {
      jobs = await prisma.job.findMany({
        where: {
          status: active,
          isApproved: true,
        },
        include: {
          author: {
            select: {
              name: true,
            },
          },
        },
      });
    }

    return res.status(200).send({
      status: "Success",
      payload: jobs,
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
    const { rate, authorId, ...jobInfo } = req.body;

    const newJob = await prisma.job.create({
      data: {
        rate: parseFloat(rate),
        authorId: parseInt(authorId),
        ...jobInfo,
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    res.status(201).send({
      status: "Success",
      payload: newJob,
    });
  } catch (error) {
    next(error);
  }
};

export const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let job;

    if (req.user.role === "admin") {
      job = await prisma.job.findFirst({
        where: {
          id: +req.params.id,
        },
      });
    }
    if (req.user.role === "client" || req.user.role === "freelancer") {
      job = await prisma.job.findFirst({
        where: {
          id: +req.params.id,
          isApproved: true,
        },
      });
    }

    if (!job) throw createHttpError(404, "Job not found");

    res.status(200).send({
      status: "Success",
      payload: job,
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
    const jobInfo = req.body;
    let job;

    if (req.user.role === "admin") {
      job = await prisma.job.findFirst({
        where: {
          id: +req.params.id,
        },
      });
    } else {
      job = await prisma.job.findFirst({
        where: {
          id: +req.params.id,
          isApproved: true,
        },
      });
    }

    if (!job) throw createHttpError(404, "Job not found");

    const newJob = await prisma.job.update({
      where: {
        id: +req.params.id,
      },
      data: jobInfo,
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    res.status(201).send({
      status: "Success",
      payload: newJob,
    });
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
    const job = await prisma.job.findUnique({
      where: {
        id: +req.params.id,
      },
    });

    if (!job) throw createHttpError(404, "Job not found");

    const deleteJob = await prisma.job.delete({
      where: {
        id: +req.params.id,
      },
    });

    res.status(204).send({
      status: "Success",
      payload: deleteJob,
    });
  } catch (error) {
    next(error);
  }
};
