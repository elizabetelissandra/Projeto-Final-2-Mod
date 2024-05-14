import {Router} from 'express'


import { guestRoutes } from './guestRoutes'
import { adminRoutes } from './adminRoutes'
import { roomRoutes } from './roomRoutes'

const routes = Router()

routes.use("/guests", guestRoutes)
routes.use("/admin", adminRoutes)
routes.use("/rooms", roomRoutes)


export {routes}