import contentful from 'contentful-management';

const SPACE_ID = process.env.SPACE_ID;
const ACCESS_TOKEN = process.env.CMA_TOKEN;

export const homePageContentType = {
  name: 'Home Page',
  description: 'Information about the website home page',
  fields: [
    {
      id: 'name',
      name: 'name',
      type: 'Symbol',
      required: true,
      localized: false,
    },
    {
      id: 'about',
      name: 'About',
      type: 'Text',
      required: true,
      localized: false,
    },
    {
      id: 'pageDescription',
      name: 'Page Description',
      type: 'Symbol',
      required: true,
      localized: false,
    },
    {
      id: 'pageTitle',
      name: 'Page Title',
      type: 'Symbol',
      required: true,
      localized: false,
    },
  ],
};

export const codeEntry = {
  name: 'Code Snippet',
  description: 'Code snippet that can be embeded in our blog posts',
  fields: [
    {
      id: 'title',
      name: 'Title',
      type: 'Symbol',
      required: true,
      localized: false,
    },
    {
      id: 'language',
      name: 'Language',
      type: 'Symbol',
      required: true,
      localized: false,
      validations: [{ in: ['typescript', 'javascript', 'java', 'powershell', 'shell'] }],
    },
    {
      id: 'codeBlock',
      name: 'Code Block',
      type: 'Text',
      required: true,
      localized: false,
    },
  ],
};

export const post = {
  name: 'Blog Post or Project',
  description:
    'Entity that represents either a blog post or a project. Uses the rich text renderer in Contentful to create posts filled with content such as images, youtube videos and code snippets. ',
  fields: [
    {
      id: 'title',
      name: 'Title',
      type: 'Symbol',
      required: true,
      localized: false,
    },
    {
      id: 'slug',
      name: 'Slug',
      type: 'Symbol',
      required: true,
      localized: false,
      validations: [
        {
          unique: true,
          message: "Slug must be unique as it will be used to create the post's URL",
        },
      ],
    },
    {
      id: 'category',
      name: 'Category',
      type: 'Symbol',
      required: true,
      localized: false,
      validations: [
        { in: ['portfolio', 'blog'], message: "Category must be either 'portfolio' or 'blog'" },
      ],
    },
    {
      id: 'shortSummary',
      name: 'Short Summary of your post',
      type: 'Text',
      required: true,
      localized: false,
    },
    {
      id: 'summaryImage',
      name: 'Summary Image',
      type: 'Link',
      required: false,
      localized: false,
      linkType: 'Asset',
    },
    {
      id: 'content',
      name: 'Post Content',
      type: 'RichText',
      required: true,
      localized: false,
    },
    {
      id: 'publishDate',
      name: 'Publish Date',
      type: 'Date',
      localized: false,
      required: false,
    },
  ],
};

export const pageData = {
  name: 'Page Data',
  description: 'Page data that is used to set the title and meta data of a given page',
  fields: [
    {
      id: 'pageId',
      name: 'Page Id',
      type: 'Symbol',
      required: true,
      localized: false,
    },
    {
      id: 'heading',
      name: 'Heading',
      type: 'Symbol',
      required: false,
      localized: false,
    },
    {
      id: 'title',
      name: 'Title',
      type: 'Symbol',
      required: false,
      localized: false,
    },
    {
      id: 'description',
      name: 'Description',
      type: 'Symbol',
      required: false,
      localized: false,
    },
  ],
};

export const client = contentful.createClient({
  accessToken: ACCESS_TOKEN,
});

// Fetch the entry by ID
export async function getEntry(entryId) {
  const space = await client.getSpace(SPACE_ID);
  const entry = await space.getEntry(entryId);
  return entry;
}

export async function getContentType(contentTypeId) {
  const space = await client.getSpace(SPACE_ID);
  const environment = await space.getEnvironment('master');
  const contentType = await environment.getContentType(contentTypeId);
  return contentType;
}

// Update the entry
export async function updateEntry(entryId, updatedFields) {
  const space = await client.getSpace(SPACE_ID);
  const environment = await space.getEnvironment('master');

  const entry = await environment.getEntry(entryId);

  // Update the fields
  Object.keys(updatedFields).forEach((fieldName) => {
    entry.fields[fieldName]['en-US'] = updatedFields[fieldName];
  });

  // Save changes
  const updatedEntry = await entry.update();
  await updatedEntry.publish();
}

export async function createEntry(contentTypeId, fields) {
  const space = await client.getSpace(SPACE_ID);
  const environment = await space.getEnvironment('master');

  const entry = await environment.createEntry(contentTypeId, {
    fields,
  });

  entry.publish();
}

export async function createContentType(contentTypeId, contentType) {
  const space = await client.getSpace(SPACE_ID);
  const environment = await space.getEnvironment('main');

  const content = await environment.createContentTypeWithId(contentTypeId, contentType);
  await content.publish();
  return content;
}
