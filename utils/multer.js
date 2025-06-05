const multer = require("multer");
const fs = require("fs");
const path = require("path");

const ensureDirectoryExistence = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const manhwa = req.params.manhwa;
    const chapter = req.params.chapter;
    const targetPath = path.join(__dirname, "../uploads", manhwa, chapter);
    ensureDirectoryExistence(targetPath);
    cb(null, targetPath);
  },
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      "-" +
      Math.floor(Math.random() * 10000) +
      path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/png", "image/jpg", "image/jpeg"];
  if (!allowedTypes.includes(file.mimetype)) {
    cb(
      new Error("Invalid type image , only jpg ,jpeg and png are allowed"),
      false
    );
  } else {
    cb(null, true);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 3 },
});

module.exports = upload;
