import { PlayerScoreEntity } from "src/shared/entities/playerScore.entity";

export class LeaderboardResponseDto {
  records!: PlayerScoreEntity[];
}
