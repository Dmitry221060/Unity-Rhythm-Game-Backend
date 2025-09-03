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
