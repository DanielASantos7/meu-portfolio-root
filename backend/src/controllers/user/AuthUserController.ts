import { Request, Response } from "express";
import { AuthUserService } from "../../services/user/AuthUserService";

class AuthUserController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body;

    const authUserService = new AuthUserService();

    // Executa autenticação do usuário
    // Caso de erro, o erro será capturado pelo tratamento de erros do Express (server.ts)
    const auth = await authUserService.execute({
      email,
      password,
    });

    return res.json(auth);
  }
}

export { AuthUserController };
