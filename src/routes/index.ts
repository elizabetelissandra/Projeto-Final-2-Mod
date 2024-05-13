import {Router} from 'express'


import { guestRoutes } from './guestRoutes'
import { adminRoutes } from './adminRoutes'

const routes = Router()

routes.use("/guests", guestRoutes)
routes.use("/admin", adminRoutes)


export {routes}