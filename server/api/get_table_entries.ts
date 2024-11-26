import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    return {
      entries: await prisma.entry.findMany({
        where: {
            tableId: body.id,
            
            
        }
      })
    };
  });