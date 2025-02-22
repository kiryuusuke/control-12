import express from "express";
import auth from "../../middleware/auth";
import permit from "../../middleware/permit";
import {adminPostRouter} from "./adminPostRouter";

const adminRouter = express.Router();

adminRouter.use(auth, permit('admin'));
adminRouter.use('/posts', adminPostRouter);

export default adminRouter