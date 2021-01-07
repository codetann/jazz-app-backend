const express = require("express");
const router = express.Router();
const axios = require("axios").default;
const cheerio = require("cheerio");

router.get("/schedule", (req, res) => {
  const url = "https://www.nba.com/jazz/schedule";

  // axios fetchting url
  axios
    .get(url)
    .then((body) => {
      const schedule = [];
      const $ = cheerio.load(body.data);
      const page = $("#schedule-page-app").html();
      console.log(page);
      res.send("schedule");
    })
    .catch((error) => console.log(error));
});

module.exports = router;
