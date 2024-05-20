import {Router} from 'express'


import { guestRoutes } from './guestRoutes'
import { adminRoutes } from './adminRoutes'
import { roomRoutes } from './roomRoutes'
import { bookingRoutes } from './bookingRoutes'

const routes = Router()

routes.use("/guests", guestRoutes)
routes.use("/admin", adminRoutes)
routes.use("/rooms", roomRoutes)
routes.use("/booking", bookingRoutes)


export {routes}