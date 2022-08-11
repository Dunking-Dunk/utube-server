import express from "express";

import {
  addVideo,
  deleteVideo,
  updateVideo,
  getVideo,
  viewVideo,
  getRandomVideo,
  getSubVideo,
  getTrendVideo,
  getSearchedVideo,
  getByTags,
  getUsersVideo,
} from "../controllers/video.js";

import { VerifyUserToken } from "../utils/authentication.js";

const router = express.Router();

router.post("/", VerifyUserToken, addVideo);

router.delete("/:id", VerifyUserToken, deleteVideo);

router.put("/:id", VerifyUserToken, updateVideo);

router.get("/find/:id", VerifyUserToken, getVideo);

router.put("/view/:id", viewVideo);

router.get("/trend", getTrendVideo);

router.get("/random", getRandomVideo);

router.get("/sub", VerifyUserToken, getSubVideo);

router.get("/tags", getByTags);

router.get("/search", VerifyUserToken, getSearchedVideo);

router.get("/user", VerifyUserToken, getUsersVideo);

export default router;
