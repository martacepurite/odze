import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    return {
      user: await prisma.user.findUnique({
        where: {
            email: body.email,
            
            
        }
      })
    };
  });