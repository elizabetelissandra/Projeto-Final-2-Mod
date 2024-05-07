import mongoose from "mongoose"

export interface Guest{
    id: string
    name: string
    cpf: string
    phone_number: number
    email: string
    password: string
    bookings: Array<mongoose.Types.ObjectId>
}