import Layout from '@components/layouts/PageLayout';
import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';

export default function Chart({ lastUpdated }) {
  return (
    <Layout
      description="Randomly Generated Hytale Server Ideas with ChatGPT"
      title="Chat GPT Hytale Server Idea Generator"
    >
      <h1 className="pt-1 pb-2">Chat GPT Hytale Server Idea Generator</h1>
      <p>
        Each time this website is deployed I randomly select a few parameters to send ChatGPT via
        the OpenAI API. ChatGPT will return three Hytale Server Ideas based on the given parameters.
      </p>
      <p className="my-3 text-sm">Last updated {lastUpdated}</p>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [
      {
        params: {
          category: 'portfolio',
        },
      },
    ],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async () => {
  const lastUpdated = new Date().toLocaleDateString();
  return {
    props: { lastUpdated },
  };
};
