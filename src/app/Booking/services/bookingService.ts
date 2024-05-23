import { ParamsCancelBookingDTO } from "../../dtos/cancelBookingDTO";
import { ParamsCreateBookingDTO } from "../../dtos/createBookingDTO";
import { guestRepository } from "../../Guests/repositories/guestRepository";
import { roomRepository } from "../../Room/repositories/roomRepository";
import { IBooking } from "../model/Booking";
import { bookingRepository } from "../repositories/bookingRepository";


export class BookingService {
  constructor(
    private repository: bookingRepository,
    private rRepository: roomRepository,
    private gRepository: guestRepository
  ) {}

  async createBooking(params: ParamsCreateBookingDTO) {
    const room = await this.rRepository.findRoomById(params.id_room);

    if (!room) {
      throw new Error("Room not found");
    }
    if (params.guests > room.guest_capacity) {
      throw new Error("Guests number is bigger than room capacity");
    }

    const conflictingBookings = await this.repository.findBookingsInDate(
      params.id_room,
      params.checkin_date,
      params.checkout_date
    );
    console.log(conflictingBookings);

    if (conflictingBookings.length > 0) {
      throw new Error("Room is already booked");
    }

    const newBooking = await this.repository.createBooking(params);

    await this.gRepository.pushBooking(params.id_guest, newBooking.id);
    return newBooking;
  }

  async listAllBookings() {
    const bookings = await this.repository.listAllBookings();
    return bookings;
  }

  async cancelBooking(data: ParamsCancelBookingDTO): Promise<IBooking | null> {
    const booking = await this.repository.findById(data.id);

    if (!booking) {
      throw new Error("Booking not found");
    }

    if (booking.id_guest.toString() !== data.id_guest) {
      throw new Error("You can't cancel this booking");
    }

    if (booking.status === "em andamento") {
      throw new Error("Booking is in progress");
    }

    const updatedBooking = await this.repository.updateStatus(
      data.id,
      "cancelada"
    );
    console.log(updatedBooking);
    if (!updatedBooking) {
      throw new Error("Erro ao cancelar a reserva");
    }

    return updatedBooking;
  }

  async getBookingByGuest(guestId: string):Promise<IBooking[]>{
    return this.repository.findByGuestId(guestId)
  }

}