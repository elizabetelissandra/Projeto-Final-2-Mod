import { mongoose } from "../database";
import { IRoom } from "../entities/Room";


const roomSchema = new mongoose.Schema<IRoom>({
    number: {Type: Number, required: true},
    type: {type: String, default: "individual"},
    guest_capacity: {Type: Number},
    daily_rate: {Type: Number},
    photo: {Type: String},
    status: {Type: String, default: "disponível"}
})

export const Room = mongoose.model("Room", roomSchema)