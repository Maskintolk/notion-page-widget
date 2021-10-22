import { css } from 'lit';

export const styles = css`
  :host {
    --width: 300px;
    --height: 300px;
    --font-size: 20px;

    --emoji-font-size: 24px;
    --emoji-top-pos: 38px;

    display: block;
    position: relative;
    border-radius: 10px;
    overflow: hidden;
    background-color: transparent;
    width: var(--width);
    height: var(--height);
  }
  :host([size='large']) {
    --width: 375px;
    --height: 375px;
    --font-size: 40px;
    --emoji-font-size: 64px;
    --emoji-top-pos: 86px;
  }
  :host([size='medium']) {
    --width: 277px;
    --height: 277px;
    --font-size: 30px;
    --emoji-font-size: 48px;
    --emoji-top-pos: 65px;
  }
  :host([size='small']) {
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
