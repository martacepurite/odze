import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    return {
      entry: await prisma.entry.delete({
        where: {
            id: body.id,
        }
      })
    };
  });