import { DataRepository } from "../database/dataRepository";
import { PlayerScoreRecord } from "../../dto/score.dto";
import logger from "../../utils/logger";

const collectionName = "playerScores";
class ScoreRepository extends DataRepository<PlayerScoreRecord> {
  public constructor() {
    super({ collectionName });
  }

  public async addScoreRecord(level: string, name: string, score: number): Promise<void> {
    if (this.collection === null) throw new Error("Can not access repository before initialization");

    const playerScore: PlayerScoreRecord = { level, name, score };
    await this.collection.insertOne(playerScore);
  }

  public async getHighestScores(level: string, limit: number): Promise<PlayerScoreRecord[]> {
    if (this.collection === null) throw new Error("Can not access repository before initialization");

    const result = await this.collection.find({ level }, { projection: { _id: 0 } })
      .sort({ score: -1 })
      .limit(limit)
      .toArray() as PlayerScoreRecord[];

    return result;
  }
}

const scoreRepository = new ScoreRepository();
scoreRepository.init().catch(e => logger.error("Can not initialize score repository", e));
export default scoreRepository;
