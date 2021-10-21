import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { NotionPage } from "./NotionPageType";

/**
 * An element which fetches a page from Notion from its id, and
 * displays the cover image as a link to the page.
 */
@customElement("notion-page-widget")
export class NotionPageWidget extends LitElement {
  static styles = css`
    :host {
      --width: 300px;
      --height: 300px;
      --font-size: 20px;

      --emoji-font-size: 24px;
      --emoji-top-pos: 38px;

      display: block;
      position: relative;
      width: var(--width);
      height: var(--height);
      border-radius: 10px;
      overflow: hidden;
    }
    :host([size="large"]) {
      --width: 375px;
      --height: 375px;
      --font-size: 40px;
      --emoji-font-size: 64px;
      --emoji-top-pos: 86px;
    }
    :host([size="medium"]) {
      --width: 277px;
      --height: 277px;
      --font-size: 30px;
      --emoji-font-size: 48px;
      --emoji-top-pos: 65px;
    }
    :host([size="small"]) {
      --width: 218px;
      --height: 218px;
      --font-size: 20px;
      --emoji-font-size: 32px;
      --emoji-top-pos: 58px;
    }
    div,
    img {
      width: var(--width);
      height: calc(var(--height) / 2);
      background-color: #000;
    }
    div.title {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    h3 {
      color: #fff;
      text-align: center;
      font-size: var(--font-size);
    }
    p {
      position: absolute;
      left: 10px;
      color: rgb(255, 255, 255);
      top: var(--emoji-top-pos);
      font-size: var(--emoji-font-size);
    }
  `;

  private waitingTemplate() {
    return html` <img
      src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.dribbble.com%2Fusers%2F172519%2Fscreenshots%2F3520576%2Fdribbble-spinner-800x600.gif&f=1&nofb=1"
    />`;
  }

  private underConstructionTemplate() {
    return html` <div>
        <a href="${this.pageUrl}" target="_parent">
          <img src="${this.imageUrl}" />
        </a>
      </div>
      <div class="title">
        <h3>${this.pageTitle}</h3>
      </div>`;
  }

  private template() {
    return html` <div>
        <a href="${this.pageUrl}">
          <img src="${this.imageUrl}" />
        </a>
      </div>
      <div class="title">
        <h3>${this.pageTitle}</h3>
      </div>
      <p>${this.emoji}</p>`;
  }

  /**
   * The id of the notion page. The database id where to look for the page is set in
   * an environment variable in .env called NOTION_DATABASE_ID.
   */
  @property({ type: String })
  pageid = "";

  /**
   * The size determines how big the widget is displayed. The sizes correspond to the sizes of
   * pages in a Gallery view in Notion.
   */
  @property({ type: String, reflect: true })
  size: "small" | "medium" | "large" = "medium";

  /**
   * Title of the Notion page
   */
  @property({ type: String })
  pageTitle: string | undefined = "";

  /**
   * The url of the image. Initially set to a spinner
   */
  imageUrl =
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.gannett-cdn.com%2F-mm-%2F438112d08852a5cf64fb668899b62a1c6abcfadb%2Fc%3D0-104-5312-3105%26r%3Dx1683%26c%3D3200x1680%2Flocal%2F-%2Fmedia%2F2017%2F05%2F23%2FWIGroup%2FAppleton%2F636311326049773956-UC.jpg&f=1&nofb=1";

  /**
   * The link to the page in Notion with the pageid
   */
  pageUrl: string = "";

  /**
   * The page icon when the type is emoji
   */
  emoji: string = "";

  /**
   * If we can't fetch the page from Notion, we use this to display the error template
   */
  isError: boolean = false;

  private async getNotionPage(pageId: string) {
    const workerUrl = new Request(
      `/.netlify/functions/fetch-page?pageid=${pageId}`
    );
    const response = await fetch(workerUrl);
    if (response.ok) {
      const page: NotionPage = await response.json();

      this.imageUrl = page.cover?.url || this.imageUrl;
      this.pageUrl = page.url;
      this.pageTitle = page.title;

      // Set icon (either emoji or img)...
      this.emoji = page.icon?.emoji;
    } else {
      this.isError = true;
      this.pageTitle = "HTTP-Error: " + response.status;
    }
  }

  update(changedProperties: Map<string, any>) {
    if (changedProperties.has("pageid")) {
      if (this.pageid !== null && this.pageid !== "") {
        this.getNotionPage(this.pageid);
      }
    }
    super.update(changedProperties);
  }

  render() {
    return this.isError
      ? this.underConstructionTemplate()
      : this.pageTitle !== ""
      ? this.template()
      : this.waitingTemplate();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "notion-page-widget": NotionPageWidget;
  }
}
