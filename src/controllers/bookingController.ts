import { BookingService } from "../services/BookingService";
import * as yup from "yup";
import { Request, Response } from "express";
import { StatusCode } from "../utils/statusCodes";

export class bookingController {
  constructor(private service: BookingService) {}

  async createBooking(req: Request, res: Response) {
    try {
      const { checkin_date, checkout_date, guests, id_room } = req.body;

      const id_guest = req.user.id;

      const data = { checkin_date, checkout_date, guests, id_room, id_guest };

      const newBooking = await this.service.createBooking(data);
      console.log(newBooking);
      res.status(StatusCode.CREATED).send(newBooking);
    } catch (error: any) {
      res.status(StatusCode.BAD_REQUEST).send({ message: error.message });
    }
  }

  async listAllBookingsController(req: Request, res: Response) {
    try {
      const bookings = await this.service.listAllBookings();
      res.status(StatusCode.OK).send(bookings);
    } catch (error: any) {
      res.status(StatusCode.BAD_REQUEST).send({ message: error.message });
    }
  }

  async cancelBooking(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const id_guest = req.user.id;

      const data = { id, id_guest };

      const updateBooking = await this.service.cancelBooking(data);
      res.status(StatusCode.OK).send(updateBooking);
    } catch (error: any) {
      res.status(StatusCode.SERVER_ERROR).send({ message: error.message });
    }
  }

  async listBookingByGuest(req: Request, res: Response) {
    try {
      const guestId = req.user.id;

      const bookings = await this.service.getBookingByGuest(guestId);

      res.status(StatusCode.OK).send(bookings);
    } catch (error: any) {
      res
        .status(StatusCode.SERVER_ERROR)
        .send({ message: "Error listing guest reservations" });
    }
  }
}
