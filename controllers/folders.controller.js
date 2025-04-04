import mongoose from "mongoose";
import Folder from "../models/Folder.js";

export const createFolder = async (req, res) => {
  try {
    if (!req.body.title) {
      return res.status(400).json({ error: "Folder title is required" });
    }

    if (req.body.parentFolderId) {
      if (!mongoose.Types.ObjectId.isValid(req.body.parentFolderId)) {
        return res.status(400).json({ error: "Invalid parent folder ID" });
      }

      const parentFolder = await Folder.findOne({
        _id: req.body.parentFolderId,
        userId: req.user._id,
        isDeleted: false,
      });

      if (!parentFolder) {
        return res
          .status(404)
          .json({ error: "Parent folder not found or access denied" });
      }
    }

    const folder = new Folder({
      title: req.body.title,
      color: req.body.color || "bg-gray-100",
      parentFolderId: req.body.parentFolderId || null,
      userId: req.user._id,
    });

    await folder.save();
    res.status(201).json(folder);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to create folder",
    });
  }
};

export const deleteFolder = async (req, res) => {
  try {
    const { folderId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(folderId)) {
      return res.status(400).json({ error: "Invalid folder ID" });
    }

    const folder = await Folder.findOne({
      _id: folderId,
      userId: req.user._id,
      isDeleted: false,
    });

    if (!folder) {
      return res.status(404).json({ error: "Folder not found or access denied" });
    }

    // Soft delete the folder
    folder.isDeleted = true;
    await folder.save();

    res.status(200).json({ message: "Folder deleted successfully" });
  } catch (error) {
    res.status(500).json({
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to delete folder",
    });
  }
};

export const getAllFolders = async (req, res) => {
  try {
    const folders = await Folder.find({
      userId: req.user._id,
      isDeleted: false,
    });
    res.json(folders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
