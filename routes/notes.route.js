import express from "express";
import { authenticateUser } from "../middleware/authMiddleware.js";
import {
  createNotes,
  getAllNotes,
  getNoteDetails,
  updateNote,
} from "../controllers/notes.controller.js";

const notesRouter = express.Router();

notesRouter.post("/createNotes", authenticateUser, createNotes);
notesRouter.get("/getNotes", authenticateUser, getAllNotes);
notesRouter.get("/getNoteDetails/:id", authenticateUser, getNoteDetails);
notesRouter.put("/updateNotes/:id", authenticateUser, updateNote);

export default notesRouter;
