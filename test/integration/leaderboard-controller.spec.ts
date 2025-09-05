import request from "supertest";
import { INestApplication } from "@nestjs/common";
import { Server } from "http";
import { DataSource } from "typeorm";
import config from "src/config";
import { PlayerScoreEntity } from "src/shared/entities/playerScore.entity";
import { deleteProperties } from "src/utils/util";
import { createApp } from "../utils/create-app";

describe("Leaderboard", () => {
  let app: INestApplication;
  let datasource: DataSource;
  let server: Server;
  const testLevel: string = config.levels[0].name;
  const testScoreRecords: PlayerScoreEntity[] = [];

  beforeAll(async () => {
    app = await createApp();
    datasource = app.get(DataSource);
    server = app.getHttpServer();

    for (let i = 0; i < 10; i++) {
      const randomScore = Math.floor(Math.random() * config.levels[0].maxScore);
      testScoreRecords.push({
        level: testLevel,
        score: randomScore,
        name: "testUser" + i,
      });
    }

    await datasource.synchronize(true);
    const scoreRepository = datasource.getRepository(PlayerScoreEntity);
    await scoreRepository.insert(testScoreRecords);
    deleteProperties(testScoreRecords, ["_id"]);
  });

  it("returns sorted list of records", async () => {
    const response = await request(server)
      .get("/leaderboard")
      .query({ level: testLevel })
      .expect(200);

    const records = response.body?.records;
    expect(records).not.toBeNull();
    expect(Array.isArray(records)).toBe(true);
    expect(records.length).toBe(testScoreRecords.length);

    testScoreRecords.sort((a, b) => b.score - a.score);
    for (let i = 0; i < testScoreRecords.length; i++) {
      expect(records[i]).toEqual(testScoreRecords[i]);
    }
  });

  describe("when level name is missing or invalid", () => {
    it("returns no records", async () => {
      const response = await request(server).get("/leaderboard").expect(200);

      const records = response.body?.records;
      expect(records).not.toBeNull();
      expect(Array.isArray(records)).toBe(true);
      expect(records.length).toBe(0);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
