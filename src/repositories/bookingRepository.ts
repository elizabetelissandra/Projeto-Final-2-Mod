import { BookingModel, IBooking } from "../entities/Booking";
import { StatusCode } from "../utils/statusCodes";

export class bookingRepository {
  async createBooking(params: Partial<IBooking>) {
    return BookingModel.create(params)
  }

  async findBookingByDate(
    roomId: string,
    firstDate: Date,
    lastDate: Date
  ): Promise<IBooking[]> {
    return BookingModel.find({
      id_room: roomId,
      status: { $in: ["confirmada", "em andamento"] },
      $or: [
        { checkin_date: { $lt: lastDate }, checkout_date: { $gt: firstDate } }
      ]
    });
  }
  async findById(id: string) {
    return await BookingModel.findOne({ _id: id });
  }

  async listAllBookings() {
    return BookingModel.find();
  }
}
