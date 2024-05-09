import mongoose from "mongoose"

export interface IGuest{
    id: string
    name: string
    cpf: string
    phone_number: number
    email: string
    password: string
    bookings: Array<mongoose.Types.ObjectId>
}

export interface IGuestDTO{
    name: string
    cpf: string
    phone_number: number
    email: string
    password: string
}