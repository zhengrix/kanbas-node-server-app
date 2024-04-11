import "dotenv/config";
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import mongoose from "mongoose";
import Hello from './Hello.js';
import Lab5 from "./Lab5.js";
import CourseRoutes from "./kanbas/courses/routes.js";
import ModuleRoutes from './kanbas/modules/routes.js';
import UserRoutes from "./users/routes.js";
const app = express();
const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.HTTP_SERVER_DOMAIN,
  };
}
app.use(session(sessionOptions));
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);
app.use(express.json());
mongoose.connect(process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kanbas');
Hello(app);
UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
Lab5(app);
app.listen(process.env.PORT || 4000);