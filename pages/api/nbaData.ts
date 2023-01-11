import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const baseUrl = process.env.NBA_DATA_URL;

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  const teamData = await axios.get(`${baseUrl}/nbaTeamEfficiency.json`);
  res.status(200).json(teamData.data);
}
