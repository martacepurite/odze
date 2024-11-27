import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    return {
      table: await prisma.table.delete({
        where: {
            id: body.id,
        }
      })
    };
  });