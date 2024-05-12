import {Router} from 'express'
import { guestRoutes } from './guestRoutes'
import { loginController } from '../controllers/LoginController'

const routes = Router()

routes.use("/guests", guestRoutes)
routes.use("/login", loginController)

export {routes}