import {Request, Response, Router} from "express"

import { adminRepository } from "../repositories/adminRepository"
import { adminController } from "../controllers/adminController"
import { AdminService } from "../services/AdminService"
import { auth } from "../middlewares/auth"

const repository = new adminRepository
const service = new AdminService(repository)
const controller = new adminController(service)
const adminRoutes = Router()

adminRoutes.post("/", async (req: Request, res: Response) =>{
    await controller.createAdminController(req, res)
})

adminRoutes.post("/auth", async (req: Request, res: Response) =>{
    await controller.loginController(req, res)
})

export { adminRoutes }