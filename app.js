const { json } = require("express");
const express = require("express");
const app = express();

const streamRoute = require("./routes/streamRoute");
const scheduleRoute = require("./routes/scheduleRoute");

// middleware
app.use(json());

// routes
app.use("/api", streamRoute);
app.use("/api", scheduleRoute);

// server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`[server] running on port ${PORT}`));
