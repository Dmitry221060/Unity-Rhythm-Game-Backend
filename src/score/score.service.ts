import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PlayerScoreEntity } from "src/shared/entities/playerScore.entity";
import { Repository } from "typeorm";
import { CreatePlayerScoreDto } from "./dto/create-score.dto";
import config from "src/config";

@Injectable()
export class ScoreService {
  constructor(
    @InjectRepository(PlayerScoreEntity)
    private readonly scoreRepository: Repository<PlayerScoreEntity>,
  ) {}

  async addScoreRecord(user: string, dto: CreatePlayerScoreDto) {
    this.validateScoreRecord(dto);

    const scoreEntity = new PlayerScoreEntity({
      level: dto.level,
      score: dto.score,
      name: user,
    });
    await this.scoreRepository.save(scoreEntity);
  }

  private validateScoreRecord(dto: CreatePlayerScoreDto) {
    const level = config.levels.find(({ name }) => name === dto.level);
    if (!level || dto.score > level.maxScore) {
      throw new BadRequestException("Invalid field data");
    }
  }
}
