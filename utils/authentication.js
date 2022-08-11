import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const VerifyUserToken = (req, res, next) => {
  const token = req.cookies.access_token;
  console.log(token);
  if (!token) {
    return next(createError(401, "You are not authenticated"));
  } else {
    try {
      const decoded = jwt.verify(token, process.env.TOKEN__KEY);
      if (decoded) {
        req.user = decoded;
        next();
      } else {
        next(createError(401, "Invalid token"));
      }
    } catch (err) {
      next(err);
    }
  }
};

export const VerifyUserAccess = (req, res, next) => {
  try {
    if (req.user.id === req.params.id) {
      next();
    } else {
      next(
        createError(
          403,
          "user is not authorized. You can only update your account"
        )
      );
    }
  } catch (err) {
    next(err);
  }
};
