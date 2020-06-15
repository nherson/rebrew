import {
  DataType,
  Table,
  Column,
  Model,
  PrimaryKey,
  Max,
  Min,
  NotNull,
  AllowNull,
  BelongsTo,
} from "sequelize-typescript";

import db from "../db";
import Submission from "./submission";

@Table
class Review extends Model<Review> {
  @PrimaryKey
  @Column(DataType.STRING)
  id: string;

  @AllowNull(false)
  @Max(5)
  @Min(1)
  @Column(DataType.INTEGER)
  aromaScore: number;

  @AllowNull(false)
  @Max(5)
  @Min(1)
  @Column(DataType.INTEGER)
  appearanceScore: number;

  @AllowNull(false)
  @Max(5)
  @Min(1)
  @Column(DataType.INTEGER)
  flavorScore: number;

  @AllowNull(false)
  @Max(5)
  @Min(1)
  @Column(DataType.INTEGER)
  mouthfeelScore: number;

  @AllowNull(false)
  @Max(5)
  @Min(1)
  @Column(DataType.INTEGER)
  styleScore: number;

  @AllowNull(true)
  @Column(DataType.TEXT)
  comments: string;

  //   @BelongsTo(() => Submission)
  //   submission: Submission;
}

db.addModels([Review]);
db.sync();

export default Review;
