const express = require("express");
const router = express.Router();
const axios = require("axios").default;
const cheerio = require("cheerio");

const controller = require("../controllers/scheduleController");

/*
  This route fetches the utah schedule from espn and parses that info into a
  array of objects for each game.

  The controller contains functions to help validate the information the cheerio 
  receives.

  TODO: add any team schedule functionality 
*/

router.get("/schedule", (req, res) => {
  const url = "https://www.espn.com/nba/team/schedule/_/name/utah";

  // axios fetchting url
  axios
    .get(url)
    .then((body) => {
      // initialize empty array
      const schedule = [];

      // initialize cherrio
      const $ = cheerio.load(body.data);

      // iterate through jazz schedule
      // parses the data that is received to an object that displays date, opponent, time, and logo
      $(".Table__TR.Table__TR--sm.Table__even").each((i, element) => {
        const date = $(element).find("span").first().text();
        if (date === "DATE") return;
        const temp = $(element).find("span > :nth-child(1)").text().split(" ");
        const opponent = controller.parseName(temp[1], temp[2]);
        const time = controller.parseTime(temp[2], temp[3]);
        const logo = controller.parseImg(
          $(element).find("span > :nth-child(1) img").attr("src")
        );
        const game = {
          date: date,
          opponent: opponent,
          time: time,
          logo: logo,
        };
        // adds game object to the schedule array
        schedule.push(game);
      });
      console.log(schedule);
      // send to browser
      res.send("schedule");
    })
    .catch((error) => console.log(error));
});

module.exports = router;
