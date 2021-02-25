import { Application } from "express";
import leaderboardController from "../controllers/leaderboard.controller";
import scoreController from "../controllers/score.controller";

export default (app: Application): void => {
  app.use(leaderboardController);
  app.use(scoreController);
};
