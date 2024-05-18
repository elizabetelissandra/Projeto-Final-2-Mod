import { ObjectId } from "mongoose"
export interface IBooking {
    checkin_date: Date,
    checkout_date: Date,
    gests: number,
    id_room: ObjectId,
    id_guest: ObjectId,
    status: string
}