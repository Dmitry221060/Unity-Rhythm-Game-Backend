import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PlayerScoreEntity } from "src/shared/entities/playerScore.entity";
import { deleteProperties } from "src/utils/util";

const leaderboardSize = 10;

@Injectable()
export class LeaderboardService {
  constructor(
    @InjectRepository(PlayerScoreEntity)
    private readonly scoreRepository: Repository<PlayerScoreEntity>,
  ) {}

  async getScoresByLevel(level: string): Promise<PlayerScoreEntity[]> {
    const records = await this.scoreRepository.find({
      where: { level },
      order: { score: "DESC" },
      take: leaderboardSize,
      skip: 0,
    });
    deleteProperties(records, ["_id"]);

    return records;
  }
}
