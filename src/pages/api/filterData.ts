import { NextApiRequest, NextApiResponse } from 'next';
import { getFilteredSurveys } from '@/app/_components/getFilteredSurveys';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { startDate, endDate } = req.query;

  try {
    const surveys = await getFilteredSurveys(startDate, endDate);
    res.status(200).json(surveys);
  } catch (error) {
    console.error(error.res.data); 
    res.status(500).json({ error: 'Failed to fetch surveys' });
  } 
}
