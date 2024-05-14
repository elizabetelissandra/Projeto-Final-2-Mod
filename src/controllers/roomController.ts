import { Request, Response } from "express";
import { RoomService } from "../services/RoomService";
import * as yup from "yup"
import { StatusCode } from "../utils/statusCodes";

export class RoomController{
    constructor(private service: RoomService){
    }

    async createRoomController(req: Request, res: Response){
        try{
            const {params, file, body} = req
            const inputValidator = yup.object({
              number: yup.number().required(),
              type: yup.string().required(),
              guest_capacity: yup.number().required(),
              daily_rate: yup.number().required(),
              photo: yup.string().required(),
              status: yup.string()   
            })

            const data = {...params, ...body, photo: file?.filename}

            await inputValidator.validate(data)
            const result = await this.service.createRoom(data)

            return res.status(StatusCode.CREATED).send(result)
    } catch(error: any){
        if (error.message === "Sala já cadastrada"){
            return res.status(StatusCode.CONFLICT).send({ message: error. message })
        }
        return res.status(StatusCode.BAD_REQUEST).send({message: error.message})
    }
    } 
}