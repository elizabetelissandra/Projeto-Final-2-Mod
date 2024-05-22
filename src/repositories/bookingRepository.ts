import { ParamsfindBookingDate } from "../dtos/findBookinginDate";
import { BookingModel, IBooking } from "../entities/Booking";
import { StatusCode } from "../utils/statusCodes";

export class bookingRepository {
  async createBooking(params: Partial<IBooking>) {
    return BookingModel.create(params);
  }
  async findById(id: string) {
    return await BookingModel.findOne({ _id: id }).exec();
  }

  async listAllBookings() {
    return BookingModel.find();
  }

  async updateStatus(
    bookingId: string,
    newStatus: string
  ): Promise<IBooking | null> {
    return BookingModel.findByIdAndUpdate(
      bookingId,
      { $set: { status: newStatus } },
      { new: true }
    ).exec();
  }

  async findBookingsInDate(roomId: string, fistDate: Date, lastDate: Date): Promise<IBooking[]>{
    return await BookingModel.find({
      id_room: roomId,
      status: { $in: ['confirmada', 'em andamento'] },
        $or: [
            { checkin_date: { $lt: lastDate }, checkout_date: { $gt: fistDate } }
        ]
    });
  }

  async findRoomWithBookings(
    firstDate: Date,
    lastDate: Date
  ): Promise<string[]> {
    const bookings = await BookingModel.find({
      status: { $in: ["confirmada", "em andamento"] },
      $or: [
        { checkin_date: { $lt: lastDate }, checkout_date: { $gt: firstDate } },
        { checkin_date: { $gte: firstDate, $lt: lastDate } },
        { checkout_date: { $gt: firstDate, $lte: lastDate } }
      ]
    }).exec();

    return bookings.map((booking) => booking.id_room.toString());
  }

  async findByGuestId(guestId: string): Promise<IBooking[]>{
    return BookingModel.find({guest: guestId}).exec()
  }
}
