import { ParamsCancelBookingDTO } from "../dtos/cancelBookingDTO";
import { ParamsCreateBookingDTO } from "../dtos/createBookingDTO";
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
      throw new Error("Quarto não achado!");
    }
    if (params.guests > room.guest_capacity) {
      throw new Error("O número de hóspedes é maior que a capacidade do quarto");
    }

    const conflictingBookings = await this.repository.findBookingsInDate(
      params.id_room,
      params.checkin_date,
      params.checkout_date
    );

    if (conflictingBookings.length > 0) {
      throw new Error("O quarto já está reservado");
    }

    const newBooking = await this.repository.createBooking(params);

    await this.gRepository.pushBooking(params.id_guest, newBooking.id);
    return newBooking;
  }

  async listAllBookings(guestId: string) {
    const bookings = await this.repository.listAllBookings(guestId);
    return bookings;
  }

  async cancelBooking(data: ParamsCancelBookingDTO): Promise<IBooking | null> {
    const booking = await this.repository.findById(data.id);

    if (!booking) {
      throw new Error("Reserva não encontrada");
    }

    if (booking.id_guest.toString() !== data.id_guest) {
      throw new Error("Você não pode cancelar essa reserva!");
    }

    if (booking.status === "em andamento") {
      throw new Error("Reserva em andamento");
    }

    const updatedBooking = await this.repository.updateStatus(
      data.id,
      "cancelada"
    );
    
    if (!updatedBooking) {
      throw new Error("Erro ao cancelar a reserva");
    }

    return updatedBooking;
  }

  async getBookingByGuest(guestId: string):Promise<IBooking[]>{
    return this.repository.findByGuestId(guestId)
  }

}