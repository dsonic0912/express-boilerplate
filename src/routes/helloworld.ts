import { Router } from "express";
import { helloWorld } from "#controllers/helloworld.js";

const router = Router();

router.get("/", helloWorld);

export default router;
