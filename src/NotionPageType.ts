// This is the information we return from the Notion API. The API
// returns a lot more, but for now this is all we need.
export interface NotionPage {
  title: string;
  url: string;
  cover: {
    url: string;
  };
  icon: {
    type: string;
    emoji: string;
    url: string;
  };
}
