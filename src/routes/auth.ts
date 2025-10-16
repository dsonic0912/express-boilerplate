import { Router } from "express";
import { signup, signin, currentUser, signout } from "#controllers/auth.js";

const router = Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/me", currentUser);
router.get("/signout", signout);

export default router;
