import { uploadFileToS3 } from "../services/s3Service.js";

export const uploadImage = async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
  
    try {
      const fileUrl = await uploadFileToS3(req.file);
      res.status(200).json({ message: "File uploaded successfully", fileUrl });
    } catch (error) {
      res.status(500).json({ error: "Error uploading file" });
    }
  };


  export const uploadAudio = async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
  
    try {
      const fileUrl = await uploadFileToS3(req.file);
      res.status(200).json({ message: "File uploaded successfully", fileUrl });
    } catch (error) {
      res.status(500).json({ error: "Error uploading file" });
    }
  };