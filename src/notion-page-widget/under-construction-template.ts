import { html } from 'lit';
import { NotionPageWidget } from './notion-page-widget';

export const underConstructionTemplate = (el: NotionPageWidget) => {
  return html` <div>
      <a href="${el.pageUrl}" target="_blank">
        <img src="${el.imageUrl}" />
      </a>
    </div>
    <div class="title">
      <h3>${el.pageTitle}</h3>
    </div>`;
};
