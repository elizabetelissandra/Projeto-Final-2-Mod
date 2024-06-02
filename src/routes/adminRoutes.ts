import {Request, Response, Router} from "express"
import { AdminModule } from "../app/Admin/AdminModule"

const adminRoutes = Router()
const {controller} = AdminModule.getInstances()

adminRoutes.post("/auth", controller.loginController.bind(controller))

export { adminRoutes }