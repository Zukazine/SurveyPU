import { NextApiRequest, NextApiResponse } from 'next';
import { getFilteredSurveys } from './getFilteredSurveys';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { startDate, endDate } = req.query;

//   try {
//     // @ts-ignore
//     const surveys = await getFilteredSurveys(startDate, endDate);
//     res.status(200).json(surveys);
//   } catch (error) {
//     // @ts-ignore
//     console.error(error.res.data); 
//     res.status(500).json({ error: 'Failed to fetch surveys' });
//   } 
// }

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { startDate, endDate } = req.query;

  try {
    let surveys;
    if (!startDate && !endDate) {
      // Fetch all surveys
      surveys = await getFilteredSurveys('2000-01-01', new Date().toISOString().split('T')[0]);
    } else {
      // @ts-ignore
      surveys = await getFilteredSurveys(startDate, endDate);
    }
    res.status(200).json(surveys);
  } catch (error) {
    // @ts-ignore
    console.error(error.res.data);
    res.status(500).json({ error: 'Failed to fetch surveys' });
  }
}

