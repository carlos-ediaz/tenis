import { Router } from "express";

import * as controller from "./controller.js";
import { activate, auth, me } from "../auth.js";
import { upload } from "../upload.js";
import { router as tournsRouter } from "../usersontourns/routes.js";

// eslint-disable-next-line new-cap
export const router = Router();
/**
 * /api/v1/users/signin      POST   -   SignIn with credentials
 * /api/v1/users/signup      POST   -   Create user account
 * /api/v1/users             GET    -   list all the users
 * /api/v1/user/:id          GET    -   Read one user
 * /api/v1/users/:id         PUT    -   Update one user
 * /api/v1/users/:id/tourns                -   The user tournaments
 */
router
  .route("/signup")
  .post(
    upload.single("profilePhoto"),
    controller.signup,
    controller.confirmation
  );
router.route("/u");
router.route("/signin").post(controller.signin);

router.route("/confirmation").post(controller.confirmation);
router.route("/activate/:token").get(activate, controller.activate);

router.route("/me").get(auth, controller.myInfo);
router.route("/").get(controller.allUsers); // .post(controller.createStudent);

router.param("id", controller.idUser);

router
  .route("/:id")
  .get(auth, controller.readUser)
  .delete(auth, me, controller.removeUser);

router
  .route("/:id")
  .put(auth, me, upload.single("profilePhoto"), controller.updateUser);
router.use("/:userId/lessons", tournsRouter); // Para poder sacar las clases de ese estudiante
