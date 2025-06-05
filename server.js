const express = require("express");
const cors = require("cors");
require("dotenv").config();
const manhwaRoutes = require("./routes/manhwaRoutes");
const path = require("path");
const port = process.env.PORT;
const app = express();

app.use("/api", manhwaRoutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.listen(port, () => {
  console.log(`server listining at localhost ${port}`);
});
