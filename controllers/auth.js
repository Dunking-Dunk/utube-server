import User from "../models/User.js";
import Bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

export const SignUp = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    next(createError(400, "no sufficient information"));
    return;
  }

  try {
    const hashedPassword = await Bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    const token = jwt.sign(
      { email: email, id: user._id },
      process.env.TOKEN__KEY
    );

    res.cookie("access_token", token).status(200).json({ success: true, user });
  } catch (err) {
    next(err);
  }
};

export const SignIn = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next(createError(400, "no sufficient information"));
    return;
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      next(createError(400, "user does not exist"));
    } else {
      const is_user = await Bcrypt.compare(password, user.password);
      if (!is_user) {
        next(createError(400, "credentials mismatch"));
      } else {
        const token = jwt.sign(
          { email: user.email, id: user._id },
          process.env.TOKEN__KEY
        );

        const { password, ...others } = user._doc;

        res.cookie("access_token", token).json({ success: true, user: others });
      }
    }
  } catch (err) {
    next(err);
  }
};

export const googleAuth = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  try {
    if (user) {
      const token = jwt.sign(
        { email: user.email, id: user._id },
        process.env.TOKEN__KEY
      );
      res
        .cookie("access_token", token, { httpOnly: true })
        .json({ success: true, user: user._doc });
    } else {
      const newUser = new User({
        ...req.body,
        fromGoogle: true,
      });
      const savedUser = await newUser.save();

      const token = jwt.sign(
        { email: user.email, id: user._id },
        process.env.TOKEN__KEY
      );
      res
        .cookie("access_token", token, { httpOnly: true })
        .json({ success: true, user: savedUser._doc });
    }
  } catch (err) {
    next(err);
  }
};
