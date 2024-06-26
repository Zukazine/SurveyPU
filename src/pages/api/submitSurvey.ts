import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('Req method : ',req.method)
  if (req.method === 'POST') {
    const {
      tanggalSurvey,
      pic,
      provinsi,
      kapri,
      ditjen,
      objInfra,
      areaManfaat,
      geotagPoint,
      geotagLine,
      geotagAreaInfra,
      geotagAreaManf
    } = req.body;

    try {
      const survey = await prisma.survey.create({
        data: {
          tanggalSurvey: new Date(tanggalSurvey),
          pic,
          provinsi,
          kapri,
          ditjen,
          objInfra,
          areaManfaat,
          geotagPoint,
          geotagLine,
          geotagAreaInfra,
          geotagAreaManf
        }
      });

      res.status(200).json({ message: 'Form submitted successfully!', survey });
    } catch (error) {
      res.status(500).json({ error: 'Failed to submit form' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
