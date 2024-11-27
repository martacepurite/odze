import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    return {
      entries: await prisma.entry.deleteMany({
        where: {
            tableId: body.id,
        }
      })
    };
  });