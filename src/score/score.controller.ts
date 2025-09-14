import { Body, Controller, Ip, Put, Post, Header } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { ScoreService } from "./score.service";
import { CreatePlayerScoreDto } from "./dto/create-score.dto";
import { PublicPlayerScoreEntity } from "src/shared/entities/playerScore.entity";
import logger from "src/utils/logger";

@Controller("score")
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}

  @Put()
  @ApiOperation({ summary: "PUT without resource ID is deprecated, use POST instead", deprecated: true })
  @Header("Deprecated", "true")
  async oldCreate(@Ip() user: string, @Body() dto: CreatePlayerScoreDto) {
    logger.debug("> PUT /score", dto);

    await this.scoreService.addScoreRecord(user, dto);

    logger.debug("< PUT /score");
  }

  @Post()
  @ApiOperation({ summary: "Create new score record" })
  async create(@Ip() user: string, @Body() dto: CreatePlayerScoreDto): Promise<PublicPlayerScoreEntity> {
    logger.debug("> POST /score", dto);

    const response = await this.scoreService.addScoreRecord(user, dto);

    logger.debug("< POST /score");
    return response;
  }
}
