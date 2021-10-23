import { html } from 'lit';
import { NotionPageWidget } from './notion-page-widget';

export const underConstructionTemplate = (el: NotionPageWidget) => {
  return html` <div>
      <a href="${el.pageurl}" target="_blank">
        <img
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.gannett-cdn.com%2F-mm-%2F438112d08852a5cf64fb668899b62a1c6abcfadb%2Fc%3D0-104-5312-3105%26r%3Dx1683%26c%3D3200x1680%2Flocal%2F-%2Fmedia%2F2017%2F05%2F23%2FWIGroup%2FAppleton%2F636311326049773956-UC.jpg&f=1&nofb=1"
        />
      </a>
    </div>
    <div class="title">
      <h3>${el.pagetitle}</h3>
    </div>`;
};
