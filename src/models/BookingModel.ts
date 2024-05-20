
import { mongoose } from "../database";
import { IBooking } from "../entities/Booking";

// <# Booking: Representa uma reserva de quarto em um hotel. Atributos:

// - id: Identificador único da reserva.
// - checkin_date: Data de check-in da reserva.
// - checkout_date: Data de checkout da reserva.
// - gests: Quantidade de hóspedes.
// - id_room: Identificador do quarto reservado.
// - id_guest: Identificador do hóspede que fez a reserva.
// - status: Status da reserva (por exemplo, "confirmada", "cancelada", "em andamento", "concluída").>

