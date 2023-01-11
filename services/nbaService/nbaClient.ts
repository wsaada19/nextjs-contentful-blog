import axios from 'axios';

export async function getAdvancedTeamData() {
  try {
    const teamData = await axios.get('/api/nbaData');
    return teamData.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}
