import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";

import prisma from "../prisma";

export const getAllOnEachjob = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let bids;
    if (req.user.role === "admin") {
      bids = await prisma.bids.findMany({
        where: {
          jobId: +req.params.jobId,
        },
        include: {
          author: {
            select: {
              name: true,
              email: true,
            },
          },
        },
        orderBy: {
          id: "asc",
        },
      });
    } else if (req.user.role === "client") {
      bids = await prisma.bids.findMany({
        where: {
          jobId: +req.params.jobId,
        },
        include: {
          author: {
            select: {
              name: true,
              email: true,
            },
          },
        },
        orderBy: {
          id: "asc",
        },
      });
    } else {
      bids = await prisma.bids.findMany({
        where: {
          authorId: req.user.id,
          jobId: +req.params.jobId,
        },
        include: {
          author: {
            select: {
              name: true,
              email: true,
            },
          },
        },
        orderBy: {
          id: "asc",
        },
      });
    }

    return res.status(200).send({
      status: "Success",
      payload: bids,
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
    const { rate, ...bidInfo } = req.body;

    const newBid = await prisma.bids.create({
      data: {
        jobId: parseInt(req.params.jobId),
        authorId: req.user.id,
        rate: parseInt(rate),
        ...bidInfo,
      },
    });

    res.status(201).send({
      status: "Success",
      payload: newBid,
    });
  } catch (error) {
    next(error);
  }
};

export const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bid = await prisma.bids.findFirst({
      where: {
        id: +req.params.bidId,
        authorId: +req.user.id,
        jobId: +req.params.jobId,
      },
    });

    if (!bid) throw createHttpError(404, "Bid not found");

    res.status(200).send({
      status: "Success",
      payload: bid,
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
    const { rate, ...bidInfo } = req.body;

    const bid = await prisma.bids.findFirst({
      where: {
        id: +req.params.bidId,
        authorId: +req.user.id,
        jobId: +req.params.jobId,
      },
    });

    if (!bid) throw createHttpError(404, "Bid not found");

    await prisma.bids.updateMany({
      where: {
        id: +req.params.bidId,
        authorId: +req.user.id,
        jobId: +req.params.jobId,
      },
      data: {
        rate: parseInt(rate),
        ...bidInfo,
      },
    });

    const updatedBid = await prisma.bids.findFirst({
      where: {
        id: +req.params.bidId,
        authorId: +req.user.id,
        jobId: +req.params.jobId,
      },
    });

    res.status(201).send({
      status: "Success",
      payload: updatedBid,
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
    const bid = await prisma.bids.findFirst({
      where: {
        id: +req.params.bidId,
        authorId: +req.user.id,
        jobId: +req.params.jobId,
      },
    });

    if (!bid) throw createHttpError(404, "Bid not found");

    const deleteBid = await prisma.bids.deleteMany({
      where: {
        id: +req.params.bidId,
        authorId: +req.user.id,
        jobId: +req.params.jobId,
      },
    });

    res.status(204).send({
      status: "Success",
      payload: deleteBid,
    });
  } catch (error) {
    next(error);
  }
};
