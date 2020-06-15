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
  ForeignKey,
} from "sequelize-typescript";

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

  @ForeignKey(() => Submission)
  @Column(DataType.STRING)
  submissionId: string;

  @BelongsTo(() => Submission)
  submission: Submission;
}

export default Review;
