import { ContentfulContentType } from './contentTypes';
import axios from 'axios';

const baseUrl = process.env.CONTENTFUL_URL;
const token = process.env.CONTENTFUL_API_KEY;

type EntriesResponse<T> = {
  items: T[];
  includes: any;
};
export async function getEntriesOfType<T>(
  contentType: ContentfulContentType
): Promise<EntriesResponse<T>> {
  const endpoint = `${baseUrl}/entries?access_token=${token}&content_type=${contentType}&include=10`;
  const result = await axios.get(endpoint);
  return {
    items: result.data.items.map((entries) => entries.fields),
    includes: result.data.includes,
  };
}

export const getAssetById = async (assetId: ContentfulContentType) => {
  const endpoint = `${baseUrl}/assets/${assetId}?access_token=${token}`;
  const result = await axios.get(endpoint);
  return result.data;
};
