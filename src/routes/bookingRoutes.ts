import { Request, Response, Router } from "express";
import { authenticate } from "../middlewares/authentication";
import { BookingModule } from "../app/Booking/bookingModule";

const { controller } = BookingModule.getInstances();
const bookingRoutes = Router();

bookingRoutes.post(
  "/",
  authenticate,
  controller.createBooking.bind(controller)
);

bookingRoutes.get("/",authenticate, controller.listAllBookingsController.bind(controller));

bookingRoutes.patch(
  "/:id",
  authenticate,
  controller.cancelBooking.bind(controller)
);

bookingRoutes.get(
  "/guest",
  authenticate,
  controller.listBookingByGuest.bind(controller)
);

export { bookingRoutes };
