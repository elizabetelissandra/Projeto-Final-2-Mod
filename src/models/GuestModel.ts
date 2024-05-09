import { mongoose } from "../database";
import { IGuest } from "../entities/Guest";

const guestSchema = new mongoose.Schema<IGuest>({
    name: {Type: String},
    cpf: {Type: String},
    phone_number: {Type: Number},
    email: {Type: String
    , unique: true},
    password: {type: String},
    bookings: {type: [mongoose.Types.ObjectId], ref: "Booking"}
})

export const Guest = mongoose.model("Guest", guestSchema)

