import Folder from "../models/Folder.js";
import Note from "../models/Note.js";

export const createNotes = async (req, res) => {
  try {
    // Check for required fields
    if (!req.body.title || !req.body.content) {
      return res.status(400).json({ error: "Title and content are required" });
    }

    // Optional: Validate folderId if provided
    if (req.body.folderId) {
      const folderExists = await Folder.exists({ _id: req.body.folderId });
      if (!folderExists) {
        return res
          .status(400)
          .json({ error: "Specified folder does not exist" });
      }
    }

    const note = new Note({
      title: req.body.title,
      content: req.body.content,
      color: req.body.color || "bg-blue-100",
      folderId: req.body.folderId || null,
      tags: req.body.tags || [],
      userId: req.user._id,
    });

    await note.save();
    res.status(201).json(note);
  } catch (error) {
    // More secure error handling for production
    const errorMessage =
      process.env.NODE_ENV === "development"
        ? error.message
        : "Failed to create note";
    res.status(400).json({ error: errorMessage });
  }
};

export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({
      userId: req.user._id,
      isDeleted: false,
    }).sort({ updatedAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getNoteDetails = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      userId: req.user._id,
      isDeleted: false,
    });

    if (!note) {
      return res.status(404).json({ error: "Note not found or access denied" });
    }

    res.json(note);
  } catch (error) {
    res.status(500).json({
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to fetch note details",
    });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if note exists and belongs to user
    const note = await Note.findOne({ _id: id, userId: req.user._id });
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    // Validate folderId if provided
    if (req.body.folderId) {
      const folderExists = await Folder.exists({ _id: req.body.folderId });
      if (!folderExists) {
        return res.status(400).json({ error: "Specified folder does not exist" });
      }
    }

    // Update allowed fields
    const allowedUpdates = {
      title: req.body.title,
      content: req.body.content,
      color: req.body.color,
      folderId: req.body.folderId,
      tags: req.body.tags,
      isArchived: req.body.isArchived,
      isDeleted: req.body.isDeleted
    };

    // Remove undefined fields
    Object.keys(allowedUpdates).forEach(key => 
      allowedUpdates[key] === undefined && delete allowedUpdates[key]
    );

    // Update note with new values
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { $set: allowedUpdates },
      { new: true, runValidators: true }
    );

    res.json(updatedNote);
  } catch (error) {
    const errorMessage =
      process.env.NODE_ENV === "development"
        ? error.message
        : "Failed to update note";
    res.status(400).json({ error: errorMessage });
  }
};
