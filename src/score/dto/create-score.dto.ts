import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString, Length, Min } from "class-validator";

export class CreatePlayerScoreDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  @ApiProperty({ description: "Name of the level", example: "Test" })
  level!: string;

  @IsInt()
  @Min(0)
  score!: number;
}
