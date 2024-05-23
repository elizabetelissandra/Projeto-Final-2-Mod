import { ParamsCreateGuestDTO } from "../../../dtos/createGuestDto";
import { GuestModel, IGuest } from "../entities/Guest";

export class guestRepository {
  async getByEmail(email: string) {
    const guest = await GuestModel.findOne({ email });
    return guest;
  }

  async createGuest(params: ParamsCreateGuestDTO) {
    const guest = await GuestModel.create(params);
    return guest;
  }

  async getById(id: string) {
    const guest = await GuestModel.findOne({ _id: id });
    return guest;
  }
  async listAllUsers() {
    return await GuestModel.find();
  }
  async getIdbyBookings(id: string) {
    const guest = await GuestModel.findById(id).populate("bookings").exec();
    return guest;
  }

  async pushBooking(guestId: string, bookingId: string) {
    return GuestModel.findByIdAndUpdate(
      guestId,
      {
        $push: {
          bookings: [bookingId]
        }
      },
      { new: true }
    );
  }

}
