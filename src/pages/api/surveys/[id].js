// pages/api/surveys/[id].js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    const survey = await prisma.survey.findUnique({
      where: { id },
    });
    res.status(200).json(survey);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch survey' });
  }
}
