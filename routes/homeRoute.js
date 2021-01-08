const express = require("express");
const router = express.Router();

router.get("/home", (req, res) => {
  res.set({ "Content-Type": "image/png" });
  res.sendFile("donovan.png");
});

module.exports = router;
