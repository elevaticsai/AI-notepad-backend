import express from "express";
import multer from "multer";
import { uploadImage, uploadAudio } from "../controllers/s3.controller.js";

const s3Router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

s3Router.post("/upload/image", upload.single("image"), uploadImage);
s3Router.post("/upload/audio", upload.single("audio"), uploadAudio);

export default s3Router;
