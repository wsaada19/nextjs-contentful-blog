import 'dotenv/config';

import {
  createContentType,
  homePageContentType,
  pageData,
  post,
  codeEntry,
  createEntry,
} from './contentful.mjs';

await createContentType('homePage', homePageContentType);
await createContentType('pageData', pageData);
await createContentType('post', post);
await createContentType('codeEntry', codeEntry);

console.log('Content types created successfully!');
await createEntry('homePage', {
  name: { 'en-US': 'Your Name' },
  about: {
    'en-US':
      'This is an about me lalalalala. Talk about your hobbies, interests and professional experience!',
  },
  pageDescription: {
    'en-US': 'This is the page description that will be used to set meta data on your home page',
  },
  pageTitle: { 'en-US': 'Title that shows up on the tab!' },
});

await createEntry('pageData', {
  pageId: { 'en-US': 'blog' },
  heading: {
    'en-US': 'Blog',
  },
  title: {
    'en-US': 'Blog posts',
  },
  description: { 'en-US': 'List of blog posts' },
});

await createEntry('pageData', {
  pageId: { 'en-US': 'portfolio' },
  heading: {
    'en-US': 'Portfolio',
  },
  title: {
    'en-US': 'My Portfolio',
  },
  description: { 'en-US': "See what I've built" },
});
