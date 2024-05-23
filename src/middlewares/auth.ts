import { type Request, type Response, type NextFunction } from "express";
import jwt from "jsonwebtoken";
import { authConfig } from "../config/auth";

type JwtPayload = {
  id: string;
};

export async function auth(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).send({ error: "No token provided!" });
    }

    const tokenParts = authHeader.split(" ");

    if (tokenParts.length !== 2) {
      return res.status(401).send({ error: "Token error!" });
    }

    const [tokenSchema, token] = tokenParts;

    if (tokenSchema !== "Bearer") {
      return res.status(401).send({ error: "Token error!" });
    }

    const { role } = jwt.verify(token, authConfig.secret) as any;

    if (role !== "admin") {
      return res.status(403).send({ error: "Not authorized" });
    }

    next();
  } catch (error) {
    return res.status(401).send({ error: "Token error!" });
  }
}
