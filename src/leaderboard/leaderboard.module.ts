import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LeaderboardController } from "./leaderboard.controller";
import { LeaderboardService } from "./leaderboard.service";
import { PlayerScoreEntity } from "src/shared/entities/playerScore.entity";

@Module({
  imports: [TypeOrmModule.forFeature([PlayerScoreEntity])],
  controllers: [LeaderboardController],
  providers: [LeaderboardService],
})
export class LeaderboardModule {}
