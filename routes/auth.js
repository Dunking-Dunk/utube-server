import express from "express";

import { SignIn, SignUp, googleAuth } from "../controllers/auth.js";

const router = express.Router();

router.post("/signup", SignUp);
router.post("/signin", SignIn);
router.post("/google", googleAuth);

export default router;
