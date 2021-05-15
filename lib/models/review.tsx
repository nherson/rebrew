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

  /*
   * DESCRIPTOR BOOLEANS
   */

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  acetaldehyde: boolean;

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  alcoholic: boolean;

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  astringent: boolean;

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  diacetyl: boolean;

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  dimethylSulfide: boolean;

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  estery: boolean;

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  grassy: boolean;

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  lightStruck: boolean;

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  metallic: boolean;

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  musty: boolean;

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  oxidized: boolean;

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  phenolic: boolean;

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  solvent: boolean;

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  sourAcidic: boolean;

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  sulfur: boolean;

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  vegetal: boolean;

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  yeasty: boolean;
}

export default Review;
