import { prisma } from "../../../database.js";
import { Prisma } from "@prisma/client";
import { signToken } from "../auth.js";
import { transporter } from "../../../mail.js";
import activateAccountBody from "../../html/accountActivation.js";
import {
  LoginSchema,
  UserSchema,
  encryptPassword,
  verifyPassword,
} from "./model.js";

export const signup = async (req, res, next) => {
  const { body = {} } = req;
  const payload = {};
  payload.name = body.name;
  payload.lastname = body.lastname;
  payload.email = body.email;
  payload.password = body.password;

  try {
    const { success, data, error } = await UserSchema.safeParseAsync({
      ...payload,
      profilePhoto: req.file?.path,
    });
    if (!success) {
      return next({
        message: "Validator error",
        status: 400,
        error,
      });
    }
    console.log(data);
    const password = await encryptPassword(data.password);
    console.log(password);
    const result = await prisma.User.create({
      data: {
        ...data,
        password,
      },
      select: {
        email: true,
      },
    });
    req.body.email = result.email;
    next();
    /* res.status(201);
    res.json({
      data: result,
    });*/
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return next({
          message: "A user account already exists with this email",
          status: 409, // Unauthorized
        });
      }
    }
    next(error);
  }
};

export const confirmation = async (req, res, next) => {
  const { body = {} } = req;
  const { email } = body;

  try {
    const user = await prisma.User.findUnique({
      where: {
        email,
        active: false,
      },
    });

    if (user === null) {
      return next({
        message: "Confirmation failed",
        status: 400,
      });
    } else {
      const token = signToken({ email }, "2h");
      console.log(process.env.WEB_URL);
      await transporter.sendMail({
        from: `TT ${process.env.EMAIL_SENDER}`,
        to: email,
        subject: "Activate your account",
        text: `
          Visit the following link to activate your account:
          ${process.env.WEB_URL}/activate/${token}
        `,
        html: activateAccountBody(token),
      });

      res.status(201);
      res.json({
        data: user,
        meta: {
          token,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};

export const activate = async (req, res, next) => {
  const { decoded = {} } = req;
  const { email } = decoded;

  try {
    const user = await prisma.User.update({
      where: {
        email,
      },
      select: {
        name: true,
        email: true,
        profilePhoto: true,
      },
      data: {
        active: true,
      },
    });
    if (user === null) {
      return next({
        message: "Activation failed",
        status: 400,
      });
    } else {
      res.json({
        data: user,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { body } = req;

  try {
    const { success, data, error } = await LoginSchema.safeParseAsync(body);
    if (!success) {
      return next({
        message: "Validator error",
        status: 400,
        error,
      });
    }
    const { email, password } = data;
    const user = await prisma.User.findUnique({
      where: {
        email,
        active: true,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        profilePhoto: true,
      },
    });
    if (user === null) {
      return next({
        message: "Invalid email or password",
        status: 401, // Unauthorized
      });
    }
    const passwordMatch = await verifyPassword(password, user.password);

    if (!passwordMatch) {
      return next({
        message: "Invalid email or password",
        status: 401, // Unauthorized
      });
    }
    const { id } = user;
    const token = signToken({ id });
    res.json({
      data: {
        ...user,
        id: undefined,
        password: undefined,
      },
      meta: {
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const allUsers = async (req, res, next) => {
  const { query, params } = req;
  const { tournId } = params;

  try {
    const [result, total] = await Promise.all([
      prisma.User.findMany({
        select: {
          name: true,
          email: true,
          tourns: {
            // Para que solo me traiga estos campos
            select: {
              tourn: true,
            },
          },
        },
      }),
      prisma.User.count(),
    ]);

    res.json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const idUser = async (req, res, next) => {
  const { params = {} } = req;
  try {
    const result = await prisma.User.findUnique({
      where: {
        id: params.id,
      },
      include: {
        tourns: {
          // Para que solo me traiga estos campos
          select: {
            id: true,
            tourname: true,
          },
        },
      },
    });
    if (!result) {
      // (result === null)
      next({
        message: "User not found",
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

export const myInfo = async (req, res, next) => {
  const { decoded = {} } = req;
  const { id: userId } = decoded;
  try {
    const result = await prisma.User.findUnique({
      include: {
        tourns: {
          select: {
            id: true,
            tourname: true,
          },
        },
      },
      where: {
        id: userId,
      },
    });

    res.json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const readUser = async (req, res, next) => {
  res.json({
    data: req.data,
  });
};

export const updateUser = async (req, res, next) => {
  const { body = {}, params = {} } = req;
  const { id } = params;
  const payload = {};
  payload.name = body.name;

  try {
    const { success, data, error } = await UserSchema.partial().safeParseAsync({
      ...payload,
      profilePhoto: req.file?.path,
    });
    if (!success) {
      return next({
        message: "Validator error",
        status: 400,
        error,
      });
    }
    const result = await prisma.User.update({
      where: {
        id,
      },
      data: {
        data,
      },
    });

    res.json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const removeUser = async (req, res, next) => {
  const { params = {} } = req;
  const { id } = params;

  try {
    await prisma.User.delete({
      where: { id },
    });
    res.status(204);
    res.end();
  } catch (error) {
    next(error);
  }
};
