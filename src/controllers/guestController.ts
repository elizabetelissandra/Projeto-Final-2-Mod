import { Request, Response } from "express";
import { GuestRepository } from "../repositories/GuestRepository";
import { GuestService } from "../services/GuestService";
import { guestModel } from "../entities/Guest";
import * as yup from "yup"
import { mongoose } from "../database";


const guestRepository = new GuestRepository()
const guestService = new GuestService(guestRepository)

export async function createGuestController(
    req: Request, res: Response
){
    const guestSchema = new mongoose.Schema({
        name: yup.string().required(),
        cpf: yup.number().required(),
        phone_number:  yup.number().min(8),
        email: yup.string().email().required(),
        password: yup.string().min(8).required()
    })

    const { name, cpf, phone_number, email, password } = req.body;
    try{
        const guest = await guestService.createGuest({name, cpf, phone_number, email, password})
        return res.status(201).send({guest})
    }catch(error: any){
        res.status(400).send({message: error.message})
    }
}