import { prisma } from "../../../database.js";
import { parsePaginationParams } from "../../../utils.js";
import { TournSchema } from "./model.js";

export const createTourn = async (req, res, next) => {
  const { body = {}, decoded = {} } = req;
  const payload = {};
  payload.startsAt = body.startsAt;
  payload.tourname = body.tourname;
  payload.duration = Number(body.duration);
  try {
    const { success, data, error } = await TournSchema.safeParseAsync({
      ...payload,
    });
    if (!success) {
      return next({
        message: "Validation error",
        status: 400,
        error,
      });
    }
    try {
      const result = await prisma.Tourn.create({
        data: {
          ...data,
        },
      });
      res.status(201);
      res.json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

export const myTourns = async (req, res, next) => {
  const { query, decoded = {} } = req;
  const { id: userId } = decoded;
  const { offset, limit } = parsePaginationParams(query);

  try {
    const [result, total] = await Promise.all([
      prisma.Tourn.findMany({
        skip: offset,
        take: limit,
        orderBy,
        select: {
          tourname: true,
        },
        where: {
          userId,
        },
      }),
      prisma.Tourn.count(),
    ]);

    res.json({
      data: result,
      meta: {
        limit,
        offset,
        total,
        orderBy,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const allTourns = async (req, res, next) => {
  const { params } = req;
  const { userId } = params;

  try {
    const [result, total] = await Promise.all([
      prisma.Tourn.findMany({
        /*include: {
          users: {
            select: {
              name: true,
              email: true,
            },
          },
        },*/
        where: {
          userId,
        },
      }),
      prisma.Tourn.count(),
    ]);

    res.json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const idTourn = async (req, res, next) => {
  const { params = {} } = req;
  try {
    const result = await prisma.Tourn.findUnique({
      include: {
        users: {
          // Para que solo me traiga estos campos
          select: {
            name: true,
            email: true,
          },
        },
      },
      where: {
        id: params.id,
      },
    });
    if (!result) {
      // (result === null)
      next({
        message: "Tourn not found",
        status: 404,
      });
    } else {
      req.data = result;
      next();
    }
  } catch (error) {
    next(error);
  }
};

export const readTourn = async (req, res, next) => {
  res.json({
    data: req.data,
  });
};

export const updateTourn = async (req, res, next) => {
  const { body = {}, params = {} } = req;
  const { id } = params;

  try {
    const result = await prisma.Tourn.update({
      where: {
        id,
      },
      data: body,
    });

    res.json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const removeTourn = async (req, res, next) => {
  const { params = {} } = req;
  const { id } = params;

  try {
    await prisma.Tourn.delete({
      where: { id },
    });
    res.status(204);
    res.end();
  } catch (error) {
    next(error);
  }
};
