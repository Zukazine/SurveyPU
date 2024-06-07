import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

interface filteredData {
	startDate: string;
	endDate: string;
	objInfra: string;
} 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { startDate, endDate, objInfra } = req.query;

	try {
		// @ts-ignore
		const surveys = await getFilteredSurveys(startDate, endDate, objInfra);
		res.status(200).json(surveys);
	} catch (error) {
		res.status(500).json({ error: 'Failed to fetch surveys' });
	}
}
  

async function getFilteredSurveys({startDate, endDate, objInfra} : filteredData) {
  const surveys = await prisma.survey.findMany({
    where: {
      OR: [
        {
          tanggalSurvey: {
            gte: new Date(startDate),
            lte: new Date(endDate),
          },
        },
        {
          objInfra: objInfra,
        },
      ],
    },
  });
  return surveys;
}
