import prismaClient from "../../prisma";

class DetailUserService {
  async execute(user_id: string) {
    // Procura usuário e retorna sem a senha
    const user = await prismaClient.user.findFirst({
      where: {
        id: user_id,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    // verifica se usuário existe
    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    return user;
  }
}

export { DetailUserService };
