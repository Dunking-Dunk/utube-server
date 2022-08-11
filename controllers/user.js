import User from "../models/User.js";
import { createError } from "../utils/error.js";
import Video from "../models/Video.js";

export const update = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted");
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    next(err);
  }
};

export const subscribe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $push: { subscribedUsers: req.params.id },
    });

    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: 1 },
    });
    res.status(200).json("subsciption successful");
  } catch (err) {
    next(err);
  }
};

export const unsubscribe = async (req, res, next) => {
  try {
    try {
      await User.findByIdAndUpdate(req.user.id, {
        $pull: { subscribedUsers: req.params.id },
      });

      await User.findByIdAndUpdate(req.params.id, {
        $inc: { subscribers: -1 },
      });
      res.status(200).json("subsciption successful");
    } catch (err) {
      next(err);
    }
  } catch (err) {
    next(err);
  }
};

export const like = async (req, res, next) => {
  try {
    await Video.findByIdAndUpdate(req.params.videoId, {
      $addToSet: { likes: req.user.id },
      $pull: { dislikes: req.user.id },
    });

    res.status(200).json("the video has been liked");
  } catch (err) {
    next(err);
  }
};

export const dislike = async (req, res, next) => {
  try {
    await Video.findByIdAndUpdate(req.params.videoId, {
      $addToSet: { dislikes: req.user.id },
      $pull: { likes: req.user.id },
    });

    res.status(200).json("successfuly disliked");
  } catch (err) {
    next(err);
  }
};
