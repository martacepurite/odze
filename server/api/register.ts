import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    return {
      users: await prisma.user.create({
        data: {
            email: body.email,
            password: body.password,
            isAdmin: body.isAdmin,
            
        }
      })
    };
  });