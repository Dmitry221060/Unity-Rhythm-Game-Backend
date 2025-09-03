import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LeaderboardModule } from "./leaderboard/leaderboard.module";
import { ScoreModule } from "./score/score.module";
import config from "./config";

@Module({
  imports: [
    TypeOrmModule.forRoot(config.getTypeOrmConfig()),
    LeaderboardModule,
    ScoreModule,
  ],
})
export class AppModule {}
