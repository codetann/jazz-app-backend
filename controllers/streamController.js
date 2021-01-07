const axios = require("axios").default;
const cheerio = require("cheerio");

exports.getStream = (req, res) => {
  const url = "http://nbastream.tv/utah-jazz-live-stream/";

  // axios fetchting url
  axios
    .get(url)
    .then((response) => {
      const $ = cheerio.load(response);
      const link = $(".videoWrapper iframe").html();
      console.log(link);
      res.send(link);
    })
    .catch((error) => console.log(error));
};
