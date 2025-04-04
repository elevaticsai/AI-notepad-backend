import express from "express";
import { authenticateUser } from "../middleware/authMiddleware.js";
import {
  createFolder,
  getAllFolders,
  deleteFolder,
} from "../controllers/folders.controller.js";

const folderRouter = express.Router();

folderRouter.post("/createFolder", authenticateUser, createFolder);
folderRouter.get("/getFolders", authenticateUser, getAllFolders);
folderRouter.delete("/deleteFolder/:folderId", authenticateUser, deleteFolder);

export default folderRouter;
