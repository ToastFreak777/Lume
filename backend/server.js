import express from "express";
import dotenv from "dotenv";
import "express-async-errors";

// Security packages
import helmet from "helmet";
import cors from "cors";
// import xss from "xss-clean";
// import rateLimit from "express-rate-limit";
// import compression from "compression";
import cookieParser from "cookie-parser";

dotenv.config();

import { setUpSocket } from "./socket.js";

const app = express();
setUpSocket();

// Logger
import morgan from "morgan";

// Database connection
import connectDB from "./db/connect.js";

app.use([
  morgan("dev"),
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
  express.json(),
  helmet(),
  cookieParser(process.env.COOKIE_SECRET),
  // rateLimit({
  //   windowMs: 15 * 60 * 1000,
  //   max: 100,
  // }),
  // xss(),
  // compression(),
]);

// Middleware
import errorHandler from "./middleware/errorHandler.js";
import notFound from "./middleware/notFound.js";

// Routers
import authRouter from "./routes/auth.route.js";
import usersRouter from "./routes/users.route.js";
import coursesRouter from "./routes/courses.route.js";
import assignmentsRouter from "./routes/assignments.route.js";
import attendanceRouter from "./routes/attendance.route.js";
import gradesRouter from "./routes/grades.route.js";
import notificationsRouter from "./routes/notifications.route.js";
import subjectsRouter from "./routes/subjects.route.js";

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/courses", coursesRouter);
app.use("/api/grades", gradesRouter);
app.use("/api/notifications", notificationsRouter);
app.use("/api/assignments", assignmentsRouter);
app.use("/api/attendance", attendanceRouter);
app.use("/api/subjects", subjectsRouter);

app.use([notFound, errorHandler]);

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    console.info("Connected to MongoDB");

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.error(error);
  }
};

start();
