import {Router} from 'express'
import { guestRoutes } from './guestRoutes'

const routes = Router()

routes.use("/guests", guestRoutes)

export {routes}