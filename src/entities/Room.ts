import  { Schema, ObjectId } from "mongoose";
import { mongoose } from "../database";


export interface IRoom {
  id: ObjectId;
  number: number;
  type: string;
  guest_capacity: number;
  daily_rate: number;
  photo: "photo";
  status: string;
}

const roomSchema: Schema = new Schema({
  number: { type: Number, unique: true },
  type: { type: String, default: "individual" },
  guest_capacity: { type: Number },
  daily_rate: { type: Number },
  photo: { type: String },
  status: { type: String, default: "disponivel" }
});

export const RoomModel = mongoose.model<IRoom>("Room", roomSchema)
