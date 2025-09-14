import { INestApplication } from "@nestjs/common";
import { Server } from "http";
import request from "supertest";
import { DataSource, Repository } from "typeorm";
import config from "src/config";
import {
  PlayerScoreEntity,
  PublicPlayerScoreEntity,
} from "src/shared/entities/playerScore.entity";
import { createApp } from "../utils/create-app";

describe("Score", () => {
  let app: INestApplication;
  let datasource: DataSource;
  let scoreRepository: Repository<PlayerScoreEntity>;
  let server: Server;
  const testLevel: { name: string; maxScore: number } = config.levels[0];

  beforeAll(async () => {
    app = await createApp();
    datasource = app.get(DataSource);
    scoreRepository = datasource.getRepository(PlayerScoreEntity);
    server = app.getHttpServer();
  });

  beforeEach(async () => {
    await datasource.synchronize(true);
  });

  it("returns 201 when successful", async () => {
    const record = { level: testLevel.name, score: 0 };
    const response = await request(server)
      .post("/score")
      .set("Content-Type", "application/json")
      .send(record)
      .expect(201);
    const createdRecord = response.body as PublicPlayerScoreEntity;

    expect(createdRecord).not.toBeNull();
    expect(createdRecord?.level).toBe(record.level);
    expect(createdRecord?.score).toBe(record.score);
  });

  it("updates database when successful", async () => {
    const record = { level: testLevel.name, score: 1234 };
    await request(server)
      .post("/score")
      .set("Content-Type", "application/json")
      .send(record)
      .expect(201);

    const databaseRecord = await scoreRepository.findOne({
      where: { ...record },
    });
    expect(databaseRecord).not.toBeNull();
    expect(databaseRecord?.level).toBe(record.level);
    expect(databaseRecord?.score).toBe(record.score);
  });

  describe("returns 400 when", () => {
    it("level name is missing", () => {
      return request(server)
        .post("/score")
        .set("Content-Type", "application/json")
        .send({ score: 0 })
        .expect(400);
    });

    it("level name format is invalid", () => {
      return request(server)
        .post("/score")
        .set("Content-Type", "application/json")
        .send({ level: [123, null, "not a plain string"], score: 0 })
        .expect(400);
    });

    it("level name is empty string", () => {
      return request(server)
        .post("/score")
        .set("Content-Type", "application/json")
        .send({ level: "", score: 0 })
        .expect(400);
    });

    it("level name is unknown", () => {
      return request(server)
        .post("/score")
        .set("Content-Type", "application/json")
        .send({ level: "levelThatDoesNotExist", score: 0 })
        .expect(400);
    });

    it("score is missing", () => {
      return request(server)
        .post("/score")
        .set("Content-Type", "application/json")
        .send({ level: testLevel.name })
        .expect(400);
    });

    it("score format is invalid", () => {
      return request(server)
        .post("/score")
        .set("Content-Type", "application/json")
        .send({ level: testLevel.name, score: "a lot" })
        .expect(400);
    });

    it("score exceeds max possible score", () => {
      return request(server)
        .post("/score")
        .set("Content-Type", "application/json")
        .send({ level: testLevel.name, score: testLevel.maxScore + 1 })
        .expect(400);
    });

    it("score is negative", () => {
      return request(server)
        .post("/score")
        .set("Content-Type", "application/json")
        .send({ level: testLevel.name, score: -1 })
        .expect(400);
    });

    it("score is not an integer", () => {
      return request(server)
        .post("/score")
        .set("Content-Type", "application/json")
        .send({ level: testLevel.name, score: 11.111 })
        .expect(400);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
