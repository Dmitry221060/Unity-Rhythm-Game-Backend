import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import config from "./config";
import { LeaderboardModule } from "./leaderboard/leaderboard.module";
import { ScoreModule } from "./score/score.module";
import { HealthModule } from "./health/health.module";

@Module({
  imports: [
    TypeOrmModule.forRoot(config.getTypeOrmConfig()),
    LeaderboardModule,
    ScoreModule,
    HealthModule,
  ],
})
export class AppModule {}
