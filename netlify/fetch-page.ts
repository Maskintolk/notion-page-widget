import { Client } from '@notionhq/client';
import dotenv from 'dotenv';

import { NotionPage } from '../src/NotionPageType';

dotenv.config();

// Notion environment variables
const { NOTION_SECRET, NOTION_DATABASE_ID } = process.env;

exports.handler = async function (event, context) {
  try {
    const notion = new Client({ auth: NOTION_SECRET });
    const pageId = event.queryStringParameters.pageid;

    const payload = {
      path: `pages/${pageId}`,
      method: 'GET',
    };

    const notionPage = await notion.request(payload);

    // https://www.notion.so/jakobskov/Boghallen-Bookstore-64242e0e61b14ab1a49541d125e4a9ac
    // Example page: "64242e0e-61b1-4ab1-a495-41d125e4a9ac"
    if (notionPage) {
      let page: NotionPage = {
        cover: {
          url: '',
        },
        icon: {
          type: '',
          emoji: '',
          url: '',
        },
        title: '',
        url: '',
      };

      // Page
      page.title = notionPage?.properties?.Name?.title[0]?.text?.content;
      page.url = notionPage?.url;

      // Cover image
      page.cover.url = notionPage?.cover?.external?.url;

      // Icon
      page.icon.type = notionPage.icon.type;
      page.icon.emoji = notionPage.icon?.emoji;

      return {
        statusCode: 200,
        body: JSON.stringify(page),
      };
    }

    return {
      statusCode: 404,
      body: 'Page not found',
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: error.message,
        error: error,
      }),
    };
  }
};
