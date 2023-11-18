import { Router } from "express";

import * as controller from "./controller.js";
import { auth, owner } from "../auth.js";
import { router as usersRouter } from "../users/routes.js";
// eslint-disable-next-line new-cap
export const router = Router({
  mergeParams: true,
});

router.route("");
router.route("/s").get(controller.myTourns);
router.route("/").get(controller.allTourns).post(controller.createTourn);

router.param("id", controller.idTourn);

router
  .route("/:id")
  .get(controller.readTourn)
  .put(controller.updateTourn)
  .patch(controller.updateTourn)
  .delete(controller.removeTourn);

router.use("/:tournId/users", usersRouter);
