import { ObjectId } from "mongoose"

export interface IRoom {
    id: ObjectId,
    number: number,
    type: string,
    guest_capacity: number,
    daily_rate: number,
    photo: "photo",
    status: string
}