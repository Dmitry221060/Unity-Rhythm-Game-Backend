import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PlayerScoreEntity, PublicPlayerScoreEntity } from "src/shared/entities/playerScore.entity";

const leaderboardSize = 10;

@Injectable()
export class LeaderboardService {
  constructor(
    @InjectRepository(PlayerScoreEntity)
    private readonly scoreRepository: Repository<PlayerScoreEntity>,
  ) {}

  async getScoresByLevel(level: string): Promise<PublicPlayerScoreEntity[]> {
    const records = await this.scoreRepository.find({
      where: { level },
      order: { score: "DESC" },
      take: leaderboardSize,
      skip: 0,
    });
    const publicRecords = records.map(e => new PublicPlayerScoreEntity(e));

    return publicRecords;
  }
}
