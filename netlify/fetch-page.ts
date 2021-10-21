import { Client } from "@notionhq/client";
import dotenv from "dotenv";
import { NotionPage } from "../src/NotionPageType";

dotenv.config();

// Notion environment variables
const { NOTION_SECRET, NOTION_DATABASE_ID } = process.env;

exports.handler = async function (event, context) {
  try {
    const notion = new Client({ auth: NOTION_SECRET });
    const pageId = event.queryStringParameters.pageid;

    // console.log({ pageId });

    const payload = {
      path: `databases/${NOTION_DATABASE_ID}/query`,
      method: "POST",
    };

    const { results } = await notion.request(payload);

    let page: NotionPage = {
      cover: {
        url: "",
      },
      icon: {
        type: "",
        emoji: "",
        url: "",
      },
      title: "",
      url: "",
    };

    // https://www.notion.so/jakobskov/Boghallen-Bookstore-64242e0e61b14ab1a49541d125e4a9ac
    // Example page: "64242e0e-61b1-4ab1-a495-41d125e4a9ac"
    results.forEach((element) => {
      console.log(element.id);

      if (element.id === pageId) {
        // Page
        page.title = element?.properties?.Name?.title[0]?.text?.content;
        page.url = element?.url;

        // Cover image
        page.cover.url = element?.cover?.external?.url;

        // Icon
        page.icon.type = element.icon.type;
        page.icon.emoji = element.icon?.emoji;
      }
    });

    // console.log(page);

    return {
      statusCode: 200,
      body: JSON.stringify(page),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error!",
        error: error,
      }),
    };
  }
};
