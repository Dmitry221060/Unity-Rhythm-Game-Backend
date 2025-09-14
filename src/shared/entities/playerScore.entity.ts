import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, ObjectIdColumn, ObjectId } from "typeorm";

@Entity("PlayerScores")
export class PlayerScoreEntity {
  constructor(playerScore: PlayerScoreEntity) {
    Object.assign(this, playerScore);
  }

  @ObjectIdColumn()
  _id?: ObjectId;

  @Column({
    type: "string",
    length: 50,
  })
  level!: string;

  @Column({
    type: "string",
    length: 40,
  })
  name!: string;

  @Column({ type: "int" })
  score!: number;
}

export class PublicPlayerScoreEntity {
  @ApiProperty({ description: "Name of the level", example: "Test" })
  level: string;

  @ApiProperty({ description: "User ID", example: "127.0.0.1" })
  name: string;

  @ApiProperty({ description: "Earned score", example: "0" })
  score: number;

  constructor(playerScore: PlayerScoreEntity) {
    this.level = playerScore.level;
    this.name = playerScore.name;
    this.score = playerScore.score;
  }
}
