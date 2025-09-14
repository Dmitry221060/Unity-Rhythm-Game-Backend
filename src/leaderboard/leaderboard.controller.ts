import { Get, Query, Controller } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { LeaderboardService } from "./leaderboard.service";
import { LeaderboardResponseDto } from "./dto/get-level-scores.dto";
import logger from "src/utils/logger";

@Controller("leaderboard")
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  @Get()
  @ApiOperation({ summary: "Get top score records by level" })
  async getLevelScores(
    @Query("level") levelName: string,
  ): Promise<LeaderboardResponseDto> {
    logger.debug("> GET /leaderboard", levelName);

    const records = await this.leaderboardService.getScoresByLevel(levelName);

    logger.debug("< GET /leaderboard", { records });
    return { records };
  }
}
