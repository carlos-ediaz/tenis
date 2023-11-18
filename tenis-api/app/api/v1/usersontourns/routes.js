import { Router } from "express";

import * as controller from "./controller.js";
import { auth, me } from "../auth.js";

// eslint-disable-next-line new-cap
export const router = Router({
  mergeParams: true,
});
/**
 * /api/v1/subjectsonteacher/s        POST       -   Create relation teacher-subject (by teacher)
 * /api/v1/subjectsonteacher/s        DELETE     -   Delete relation teacher-subject (by teacher)
 * /api/v1/subjectsonteacher          POST       -   Create relation teacher-subject (by api)
 * /api/v1/subjectsonteacher          DELETE     -   Delete relation teacher-subject (by api)
 * /api/v1/subjectsonteacher/:id                 -   CRUD relations teacher subject (by api)
 */
router
  .route("/s")
  .post(controller.addUserToTourn)
  .delete(controller.removeUserFromTourn);
router
  .route("/")
  .get(controller.allUsersOnTourns)
  .post(controller.addMeToTourn);

router.param("id", controller.idUsersOnTourns);

router
  .route("/:id")
  .get(controller.readUsersOnTourns)
  .put(controller.updateUsersOnTourns)
  .patch(controller.updateUsersOnTourns)
  .delete(auth, controller.deleteUsersOnTourns);
