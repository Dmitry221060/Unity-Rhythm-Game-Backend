import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import config from "src/config";
import {
  PlayerScoreEntity,
  PublicPlayerScoreEntity,
} from "src/shared/entities/playerScore.entity";
import { CreatePlayerScoreDto } from "./dto/create-score.dto";

@Injectable()
export class ScoreService {
  constructor(
    @InjectRepository(PlayerScoreEntity)
    private readonly scoreRepository: Repository<PlayerScoreEntity>,
  ) {}

  async addScoreRecord(
    user: string,
    dto: CreatePlayerScoreDto,
  ): Promise<PublicPlayerScoreEntity> {
    this.validateScoreRecord(dto);

    const scoreEntity = new PlayerScoreEntity({
      level: dto.level,
      score: dto.score,
      name: user,
    });
    await this.scoreRepository.save(scoreEntity);
    const publicScoreEntity = new PublicPlayerScoreEntity(scoreEntity);

    return publicScoreEntity;
  }

  private validateScoreRecord(dto: CreatePlayerScoreDto) {
    const level = config.levels.find(({ name }) => name === dto.level);
    if (!level || dto.score > level.maxScore) {
      throw new BadRequestException("Invalid field data");
    }
  }
}
