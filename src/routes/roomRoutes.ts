import { Request, Response, Router } from "express";
import { RoomController } from "../controllers/roomController";
import { roomRepository } from "../repositories/roomRepository";
import { RoomService } from "../services/RoomService";
import { adminRepository } from "../repositories/adminRepository";
import { auth } from "../middlewares/auth";
import { storageMiddleware } from "../middlewares/storage";
import { bookingRepository } from "../repositories/bookingRepository";
import { authenticate } from "../middlewares/authentication";

const bRepository = new bookingRepository
const repository = new roomRepository
const service = new RoomService(repository, bRepository)
const controller = new RoomController(service)
const roomRoutes = Router() 

roomRoutes.post('/',auth, storageMiddleware.single("photo") , async (req: Request, res: Response) =>{
    return controller.createRoomController(req, res)
})

roomRoutes.patch('/:id', auth, async (req: Request, res: Response) =>{
    return controller.updateStatusController(req, res)
})

roomRoutes.get('/', async (req: Request, res: Response) =>{
    return controller.findRoomByStatusController(req, res)
})

roomRoutes.get('/allrooms', async (req: Request, res: Response) =>{
    return controller.listAllRoomsController(req, res)
})

roomRoutes.get('/findbydate',authenticate, async (req: Request, res: Response) =>{
    return controller.listAvailableRoomsByDate(req, res)
})

export { roomRoutes }