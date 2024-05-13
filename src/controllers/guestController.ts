import { Request, Response } from "express";
import * as yup from "yup"
import { StatusCode } from "../utils/statusCodes";
import { GuestService } from "../services/GuestService";

export class GuestController{
    constructor(private service: GuestService){}
 async loginController(req: Request, res: Response){
    try{
        const {body} = req
        const bodyValidator = yup.object({
            email: yup.string().email().required(),
            password: yup.string().min(8).required()
        })
        await bodyValidator.validate(body)
        const result = await this.service.loginGuest(body)
        return res.status(StatusCode.OK).send(result)
    } catch (error: any) {
        return res.status(StatusCode.BAD_REQUEST).send({message: error.message })
    }
}
    async createGuestController( req: Request, res: Response){
        try{
        const {body} = req
        const bodyValidator = yup.object({
            name: yup.string().required(),
            cpf: yup.number().required(),
            phone_number:  yup.number().min(8),
            email: yup.string().email().required(),
            password: yup.string().min(8).required()
        })

        await bodyValidator.validate(body)

        const result = await this.service.createGuest(body)

        return res.status(StatusCode.CREATED).send(result)
        }catch(error: any){
            if(error.message === "Hóspede já existe"){
            return res.status(StatusCode.CONFLICT).send({ message: error.message}) 
            }
            return res.status(StatusCode.BAD_REQUEST).send({message: error.message})
        }
    }
}
