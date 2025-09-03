import { Body, Controller, Ip, Put } from "@nestjs/common";
import { ScoreService } from "./score.service";
import { CreatePlayerScoreDto } from "./dto/create-score.dto";
import logger from "src/utils/logger";

@Controller("score")
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}

  @Put()
  async create(@Ip() user: string, @Body() dto: CreatePlayerScoreDto) {
    logger.debug("> PUT /score", dto);

    await this.scoreService.addScoreRecord(user, dto);

    logger.debug("< PUT /score");
  }
}
