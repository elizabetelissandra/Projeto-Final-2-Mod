import { Request, Response } from "express";
import { Guest } from "../models/GuestModel";
import { GuestRepository } from "../repositories/GuestRepository";
import { GuestService } from "../services/GuestService";


const guestRepository = new GuestRepository(Guest)
const guestService = new GuestService(guestRepository)

export async function createGuestController(
    req: Request, res: Response
){
    const { name, cpf, phone_number, email, password } = req.body;
    try{
        const guest = await guestService.criarHospede({name, cpf, phone_number, email, password})
        return res.status(201).send({guest})
    }catch(error: any){
        res.status(400).send({message: error.message})
    }
}