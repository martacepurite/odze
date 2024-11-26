import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    return {
      table: await prisma.table.create({
        data: {
            orgId: body.orgId,
            name: body.name
        }
      })
    };
  });