import { css } from 'styled-components';

export function preloadImage(image) {
  return css`
    content: url(${image});
    position: absolute;
    width: 0;
    height: 0;
    visibility: hidden;
  `;
}
