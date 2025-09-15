import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PlayerScoreEntity } from "src/shared/entities/playerScore.entity";
import { ScoreController } from "./score.controller";
import { ScoreService } from "./score.service";

@Module({
  imports: [TypeOrmModule.forFeature([PlayerScoreEntity])],
  controllers: [ScoreController],
  providers: [ScoreService],
})
export class ScoreModule {}
