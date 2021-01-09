const express = require("express");
const axios = require("axios").default;
const cheerio = require("cheerio");
const router = express.Router();

const controller = require("../controllers/statsController");

const stats = [
  "gp",
  "gs",
  "min",
  "pts",
  "or",
  "dr",
  "reb",
  "ast",
  "stl",
  "blk",
  "to",
  "pf",
  "to",
  "per",
];

router.get("/stats", (req, res) => {
  const url = "https://www.espn.com/nba/team/stats/_/name/utah";

  const players = [];
  const allStats = [];

  axios
    .get(url)
    .then((body) => {
      // itialize cheerio
      const $ = cheerio.load(body.data);

      // get players names and positions
      $(".Table__TD").each((i, element) => {
        const name = $(element).find("span").children().first().text();
        const position = $(element).find("span").children().last().text();
        const found = players.find((temp) => temp.name === name);
        // ... checks to see if player is already added and if player is an empty string
        if (found) return;
        if (name === "") return;
        // ... push player data to players array
        players.push({
          name,
          position,
        });
      });

      // get players stats
      $(".Table__Scroller")
        .first()
        .find(".Table__TR.Table__TR--sm.Table__even")
        .each((i, element) => {
          // ... errors because it runs through 15 times. Check is
          if (i === 15) return;
          const playerStats = { player: players[i].name };
          // ... filters through each row of player data
          $(element)
            .find("td")
            .each((i, e) => {
              playerStats[stats[i]] = $(e).text();
            });
          allStats.push(playerStats);
        });
      const data = {
        players: players,
        stats: allStats,
      };
      res.send(data);
    })
    .catch((error) => console.log(error));
});

module.exports = router;
