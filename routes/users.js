import express from "express";
import {
  update,
  deleteUser,
  getUser,
  subscribe,
  unsubscribe,
  like,
  dislike,
} from "../controllers/user.js";
import { VerifyUserAccess, VerifyUserToken } from "../utils/authentication.js";

const router = express.Router();

router.put("/:id", VerifyUserToken, VerifyUserAccess, update);

router.delete("/:id", VerifyUserToken, VerifyUserAccess, deleteUser);

router.get("/find/:id", getUser);

router.put("/unsub/:id", VerifyUserToken, unsubscribe);

router.put("/sub/:id", VerifyUserToken, subscribe);

router.put("/like/:videoId", VerifyUserToken, like);

router.put("/dislike/:videoId", VerifyUserToken, dislike);

export default router;
