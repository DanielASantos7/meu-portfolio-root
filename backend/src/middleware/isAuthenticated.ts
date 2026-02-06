import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface Payload {
  sub: string;
}

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // Token vindo do header
  const authToken = req.header("Authorization");

  // Validar Token
  if (!authToken) {
    return res.status(401).json("Unauthorized");
  }

  // Limpar token
  const [, token] = authToken.split(" ");

  try {
    // validar esse token
    const { sub } = verify(token, process.env.JWT_SECRET as string) as Payload;

    // Recuperar o id do token e coloca dentro de uma variável user_ id dentro do req
    req.user_id = sub;

    return next();
  } catch (err) {
    return res.status(401).end();
  }
}
