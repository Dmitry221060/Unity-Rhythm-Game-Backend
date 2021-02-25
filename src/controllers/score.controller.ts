import express from "express";
import config from "../config";
import scoreRepository from "../dataAccess/scoreRepository";
import { ValidationError } from "../utils/errors";
import logger from "../utils/logger";

const app = express();

app.put("/score", async (req, res) => {
  try {
    logger.debug("> PUT /score", req.body);
    const name = req.ip;
    const { score, levelName } = parseScoreRequest(req.body);

    await scoreRepository.addScoreRecord(levelName, name, score);

    res.status(200).end();
    logger.debug("< PUT /score");
  } catch(err) {
    if (err instanceof ValidationError) {
      res.status(400).end(err.message);
      logger.debug("< PUT /score Invalid score request");
    } else {
      res.status(500).end();
      logger.error("< PUT /score Internal error", err);
    }
  }
});

function parseScoreRequest(requestBody: Record<string, unknown>): { score: number, levelName: string} {
  const { score, level: levelName } = requestBody;
  if (typeof levelName !== "string" || typeof score !== "number") {
    throw new ValidationError("Invalid field types");
  }

  const level = config.levels.find(({ name }) => name === levelName);
  if (!level || score > level.maxScore) {
    throw new ValidationError("Invalid field data");
  }

  return { score, levelName };
}

export default app;
