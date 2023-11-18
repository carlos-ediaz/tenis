import { Router } from "express";

import { router as users } from "./users/routes.js";
import { router as tourns } from "./tourns/routes.js";
import { router as usersontourns } from "./usersontourns/routes.js";

export const router = Router();

router.use("/tourns", tourns);
router.use("/users", users);
router.use("/usersontourns", usersontourns);
