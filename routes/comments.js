import express from "express";
import {
  createComment,
  getComments,
  deleteComment,
} from "../controllers/comment.js";
import { VerifyUserToken } from "../utils/authentication.js";

const router = express.Router();

router.post("/", VerifyUserToken, createComment);

router.delete("/:id", VerifyUserToken, deleteComment);

router.get("/:videoId", getComments);

export default router;
