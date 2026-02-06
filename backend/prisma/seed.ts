import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await hash("Balaomagico@@!!", 12);

  const admin = await prisma.user.upsert({
    where: { email: "d7.santos2008@gmail.com" },

    update: { password: passwordHash },

    create: {
      name: "Daniel Andrade Santos",
      email: "d7.santos2008@gmail.com",
      password: passwordHash,
    },
  });

  console.log("Admin criado/atualizado com sucesso:", admin);
}

// Boilerplate padrão para rodar script e desconectar do banco no final
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
