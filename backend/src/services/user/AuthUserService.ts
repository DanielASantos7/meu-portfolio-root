import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import prismaClient from "../../prisma";

interface AuthRequest {
  email: string;
  password: string;
}

class AuthUserService {
  async execute({ email, password }: AuthRequest) {
    // Buscando usuário por email existe
    const user = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });

    // Verirficar se existe usuário
    if (!user) {
      throw new Error("Email ou senha incorretos!");
    }

    // Verificar se senha está correta
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Email ou senha incorretos!");
    }

    // Verifica se a chave JWT está configurada nas variáveis de ambiente
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET não definida no ambiente");
    }

    // Gera token JWT (expira em 15 dias)
    const token = sign(
      {
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: "15d",
      },
    );

    // Retorna dados do usuário e token gerado
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token: token,
    };
  }
}

export { AuthUserService };
