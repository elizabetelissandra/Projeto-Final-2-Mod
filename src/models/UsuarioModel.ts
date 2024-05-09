import { mongoose } from "../database";
import { IGuest } from "../entities/Guest";

const usuarioSchema = new mongoose.Schema<IGuest>({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

export const Usuario = mongoose.model('Usuario', usuarioSchema)