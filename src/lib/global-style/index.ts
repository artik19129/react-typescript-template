import { createGlobalStyle } from 'styled-components';
import { prop } from 'styled-tools';

export const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: inherit;
    margin: 0;
    padding: 0;
    color: #FFFFFF;
  }

  ::-webkit-resizer {
    background-repeat: no-repeat;
    width: 4px;
    height: 0;
  }

  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-button {
    background-repeat: no-repeat;
    width: 5px;
    height: 0;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 0;
    background-color: purple;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  article, aside, dialog, figcaption, figure, footer, header, hgroup, main, nav, section {
    display: block;
  }

  body {
    font-family: Gotham Pro, sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 18px;
    color: #000;
    background: ${prop('background', '#1a091b')};
    position: relative;
    min-width: 1040px;

    @media (max-width: 1024px) {
      min-width: auto;
    }
  }

  a {
    color: inherit;
    text-decoration: none;
    background-color: transparent;
    -webkit-text-decoration-skip: objects;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    color: inherit;
    font-weight: inherit;
    font-size: inherit;
  }

  // TODO: replace Chrome focus outline for accessibility

  :focus {
    outline: 0;
  }

  p {
    margin: 0;
  }

  img {
    vertical-align: middle;
    border-style: none;
  }

  ol,
  ul {
    margin: 0;
    //list-style: none;
    padding: 0;
  }

  table {
    border-collapse: collapse;
  }

  input, button, select, textarea {
    margin: 0;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    color: inherit;
  }

  textarea {
    overflow: auto;
    resize: vertical;
    appearance: none
  }

  a, button, input, label, select, textarea {
    touch-action: manipulation;
  }

  input {
    appearance: none
  }

  a,
  button,
  [type="button"],
  [type="reset"],
  [type="submit"] {
    cursor: pointer;
  }

  button, input {
    overflow: visible;
    padding: 0;
  }

  button, select {
    text-transform: none;
  }

  svg:not(:root) {
    overflow: hidden;
  }

  button,
  html [type="button"],
  [type="reset"],
  [type="submit"] {
    -webkit-appearance: button;
  }

  button::-moz-focus-inner,
  [type="button"]::-moz-focus-inner,
  [type="reset"]::-moz-focus-inner,
  [type="submit"]::-moz-focus-inner {
    padding: 0;
    border-style: none;
  }

  input[type="radio"],
  input[type="checkbox"] {
    box-sizing: border-box;
    padding: 0;
  }

  input[type="date"],
  input[type="time"],
  input[type="datetime-local"],
  input[type="month"] {
    -webkit-appearance: listbox;
  }

  [type="number"]::-webkit-inner-spin-button,
  [type="number"]::-webkit-outer-spin-button {
    height: auto;
  }




  &.fadeIn-enter {
    opacity: 0;
  }

  &.fadeIn-enter.fadeIn-enter-active {
    opacity: 1;
    transition: opacity 0.175s ease-in-out;
  }

  &.fadeIn-exit {
    opacity: 1;
  }

  &.fadeIn-exit.fadeIn-exit-active {
    opacity: 0;
    transition: opacity 0.175s ease-in-out;
  }

  &.fadeInDown-enter {
    opacity: 0;
    //transform: translate3d(0, -50px, 0);
  }

  &.fadeInDown-enter.fadeInDown-enter-active {
    opacity: 1;
    //transform: translate3d(0, 0, 0);
    transition: opacity 0.2s ease-in-out, transform 0.3s ease-in-out;
  }

  &.fadeInDown-exit {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }

  &.fadeInDown-exit.fadeInDown-exit-active {
    //transform: translate3d(0, -50px, 0);
    opacity: 0;
    transition: opacity 0.2s ease-in-out, transform 0.3s ease-in-out;
  }

  .swiper-container-android .swiper-slide,
  .swiper-wrapper {
    transform: translate3d(0px, 0, 0);
  }

  .swiper-container-multirow > .swiper-wrapper {
    flex-wrap: wrap;
  }
  .swiper-container-free-mode > .swiper-wrapper {
    transition-timing-function: ease-out;
    margin: 0 auto;
  }
  .swiper-slide {
    flex-shrink: 0;
    width: 100%;
    /* height: 100%; */
    position: relative;
    transition-property: transform;
  }
  .swiper-invisible-blank-slide {
    visibility: hidden;
  }
  /* Auto Height */
  .swiper-container-autoheight,
  .swiper-container-autoheight .swiper-slide {
    height: auto;
  }
  .swiper-container-autoheight .swiper-wrapper {
    align-items: flex-start;
    transition-property: transform, height;
  }

  .nanobar {
    width: 100%;
    height: 4px;
    z-index: 9999;
    top: 0;
  }

  .bar {
    width: 0;
    height: 100%;
    transition: height 0.3s;
    background-color: rgb(178, 221, 255);
  }

  .nanobar .bar {
    visibility: hidden;
  }

  .nanobar .bar:first-child {
    visibility: visible;
  }
`;

export const GlobalTransition = createGlobalStyle`
  .fade-enter {
    opacity: 0;
  }
  .fade-enter-active {
    opacity: 1;
    transition: opacity 300ms ease-in;
  }
  .fade-exit {
    opacity: 1;
  }
  .fade-exit-active {
    opacity: 0;
    transition: opacity 300ms ease-in;
  }
`;
