A blog and portfolio website build with Next.js and Contentful. I'm working on moving all of the personalized content to Contentful so this can be reused by anyone with your own Contentful environment.

For the application to run you'll need to add an API key and URL for Contentful. When testing and in QA/DEV environments you should use the [preview environment](https://www.contentful.com/developers/docs/references/content-preview-api/). For production environments you should use the [delivery API](https://www.contentful.com/developers/docs/references/content-delivery-api/).

```local
CONTENTFUL_URL=<Contentful URL example: https://preview.contentful.com/spaces/<spacename>/environments/<environment>>

CONTENTFUL_API_KEY=<Contentful API KEY>
```
