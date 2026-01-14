import { prisma } from "../../shared/database/prisma";
import { subDays } from "date-fns";

export const purgeDeletedNotes = async () => {
  await prisma.note.deleteMany({
    where: {
      deletedAt: {
        lt: subDays(new Date(), 30),
      },
    },
  });

};
