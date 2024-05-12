import mongoose, { Schema, Document } from "mongoose";

export interface IGuest extends Document {
  name: string;
  cpf: string;
  phone_number: number;
  email: string;
  password: string;
  bookings: mongoose.Types.ObjectId[];
}

const guestSchema: Schema = new Schema({
  name: { type: String },
  cpf: { type: String },
  phone_number: { type: Number },
  email: {
    type: String,
    unique: true
  },
  password: { type: String },
  bookings: [{ type: mongoose.Types.ObjectId, ref: "Booking" }]
}, { timestamps: true });

export const GuestModel = mongoose.model<IGuest>("Guest", guestSchema);