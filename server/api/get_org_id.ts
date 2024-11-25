import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    return {
      organization: await prisma.organization.findUnique({
        where: {
            id: body.id,
            
            
        }
      })
    };
  });