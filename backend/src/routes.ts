import { Router, Request, Response } from "express";

// Importa middleware isAuthenticated
import { isAuthenticated } from "./middleware/isAuthenticated";

// Importa autenticação de usuário
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";

const router = Router();

// Rota de Teste
router.get("/teste", (req: Request, res: Response) => {
  res.json({ ok: true, mensagem: "Servidor TypeScript rodando 100%!" });
});

// Rotas Usuário
router.post("/session", new AuthUserController().handle);
router.get("/me", isAuthenticated, new DetailUserController().handle);

export { router };
