import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getFilteredSurveys(startDate:string , endDate:string) {
  const surveys = await prisma.survey.findMany({
    where: {
      tanggalSurvey: {
        gte: new Date(startDate),
        lte: new Date(endDate),
      },
    },
  });
  return surveys;
}