import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    return {
      tables: await prisma.table.findMany({
        where: {
            orgId: body.id,
            
            
        }
      })
    };
  });