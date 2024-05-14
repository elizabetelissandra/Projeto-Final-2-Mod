import { Request, Response, Router } from "express";
import { RoomController } from "../controllers/roomController";
import { RoomRepository } from "../repositories/roomRepository";
import { RoomService } from "../services/RoomService";
import { AdminRepository } from "../repositories/adminRepository";

const adminRepository = new AdminRepository
const repository = new RoomRepository
const service = new RoomService(repository, adminRepository)
const controller = new RoomController(service)
const roomRoutes = Router() 

roomRoutes.post('/', async (req: Request, res: Response) =>{
    return controller.createRoomController(req, res)
})

export { roomRoutes }