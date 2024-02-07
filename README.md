# About

My blog and portfolio website built using Next.js, Contentful and Tailwind CSS. I'm working on moving all of the personalized content to Contentful so this can be reused by anyone by substituting your own Contentful environment and data. [See it live](https://www.willsaada.com/). See the [blog post](https://www.willsaada.com/blog/nextjs-contentful-blog-setup) for more information.

## :zap: Running Locally

The first step is to create a contentful account. Sign up using the free tier, for a personal website the free tier has everything you need to get started. Once you've created your account you'll be prompted to create a space. Once you've created that, save your spaceId as you're going to need that later. If you have any issues getting an account ready take a look at this guide.

You'll see a space with no content and no content types. Content types for contentful are created to define how we want to structure our information. Entities are created using a content type and will then be rendered onto our webpage. Contentful will act as the backend CMS of our website. Next.js is a javascript framework that fetches the content and builds our static website.

To continue we need to get a CMA token and two API keys from out newly created space. The CMA token is used for the contentful management API and we can use it to automatically set up the content types that this blog template expects and some placeholder content. The two API keys, one for the content preview service and one for the content delivery service (more on that later) will fetch our content from the CMS. Select settings on the top right of the screen. Head to CMA tokens and create a token. Next head to API keys and create or use the existing tokens. Once you've got the token, keys, and space id we can move to the codebase.

Create a .env.local file in the root of the project and add the following variables. Replace the values with your own from contentful.

```local
CONTENTFUL_URL=<Contentful URL example: https://preview.contentful.com/spaces/<spacename>/environments/<environment>>

CONTENTFUL_API_KEY=<Contentful API KEY>

CMA_TOKEN=<CMA token>
```

Once you have that setup you'll need to run the following commands

```bash
npm install
npm run add-content
npm run dev
```
