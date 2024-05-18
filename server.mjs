import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const PORT = process.env.PORT || 5555;

// Use these to get the correct __dirname equivalent in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors()); // Use CORS middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "build")));

app.get("/api/hunt-data", (req, res) => {
  const huntData = fs.readFileSync(path.join(__dirname, "public/huntData.json"), "utf-8");
  res.send(JSON.parse(huntData));
});

app.post("/api/hunt-data/:id", (req, res) => {
  const huntId = parseInt(req.params.id, 10);
  console.log(huntId)
  const updatedData = req.body;

  const huntDataPath = path.join(__dirname, "public/huntData.json");
  const huntData = JSON.parse(fs.readFileSync(huntDataPath, "utf-8"));

  const huntIndex = huntData.findIndex(h => h.id === huntId);
  if (huntIndex !== -1) {
    huntData[huntIndex] = { ...huntData[huntIndex], ...updatedData };
    fs.writeFileSync(huntDataPath, JSON.stringify(huntData, null, 2));
    res.send({ status: "success" });
    console.log("OK")
  } else {
    res.status(404).send({ status: "not found" });
    console.log("not ok")
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
