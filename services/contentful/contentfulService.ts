import { ContentfulContentType } from './contentTypes';
import axios from 'axios';

const baseUrl = process.env.CONTENTFUL_URL;
const token = process.env.CONTENTFUL_API_KEY;

// TODO: Add error handling
export const getEntriesOfType = async (contentType: ContentfulContentType) => {
  const endpoint = `${baseUrl}/entries?access_token=${token}&content_type=${contentType}`;
  const result = await axios.get(endpoint);
  return result.data;
};

export const getAssetById = async (assetId: ContentfulContentType) => {
  const endpoint = `${baseUrl}/assets/${assetId}?access_token=${token}`;
  const result = await axios.get(endpoint);
  return result.data;
};
