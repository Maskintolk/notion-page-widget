import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { styles } from './styles';
import { waitingTemplate } from './waiting-template';
import { underConstructionTemplate } from './under-construction-template';
import { template } from './template';

/**
 * An element which fetches a page from Notion from its id, and
 * displays the cover image as a link to the page.
 */
@customElement('notion-page-widget')
export class NotionPageWidget extends LitElement {
  static styles = styles;

  /**
   * The id of the notion page. The database id where to look for the page is set in
   * an environment variable in .env called NOTION_DATABASE_ID.
   */
  @property({ type: String })
  pageid = '';

  /**
   * The size determines how big the widget is displayed. The sizes correspond to the sizes of
   * pages in a Gallery view in Notion.
   */
  @property({ type: String, reflect: true })
  size: 'small' | 'medium' | 'large' = 'medium';

  /**
   * Title of the Notion page
   */
  @property({ type: String })
  pageTitle: string | undefined = '';

  /**
   * The url of the image. Initially set to a spinner
   */
  imageUrl =
    'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.gannett-cdn.com%2F-mm-%2F438112d08852a5cf64fb668899b62a1c6abcfadb%2Fc%3D0-104-5312-3105%26r%3Dx1683%26c%3D3200x1680%2Flocal%2F-%2Fmedia%2F2017%2F05%2F23%2FWIGroup%2FAppleton%2F636311326049773956-UC.jpg&f=1&nofb=1';

  /**
   * The link to the page in Notion with the pageid
   */
  pageUrl: string = '';

  /**
   * The page icon when the type is emoji
   */
  emoji: string = '';

  /**
   * If we can't fetch the page from Notion, we use this to display the error template
   */
  isError: boolean = false;

  render() {
    return this.isError
      ? underConstructionTemplate(this)
      : this.pageTitle !== ''
      ? template(this)
      : waitingTemplate;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'notion-page-widget': NotionPageWidget;
  }
}
