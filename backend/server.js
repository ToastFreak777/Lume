import express from "express";
import dotenv from "dotenv";
import "express-async-errors";

dotenv.config();

const app = express();

// Logger
import morgan from "morgan";
app.use(morgan("dev"));

// Database connection
import connectDB from "./db/connect.js";

// Middleware
import errorHandler from "./middleware/errorHandler.js";
import notFound from "./middleware/notFound.js";

app.use([express.json(), express.urlencoded({ extended: true })]);

// Routers
import authRouter from "./routes/auth.route.js";
import usersRouter from "./routes/users.route.js";
import classesRouter from "./routes/classes.route.js";
import assignmentsRouter from "./routes/assignments.route.js";
import attendanceRouter from "./routes/attendance.route.js";
import gradesRouter from "./routes/grades.route.js";
import notificationsRouter from "./routes/notifications.route.js";

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/classes", classesRouter);
app.use("/api/grades", gradesRouter);
app.use("/api/notifications", notificationsRouter);
app.use("/api/assignments", assignmentsRouter);
app.use("/api/attendance", attendanceRouter);

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
