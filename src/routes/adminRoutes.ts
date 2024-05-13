import {Request, Response, Router} from "express"

import { AdminRepository } from "../repositories/adminRepository"
import { adminController } from "../controllers/adminController"
import { AdminService } from "../services/AdminService"

const repository = new AdminRepository
const service = new AdminService(repository)
const controller = new adminController(service)
const adminRoutes = Router()

adminRoutes.post("/", async (req: Request, res: Response) =>{
    await controller.createAdminController(req, res)
})

adminRoutes.post("/auth" , async (req: Request, res: Response) =>{
    await controller.loginController(req, res)
})

export { adminRoutes }