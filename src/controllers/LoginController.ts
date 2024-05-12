import {Response, Request} from "express"
import * as yup from "yup"
import { GuestRepository } from "../repositories/GuestRepository"
import { LoginService } from "../services/LoginService"
import { StatusCode } from "../utils/statusCodes"

const repository = new GuestRepository()
const service = new LoginService(repository)

export async function loginController(req: Request, res: Response){
    try{
        const {body} = req
        const bodyValidator = yup.object({
            email: yup.string().email().required(),
            password: yup.string().min(8).required()
        })
        await bodyValidator.validate(body)
        const result = await service.loginGuest(body)
        return res.status(StatusCode.OK).send(result)
    } catch (error: any) {
        return res.status(StatusCode.BAD_REQUEST).send({message: error.message })
    }
}