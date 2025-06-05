const express = require("express");
const {
  createChapterFolder,
  uploadChapterImages,
  getChapterImages,
  deleteChapter,
} = require("../controllers/manhwaController");
const upload = require("../utils/multer");
const router = express.Router();

router.post("/create/:manhwa/:chapter", createChapterFolder);
router.post(
  "/upload/:manhwa/:chapter",
  upload.array("images", 20),
  uploadChapterImages
);
router.get("/images/:manhwa/:chapter", getChapterImages);
router.delete("/delete/:manhwa/:chapter", deleteChapter);

module.exports = router;
