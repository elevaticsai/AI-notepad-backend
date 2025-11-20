import cors from "cors";
import express from "express";
import "dotenv/config";

//DB connection import
import connectDB from "./config/db.config.js";

//Routes import
import authRouter from "./routes/auth.route.js";
import notesRouter from "./routes/notes.route.js";
import folderRouter from "./routes/folder.route.js";
import s3Router from "./routes/s3.route.js";

const app = express();
let PORT = process.env.PORT || 5000;

//Database Connection
connectDB();

app.use(express.json());
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.get("/", async (req, res) => {
  res.send("Welcome to the ai-notes-maker backend");
});

app.use("/api/v1", s3Router);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/notes", notesRouter);
app.use("/api/v1/folders", folderRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
