import { Request, Response } from "express";
import { RoomService } from "../services/RoomService";
import * as yup from "yup";
import { StatusCode } from "../../../utils/statusCodes";
import { createRoomSchema, updateStatusSchema } from "../schema/validateRoom";

export class RoomController {
  constructor(private service: RoomService) {}

  async createRoomController(req: Request, res: Response) {
    try {
      const { params, file, body } = req;

      const data = { ...params, ...body, photo: file?.filename };

      await createRoomSchema.validate(data);
      const result = await this.service.createRoom(data);

      return res.status(StatusCode.CREATED).send(result);
    } catch (error: any) {
      if (error.message === "Sala já cadastrada") {
        return res.status(StatusCode.CONFLICT).send({ message: error.message });
      }
      return res
        .status(StatusCode.BAD_REQUEST)
        .send({ message: error.message });
    }
  }

  async updateStatusController(req: Request, res: Response) {
    try {
      const { params, body } = req;
      const data = { ...params, ...body };
      await updateStatusSchema.validate(data);

      const result = await this.service.updateStatus(data);

      return res.status(StatusCode.OK).send({
        message: `Status do quarto atualizado com sucesso, ${result}`
      });
    } catch (error: any) {
      return res
        .status(StatusCode.BAD_REQUEST)
        .send({ message: error.message });
    }
  }

  async findRoomByStatusController(req: Request, res: Response) {
    try {
      const status = req.query.status as string;
      const rooms = await this.service.findRoomByStatus(status);
      res.status(StatusCode.OK).send(rooms);
    } catch (error: any) {
      res.status(StatusCode.SERVER_ERROR).send({ message: error.message });
    }
  }

  async listAllRoomsController(req: Request, res: Response) {
    try {
      const rooms = await this.service.listAllRooms();
      res.status(StatusCode.OK).json(rooms);
    } catch (error: any) {
      res.status(StatusCode.SERVER_ERROR).json({ message: error.message });
    }
  }

  async listAvailableRoomsByDate(req: Request, res: Response){
    try {
      const { firstDate, lastDate } = req.query;

      if(!firstDate || !lastDate){
        return res.status(StatusCode.BAD_REQUEST).send({message: 'As datas de início e término são obrigatórias'})
      }

      const rooms = await this.service.getAvailableRoomsByDate(new Date(firstDate as string), new Date(lastDate as string))
      res.status(StatusCode.OK).send(rooms)
  }catch(error: any){
    res.status(StatusCode.SERVER_ERROR).send({message: error.message})
  }
}
}
