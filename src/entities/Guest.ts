import { string } from "yup";
import { mongoose } from "../database";


const guestSchema = new mongoose.Schema({
    name: { Type: string },
    cpf: { Type: string },
    phone_number: { Type: number },
    email: {
        Type: string
        , unique: true
    },
    password: { type: string },
    bookings: { type: [mongoose.Types.ObjectId], ref: "Booking"}, 
    timestamps: true
})

export const guestModel = mongoose.model("Guest", guestSchema)