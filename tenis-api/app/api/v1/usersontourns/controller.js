import { prisma } from "../../../database.js";

export const addMeToTourn = async (req, res, next) => {
  const { body = {}, decoded = {} } = req;
  const { id: userId } = decoded;
  try {
    const result = await prisma.UsersOnTourns.create({
      data: {
        ...body,
        userId,
      },
    });
    res.status(201);
    res.json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const addUserToTourn = async (req, res, next) => {
  const { body = {} } = req;
  try {
    const result = await prisma.UsersOnTourns.create({
      data: body,
    });
    res.status(201);
    res.json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const allUsersOnTourns = async (req, res, next) => {
  const { params } = req;
  const { userId, tournId } = params;
  try {
    const [result] = await Promise.all([
      prisma.UsersOnTourns.findMany({
        include: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
          tourn: {
            select: {
              tourname: true,
            },
          },
        },
        where: {
          userId,
          tournId,
        },
      }),
      prisma.UsersOnTourns.count(),
    ]);

    res.json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const idUsersOnTourns = async (req, res, next) => {
  const { params = {}, decoded = {} } = req;
  const { tournId } = params;
  const { id: userId } = decoded;

  try {
    const result = await prisma.UsersOnTourns.findUnique({
      where: {
        userId_tournId: {
          userId,
          tournId,
        },
      },
    });
    if (!result) {
      // (result === null)
      next({
        message: "Relation not found",
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

export const readUsersOnTourns = async (req, res, next) => {
  res.json({
    data: req.data,
  });
};

export const updateUsersOnTourns = async (req, res, next) => {
  const { body = {}, params = {} } = req;
  const { id } = params;

  try {
    const result = await prisma.UsersOnTourns.update({
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

export const removeUserFromTourn = async (req, res, next) => {
  const { body = {} } = req;
  const { userId, tournId } = body;

  try {
    const result = await prisma.UsersOnTourns.delete({
      where: {
        userId_tournId: {
          userId,
          tournId,
        },
      },
    });
    res.json({
      data: result,
    });
    res.status(204);
    res.end();
  } catch (error) {
    next(error);
  }
};
export const deleteUsersOnTourns = async (req, res, next) => {
  const { decoded = {}, params = {} } = req;
  const { id: userId } = decoded;
  const { id: tournId } = params;

  try {
    const result = await prisma.UsersOnTourns.delete({
      where: {
        userId_tournId: {
          userId,
          tournId,
        },
      },
    });
    res.status(201);
    res.json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
