import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    return {
      entry: await prisma.entry.create({
        data: {
            tableId: body.tableId,
            title: body.title,
            value: body.value
        }
      })
    };
  });