const express = require("express");
const router = express.Router();
const axios = require("axios").default;
const cheerio = require("cheerio");

router.get("/stream", (req, res) => {
  const url = "https://nbastream.tv/utah-jazz-live-stream/";

  // axios fetchting url
  axios
    .get(url)
    .then((body) => {
      // initiate cheerio to grab link from nbastreams.tv
      const $ = cheerio.load(body.data);
      const link = $(".videoWrapper iframe").attr("src");
      res.send({ link: link });
    })
    .catch((error) => console.log(error));
});

module.exports = router;
