import { Request, Response } from "express";
import * as yup from "yup"

import { GuestRepository } from "../repositories/GuestRepository";
import { GuestService } from "../services/GuestService";
import { StatusCode } from "../utils/statusCodes";

import { mongoose } from "../database";


const guestRepository = new GuestRepository()
const guestService = new GuestService(guestRepository)

export async function createGuestController(
    req: Request, res: Response
){
    try{
    const {body} = req
    const bodyValidator = yup.object().shape({
        name: yup.string().required(),
        cpf: yup.number().required(),
        phone_number:  yup.number().min(8),
        email: yup.string().email().required(),
        password: yup.string().min(8).required()
    })

    await bodyValidator.validate(body)

    const result = await guestService.createGuest(body)

    return res.status(StatusCode.CREATED).send(result)
    }catch(error: any){
        if(error.message === "Hóspede já existe"){
           return res.status(StatusCode.CONFLICT).send({ message: error.message}) 
        }
        return res.status(StatusCode.BAD_REQUEST).send({message: error.message})
    }
}