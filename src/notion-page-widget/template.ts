import { html } from 'lit';
import { NotionPageWidget } from './notion-page-widget';

export const template = (el: NotionPageWidget) => {
  return html` <div>
      <a href="${el.pageUrl}">
        <img src="${el.imageUrl}" />
      </a>
    </div>
    <div class="title">
      <h3>${el.pageTitle}</h3>
    </div>
    <p>${el.emoji}</p>`;
};
