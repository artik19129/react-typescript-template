import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import { lighten, darken } from 'polished';
import { Link } from 'react-router-dom';
import { isString, isArray } from 'lodash';
import { theme } from 'styled-tools';
import { defaultTheme } from 'lib/themes';

const themes = {
  successGradient: {
    bgColor: {
      color: '#982ECA',
      gradient: 'radial-gradient(100% 100% at 50% 0%, {colors})',
      hoverBgColor: 'rgba(255, 92, 252, 0.5)',
      colors: [
        ['#982ECA', '0%'],
        ['#B468D1', '72.92%'],
      ],
    },
  },

  dangerGradient: {
    bgColor: {
      color: '#CA2E38',
      gradient: 'radial-gradient(100% 100% at 50% 0%, {colors})',
      hoverBgColor: 'rgba(235, 88, 113, 0.5)',
      colors: [
        ['#CA2E38', '0%'],
        ['#F54867', '72.92%'],
      ],
    },
  },

  dark: {
    bgColor: 'rgba(0, 0, 0, 0.39)',
  },

  transparent: {
    bgColor: 'transparent',
    textColor: '#6099FA',
    hoverTextColor: lighten(0.03, '#6099FA'),
    activeTextColor: darken(0.02, '#6099FA'),
  },

  white: {
    bgColor: '#fff',
    textColor: '#6099FA',
    hoverTextColor: lighten(0.03, '#6099FA'),
    activeTextColor: darken(0.02, '#6099FA'),
  },

  whiteBlue: {
    bgColor: '#fff',
    textColor: '#6099FA',
    borderColor: '#E1EDFA',
    hoverBgColor: '#5e98df',
    hoverTextColor: '#fff',
    hoverBorderColor: '#5e98df',
    activeBgColor: darken(0.03, '#5e98df'),
    activeTextColor: '#fff',
  },

  whiteGreen: {
    bgColor: '#fff',
    textColor: '#12c78c',
    borderColor: '#d4fadf',
    hoverBgColor: lighten(0.04, '#12c78c'),
    hoverTextColor: '#fff',
    hoverBorderColor: lighten(0.04, '#12c78c'),
    activeBgColor: darken(0.03, '#12c78c'),
    activeTextColor: '#fff',
  },

  transparentGreen: {
    bgColor: 'transparent',
    textColor: '#12c78c',
    borderColor: '#cdf3d8',
    hoverTextColor: lighten(0.02, '#12c78c'),
    hoverBorderColor: lighten(0.04, '#12c78c'),
    activeTextColor: darken(0.03, '#12c78c'),
  },

  transparentBlue: {
    bgColor: 'transparent',
    textColor: '#6099FA',
    borderColor: '#d1e6fe',
    hoverTextColor: lighten(0.02, '#6099FA'),
    hoverBorderColor: lighten(0.04, '#6099FA'),
    activeTextColor: darken(0.03, '#6099FA'),
  },

  link: {
    bgColor: 'transparent',
    textColor: '#6099FA',
    hoverTextColor: lighten(0.1, '#6099FA'),
    activeTextColor: darken(0.02, '#6099FA'),
    boxShadow: 'none',
    hoverBoxShadow: 'none',
    activeBoxShadow: 'none',
  },

  lightBlue: {
    bgColor: '#F6F8FB',
    textColor: '#6099FA',

    boxShadow: 'none',
    hoverBoxShadow: 'none',
    activeBoxShadow: 'none',
    hoverBgColor: '#F6F8FB',
    hoverTextColor: lighten(0.02, '#6099FA'),
    activeBgColor: darken(0.03, '#F6F8FB'),
    activeTextColor: '#6099FA',
  },

  danger: {
    bgColor: '#fff',
    textColor: defaultTheme.colors.socRed,

    hoverBgColor: defaultTheme.colors.socRed,
    hoverTextColor: '#fff',
    hoverBorderColor: defaultTheme.colors.socRed,
    // activeBorderColor: darken(0.03, defaultTheme.colors.socRed),
    // activeBgColor: darken(0.03, defaultTheme.colors.socRed),
    activeTextColor: darken(0.03, '#fff'),
  },
};

const themeKeys = Object.keys(themes);

function getButtonStyle({ buttonTheme, withBorder }) {
  // resolve theme (base color or style object) by name
  // create css using them
  return createButtonTheme(getButtonTheme(buttonTheme), withBorder);
}

function getButtonTheme(themeName) {
  return Object.keys(themes).indexOf(themeName) !== -1
    ? themes[themeName]
    : themeName;
}

function getColorOrGradient(color) {
  return isString(color)
    ? color
    : `${color.gradient.replace(
      /{colors}/,
      color.colors.map(gradientColor => gradientColor.join(' ')).join(','),
    )}, ${color.color}`;
}

function createButtonTheme(buttonTheme, withBorder = false) {
  const isSimpleTheme = isString(buttonTheme) || isArray(buttonTheme);

  const bgColor = isSimpleTheme ? buttonTheme : buttonTheme.bgColor;
  const isSimpleColor = isString(bgColor);

  const defaultHoverBgColor = isSimpleColor
    ? lighten(0.04, bgColor)
    : lighten(0.04, bgColor.color);

  const defaultActiveBgColor = isSimpleColor
    ? darken(0.03, bgColor)
    : darken(0.03, bgColor.color);

  const defaultBorderColor = 'rgb(225, 237, 250)';

  // It is not style nor css object, it just style scheme
  // eslint-disable-next-line no-shadow
  const defaultTheme = {
    textColor: '#fff',
    hoverTextColor: '#fff',
    activeTextColor: '#fff',

    borderColor: defaultBorderColor,
    hoverBorderColor: defaultBorderColor,

    bgColor,
    hoverBgColor: defaultHoverBgColor,
    activeBgColor: defaultActiveBgColor,

    boxShadow: '0 0 1px 0 rgba(0, 0, 0, 0.1)',
    hoverBoxShadow: '0 0 15px 5px rgba(0, 56, 110, 0.08)',
    activeBoxShadow: 'inset 0 0 5px 5px rgba(0, 56, 110, 0.05)',

    withBorder,
    buttonTheme,
  };

  if (isSimpleTheme) {
    return defaultTheme;
  }

  return {
    ...defaultTheme,
    ...buttonTheme,
  };
}

export function hoverState({ buttonTheme, withBorder }) {
  const {
    bgColor,
    hoverBgColor,
    hoverBorderColor,
    hoverTextColor,
    hoverBoxShadow,
  } = getButtonStyle({ buttonTheme, withBorder });

  const activeBoxShadows = [hoverBoxShadow];

  if (withBorder) {
    activeBoxShadows.push(`inset 0 0 0 1px ${hoverBorderColor}`);
  }

  return css`
    box-shadow: ${activeBoxShadows.join(', ')};
    background: ${hoverBgColor
    ? getColorOrGradient(hoverBgColor)
    : lighten(0.04, bgColor)};
    color: ${hoverTextColor || '#fff'};
  `;
}

export function activeState({ buttonTheme, withBorder }) {
  const {
    activeBgColor,
    activeBoxShadow,
    borderColor,
    activeTextColor,
  } = getButtonStyle({
    buttonTheme,
    withBorder,
  });

  const activeBoxShadows = [activeBoxShadow];

  if (withBorder) {
    activeBoxShadows.push(`inset 0 0 0 1px ${borderColor}`);
  }

  return css`
    box-shadow: ${activeBoxShadows.join(', ')};
    background: ${getColorOrGradient(activeBgColor)};
    color: ${activeTextColor};
  `;
}

/**
 * This function takes style schema (theme) and creates styled css with all theme attributes
 * @param {object} buttonTheme
 * @param {Boolean} withBorder
 * @returns styled css
 */
export const buttonThemeStyle = ({ buttonTheme, withBorder }) => {
  const props = getButtonStyle({ buttonTheme, withBorder });

  return css`
    box-shadow: ${props.boxShadow};
    color: ${props.textColor};
    background: ${getColorOrGradient(props.bgColor)};

    ${props.withBorder &&
  css`
        box-shadow: ${props.boxShadow}, inset 0 0 0 1px ${props.borderColor};
      `};


    &:not(:disabled) {
      &:hover {
        ${hoverState({ buttonTheme, withBorder })};
      }

      &:active {
        ${activeState({ buttonTheme, withBorder })};
      }
    }
  }
  `;
};

export const Button = styled.button.attrs(getButtonStyle)`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 18px;
  line-height: 21px;

  ${buttonThemeStyle};

  ${props =>
  props.stretch
    ? css`
          padding: 0.821em 0;
          width: 100%;
          max-width: 100%;
        `
    : css`
          padding: 0.821em 1.2em;
          width: auto;
        `};

  border: 0;
  cursor: pointer;
  border-radius: 5px;
  text-decoration: none;

  font-weight: 500;
  text-align: center;

  transition: background-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out,
    border-color 0.15s ease-in-out, color 0.15s;

  &[disabled] {
    cursor: default;
    color: ${theme('colors.textGrey')};
    box-shadow: none;
  }
`;

export const ButtonLink = Button.withComponent(Link);

// eslint-disable-next-line no-multi-assign
ButtonLink.propTypes = Button.propTypes = {
  buttonTheme: PropTypes.oneOf(themeKeys),
  withBorder: PropTypes.bool,
  stretch: PropTypes.bool,
};

// eslint-disable-next-line no-multi-assign
ButtonLink.defaultProps = Button.defaultProps = {
  buttonTheme: 'green',
  withBorder: false,
  stretch: false,
};

const Loader = styled.div`
  display: flex;
  justify-content: center;
  height: 18px;
  align-items: center;
`;

const animation = keyframes`
  0%,
  80%,
  100% {
    opacity: 0.25;
  }

  40% {
    opacity: 1;
  }
`;

export const LoadingAnimation = styled.div`
  width: 8px;
  height: 8px;
  margin: 0 2px;
  background-color: ${props => props.color || '#fff'};
  border-radius: 50%;
  animation: ${animation} 1s infinite ease-in-out both;

  &:nth-child(1) {
    animation-delay: -0.3s;
  }

  &:nth-child(2) {
    animation-delay: -0.15s;
  }
`;

export function ButtonLoader({ color }) {
  return (
    <Loader>
      <LoadingAnimation color={color} />
      <LoadingAnimation color={color} />
      <LoadingAnimation color={color} />
    </Loader>
  );
}
