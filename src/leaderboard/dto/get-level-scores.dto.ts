import { PublicPlayerScoreEntity } from "src/shared/entities/playerScore.entity";

export class LeaderboardResponseDto {
  records!: PublicPlayerScoreEntity[];
}
