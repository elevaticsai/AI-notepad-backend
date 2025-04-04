import express from "express";
import { authenticateUser } from "../middleware/authMiddleware.js";
import {
  createFolder,
  getAllFolders,
} from "../controllers/folders.controller.js";

const folderRouter = express.Router();

folderRouter.post("/createFolder", authenticateUser, createFolder);
folderRouter.get("/getFolders", authenticateUser, getAllFolders);

export default folderRouter;
