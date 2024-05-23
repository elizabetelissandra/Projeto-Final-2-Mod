import  { Schema, Document } from "mongoose";
import { mongoose } from "../../../database";

export interface IAdmin extends Document {
  email: string;
  password: string;
}

const adminSchema: Schema = new Schema({
  email: { type: String, unique: true },
  password: { type: String }
}, { timestamps: true });

export const AdminModel = mongoose.model<IAdmin>("Admin", adminSchema)