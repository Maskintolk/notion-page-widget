import { html } from 'lit';
import { NotionPageWidget } from './notion-page-widget';

export const underConstructionTemplate = (el: NotionPageWidget) => {
  return html` <div>
      <a href="${el.pageurl}" target="_blank">
        <img src="${el.imageurl}" />
      </a>
    </div>
    <div class="title">
      <h3>${el.pagetitle}</h3>
    </div>`;
};
