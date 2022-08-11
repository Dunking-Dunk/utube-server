import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import commentRoutes from "./routes/comments.js";
import videoRoutes from "./routes/videos.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

//server connection
mongoose.connect(process.env.MONGODB).catch((err) => console.log(err));
mongoose.connection.once("open", () => {
  console.log("server connected");
});
//
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/auth/", authRoutes);
app.use("/api/users/", userRoutes);
app.use("/api/comments/", commentRoutes);
app.use("/api/videos/", videoRoutes);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "something went wrong";

  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.get("/", (req, res) => {
  res.send("hello ");
});

app.listen(PORT, () => {
  console.log("listen on port" + PORT);
});
