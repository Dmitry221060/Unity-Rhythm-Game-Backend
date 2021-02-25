import express from "express";
import scoreRepository from "../dataAccess/scoreRepository";
import logger from "../utils/logger";

const leaderboardSize = 10;
const app = express();

app.get("/leaderboard", async (req, res) => {
  try {
    logger.debug("> GET /leaderboard", req.query);
    const levelName = req.query.level;

    if (typeof levelName !== "string") {
      res.status(400).end("Level should be of type string");
      logger.debug("< GET /leaderboard Invalid leaderboard request");
      return;
    }

    const records = await scoreRepository.getHighestScores(levelName, leaderboardSize);

    res.status(200).json({ records });
    logger.debug("< GET /leaderboard", { records });
  } catch(err) {
    res.status(500).end();
    logger.error("< GET /leaderboard Internal error", err)
  }
});

export default app;
