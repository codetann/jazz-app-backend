const express = require("express");
const axios = require("axios").default;
const cheerio = require("cheerio");
const router = express.Router();

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
  const imgUrl = "https://www.nba.com/jazz/roster/grid";

  const players = [];
  const allStats = [];
  const imgs = [];

  /*
    The first .then scrapes player data from espn.com 
        - creates an object with two values players and stats

    The second .then scrapes players photos from nba.com
        - adds the links to player in players array.
  */

  axios
    .get(url)
    // --- REQUEST #1 --- //
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
    })
    //
    //
    // --- REQUEST #2 --- //
    .then((data) => {
      axios
        .get(imgUrl)
        .then((body) => {
          const $ = cheerio.load(body.data);
          $(".roster__player__bust").each((i, e) => {
            const name = $(e).attr("alt");
            const link = $(e).attr("src");
            const found = players.find((player) => player.name === name);
            if (found) {
              found.img = link;
            }
          });
          const data = {
            players: players,
            stats: allStats,
          };
          res.send(data);
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
});

module.exports = router;
