import { BookingService } from "../services/BookingService";
import * as yup from "yup";
import { Request, Response } from "express";
import { StatusCode } from "../utils/statusCodes";

export class bookingController{
    constructor(private service: BookingService){}

    async createBooking(req: Request, res: Response){
        
    try {
        const { checkin_date, checkout_date, guests, id_room} = req.body
        const id_guest = req.user.id

        const data = { checkin_date, checkout_date, guests, id_room, id_guest}

        const newBooking = await this.service.createBooking(data)
        res.status(StatusCode.CREATED).send(newBooking)
    } catch (error: any) {
        res.status(StatusCode.BAD_REQUEST).send({message: error.message})
    }
}

async listAllBookingsController(req: Request, res: Response){
    try {
        const bookings = await this.service.listAllBookings()
        res.status(StatusCode.OK).send(bookings)
        } catch (error: any) {
            res.status(StatusCode.BAD_REQUEST).send({message: error.message})
        }
}

    async create(req: Request, res: Response){
        const {body, params } = req

        const createBookingValidation = yup.object({
        checkin_date: yup.string().required(),
        checkout_date: yup.string().required(),
        id_guest: yup.string().required(),
        id_room: yup.string().required(),
        })

        const payload = {...body, ...params}

        try {
            await createBookingValidation.validate(payload)
        } catch (error: any) {
            return res.status(StatusCode.BAD_REQUEST).send({message: error.message})
        }

        const result = await this.service.create(payload)
        if ("error" in result ){
            return res.status(StatusCode.BAD_REQUEST).send({message: result.error})
        }
        return res.status(StatusCode.CREATED).send(result)
    }
}