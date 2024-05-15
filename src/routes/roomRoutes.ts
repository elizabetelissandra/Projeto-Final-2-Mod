import { Request, Response, Router } from "express";
import { RoomController } from "../controllers/roomController";
import { RoomRepository } from "../repositories/roomRepository";
import { RoomService } from "../services/RoomService";
import { adminRepository } from "../repositories/adminRepository";
import { auth } from "../middlewares/auth";
import { storageMiddleware } from "../middlewares/storage";


const AdminRepository = new adminRepository
const repository = new RoomRepository
const service = new RoomService(repository, AdminRepository)
const controller = new RoomController(service)
const roomRoutes = Router() 

roomRoutes.post('/',auth, storageMiddleware.single("photo") , async (req: Request, res: Response) =>{
    return controller.createRoomController(req, res)
})

export { roomRoutes }