import { ParamsCreateBookingDTO } from "../dtos/createBookingDTO";
import { IBooking } from "../entities/Booking";
import { bookingRepository } from "../repositories/bookingRepository";
import { guestRepository } from "../repositories/guestRepository";
import { roomRepository } from "../repositories/roomRepository";
import { StatusCode } from "../utils/statusCodes";

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

    const conflictingBookings = await this.repository.findBookingByDate(
      params.id_room,
      params.checkin_date,
      params.checkout_date
    );
    if (conflictingBookings.length > 0) {
      throw new Error("Room is already booked");
    }

    const newBooking = await this.repository.createBooking(params);

    await this.gRepository.pushBooking(params.id_guest, newBooking.id)
    return newBooking;
  }

  async listAllBookings() {
    const bookings = await this.repository.listAllBookings();
    return bookings;
  }

  async create(data: ParamsCreateBookingDTO) {
    const room = await this.rRepository.findRoomById(data.id_room);
    if (!room) {
      throw new Error("Room not found");
    }

    const guest = await this.gRepository.getById(data.id_guest)
    if (!guest) {
        throw new Error("Guest not found");
        }
    if(room.guest_capacity <= 0){
        throw new Error("Room is full" + StatusCode.BAD_REQUEST)
    }
    const payload = {
        checkin_date: new Date(data.checkin_date),
        checkout_date: new Date(data.checkout_date),
        id_room: data.id_room,
        id_guest: data.id_guest
    }

    const booking = await this.repository.createBooking(payload)

    const guestUpdated = await this.gRepository.pushBooking(data.id_guest, data.id_room)

    const decrementedHotel = await this.rRepository.decrementRoomsAvailable(data.id_room)
    
    const result = {
      ...(booking as any as {_doc: IBooking})._doc,
      guest: guestUpdated,
      room: decrementedHotel
    }
    return result;
  }
}
