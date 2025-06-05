const path = require("path");
const fs = require("fs");
const createChapterFolder = (req, res) => {
  const { manhwa, chapter } = req.params;
  const targetPath = path.join(__dirname, "../uploads", manhwa, chapter);
  if (!fs.existsSync(targetPath)) {
    fs.mkdirSync(targetPath, { recursive: true });
    return res.status(200).json({ message: `create ${manhwa}/${chapter}` });
  }
  return res.status(400).json({ message: "folder already exist" });
};

const uploadChapterImages = (req, res) => {
  const urls = req.files.map((file) => ({
    name: file.name,
    url: `http://localhost:8081/uploads/${req.params.manhwa}/${req.params.chapter}/${file.filename}`,
  }));
  res.status(200).json({ message: "upload successfully!", files: urls });
};

const getChapterImages = (req, res) => {
  const { manhwa, chapter } = req.params;
  const pathImages = path.join(__dirname, "../uploads", manhwa, chapter);
  if (!fs.existsSync(pathImages)) {
    return res.status(400).json({ message: "chapter not found" });
  }
  const files = fs.readdirSync(pathImages);
  const imagesUrl = files.map(
    (file) => `http://localhost:8081/uploads/${manhwa}/${chapter}/${file}`
  );
  res.status(200).json({ images: imagesUrl });
};

const deleteChapter = (req, res) => {
  const { manhwa, chapter } = req.params;
  const chapterPath = path.join(__dirname, "../uploads", manhwa, chapter);
  if (!fs.existsSync(chapterPath)) {
    return res.status(400).json({ message: "chapter doesn't exist" });
  }
  fs.rmSync(chapterPath, { recursive: true, force: true });
  res.status(200).json({ message: `chapter ${chapter} delete from ${manhwa}` });
};

module.exports = {
  createChapterFolder,
  uploadChapterImages,
  getChapterImages,
  deleteChapter,
};
