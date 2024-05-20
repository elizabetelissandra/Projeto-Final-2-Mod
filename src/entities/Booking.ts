import { Document } from "mongoose";
import { mongoose } from "../database";

export interface IBooking extends Document{
    checkin_date: Date,
    checkout_date: Date,
    guests: number,
    id_room: string,
    id_guest: string,
    status: string
}

const bookingSchema = new mongoose.Schema<IBooking>({
    checkin_date: { type: Date, default: Date.now},
    checkout_date: { type: Date, default: Date.now },
    guests: {type: Number},
    id_room: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true }],
    id_guest: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Guest', required: true }],
    status: {type: String, default: 'confirmada'}
})

export const BookingModel = mongoose.model("Booking", bookingSchema);