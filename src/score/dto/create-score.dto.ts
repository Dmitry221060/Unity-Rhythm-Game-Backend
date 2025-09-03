import { IsInt, IsNotEmpty, IsString, Length, Min } from "class-validator";

export class CreatePlayerScoreDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  level!: string;

  @IsInt()
  @Min(0)
  score!: number;
}
