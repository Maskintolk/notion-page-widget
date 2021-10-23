import { html } from 'lit';
import { NotionPageWidget } from './notion-page-widget';

export const template = (el: NotionPageWidget) => {
  return html`
    <a href="${el.pageurl}"
      ><div>
        <img src="${el.imageurl}" />
      </div>
      <div class="title">
        <h3>${el.pagetitle}</h3>
      </div>
      <p>${el.emoji}</p>
    </a>
  `;
};
