import {Request, Response, Router} from "express"
import { bookingController } from "../controllers/bookingController";
import { BookingService } from "../services/BookingService";
import { bookingRepository } from "../repositories/bookingRepository";
import { roomRepository} from "../repositories/roomRepository";
import { authenticate } from "../middlewares/authentication";
import { guestRepository } from "../repositories/guestRepository";

const guestRepo = new guestRepository
const repository = new bookingRepository
const roomReposi = new roomRepository
const service = new BookingService(repository, roomReposi, guestRepo)
const controller = new bookingController(service)

const bookingRoutes = Router()

bookingRoutes.post('/', authenticate, async (req: Request, res: Response) =>{
    await controller.createBooking(req, res) 
})

bookingRoutes.get('/', async (req: Request, res: Response) =>{
    await controller.listAllBookingsController(req, res) 
})

bookingRoutes.patch('/:id',authenticate,async (req: Request, res: Response) =>{
    await controller.cancelBooking(req, res)
})

export {bookingRoutes}