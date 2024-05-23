import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { guestRepository } from "../repositories/guestRepository";
import { InputLoginDTO, OutputLoginDTO } from "../../dtos/loginDTO";
import { ParamsCreateGuestDTO } from "../../dtos/createGuestDto";

export class GuestService {
  constructor(private repository: guestRepository) {}

  async loginGuest(params: InputLoginDTO): Promise<OutputLoginDTO> {
    const guest = await this.repository.getByEmail(params.email);
    if (!guest) {
      throw new Error("Email ou senha inválidos");
    }

    const passwordValid = await bcrypt.compare(
      params.password,
      guest.password as string
    );
    if (!passwordValid) {
      throw new Error("Email ou senha incorreto");
    }

    const token = jwt.sign(
      {
        id: guest.id,
        name: guest.name,
        role: "guest"
      },
      process.env.SECRET_KEY as string,
      { expiresIn: "10m" }
    );
    return { token };
  }

  async createGuest(params: ParamsCreateGuestDTO) {
    const guestAlreadyExists = await this.repository.getByEmail(params.email);
    if (guestAlreadyExists) {
      try {
        throw new Error("Hospede já existe");
      } catch (error) {}
    }
    const payload = {
      ...params,
      password: await bcrypt.hash(params.password, 8)
    };

    const guest = await this.repository.createGuest(payload);
    return guest;
  }

  async listAllUsers(id: string) {
    const users = await this.repository.getIdbyBookings(id);
    return users;
  }
  async listAll() {
    return this.repository.listAllUsers();
  }

}
