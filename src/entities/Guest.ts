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
  name: { type: String, required: true },
    cpf: { type: String, required: true },
    phone_number: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    bookings: [{ type: Schema.Types.ObjectId, ref: 'Booking' }]
}, { timestamps: true });

export const GuestModel = mongoose.model<IGuest>("Guest", guestSchema);
