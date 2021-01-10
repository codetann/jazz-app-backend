const express = require("express");
const cors = require("cors");
const app = express();

const homeRoute = require("./routes/homeRoute");
const streamRoute = require("./routes/streamRoute");
const scheduleRoute = require("./routes/scheduleRoute");
const statsRoute = require("./routes/statsRoute");

// middleware

app.use(express.json());
app.use(express.static("public"));

// routes
app.use("/api", homeRoute);
app.use("/api", streamRoute);
app.use("/api", scheduleRoute);
app.use("/api", statsRoute);

// server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`[server] running on port ${PORT}`));

/*
    TODO: add a stats route per player
    TODO: add any time functionality route
    TODO: add readme file
*/
