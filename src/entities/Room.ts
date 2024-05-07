import { ObjectId } from "mongoose"

export interface Room{
    id: ObjectId,
    number: number,
    type: string,
    guest_capacity: number,
    daily_rate: number,
    photo: "photo",
    status: string
}