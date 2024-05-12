import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { GuestRepository } from "../repositories/GuestRepository";
import { InputLoginDTO, OutputLoginDTO } from "../dtos/loginDTO";

export class LoginService {
  constructor(private repository: GuestRepository) {}

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
        name: guest.name
      },
      process.env.SECRET_KEY as string,
      { expiresIn: "5m" }
    )
    return { token };
  }
}
