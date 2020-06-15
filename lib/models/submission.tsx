import {
  DataType,
  Table,
  Column,
  Model,
  PrimaryKey,
  AllowNull,
  HasMany,
} from "sequelize-typescript";

import db from "../db";
import Review from "./review";

@Table
class Submission extends Model<Submission> {
  @PrimaryKey
  @Column(DataType.STRING)
  id: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  name: string;

  // The category+subcategory string representing the style
  // e.g. 17A --> British strong ale
  @Column(DataType.STRING)
  style: string;

  @Column(DataType.TEXT)
  notes: string;

  // The email address of the user who made the submission
  @Column(DataType.STRING)
  email: string;

  //   @HasMany(() => Review)
  //   reviews: Review[];
}

db.addModels([Submission]);
db.sync();

export default Submission;
