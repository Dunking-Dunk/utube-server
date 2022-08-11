import Comment from "../models/Comment.js";
import { createError } from "../utils/error.js";

export const createComment = async (req, res, next) => {
  try {
    const comment = Comment({
      userId: req.user.id,
      ...req.body,
    });
    await comment.save();
    res.json(comment).status(200);
  } catch (err) {
    next(err);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(res.params.id);

    if (req.user.id === comment.userId) {
      await Comment.findByIdAndDelete(req.params.id);
      res.json("successfully deleted").status2(200);
    } else {
      next(createError(403, "You can only delete Your account"));
    }
  } catch (err) {
    next(err);
  }
};

export const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ videoId: req.params.videoId });
    res.json(comments).status(200);
  } catch (err) {
    next(err);
  }
};
