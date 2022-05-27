import React from 'react';
import styled, { keyframes } from 'styled-components';

interface SpinnerProps {
  size: number;
  color: string;
  margin: string;
  padding: string;
}

function Spinner<SpinnerProps>({
  color, size, margin, padding,
}) {
  return (
    <Container size={size} margin={margin} padding={padding}>
      <SpinnerContainer size={size}>
        <Svg viewBox="0 0 100 100">
          <rect
            x="72"
            y="47"
            height="6"
            width="25"
            rx="3"
            ry="3"
            fill={color}
            opacity="0"
            transform="rotate(0 50 50)"
          />
          <rect
            x="72"
            y="47"
            height="6"
            width="25"
            rx="3"
            ry="3"
            fill={color}
            opacity="0.08333333333333333"
            transform="rotate(30 50 50)"
          />
          <rect
            x="72"
            y="47"
            height="6"
            width="25"
            rx="3"
            ry="3"
            fill={color}
            opacity="0.16666666666666666"
            transform="rotate(60 50 50)"
          />
          <rect
            x="72"
            y="47"
            height="6"
            width="25"
            rx="3"
            ry="3"
            fill={color}
            opacity="0.25"
            transform="rotate(90 50 50)"
          />
          <rect
            x="72"
            y="47"
            height="6"
            width="25"
            rx="3"
            ry="3"
            fill={color}
            opacity="0.3333333333333333"
            transform="rotate(120 50 50)"
          />
          <rect
            x="72"
            y="47"
            height="6"
            width="25"
            rx="3"
            ry="3"
            fill={color}
            opacity="0.4166666666666667"
            transform="rotate(150 50 50)"
          />
          <rect
            x="72"
            y="47"
            height="6"
            width="25"
            rx="3"
            ry="3"
            fill={color}
            opacity="0.5"
            transform="rotate(180 50 50)"
          />
          <rect
            x="72"
            y="47"
            height="6"
            width="25"
            rx="3"
            ry="3"
            fill={color}
            opacity="0.5833333333333334"
            transform="rotate(210 50 50)"
          />
          <rect
            x="72"
            y="47"
            height="6"
            width="25"
            rx="3"
            ry="3"
            fill={color}
            opacity="0.6666666666666666"
            transform="rotate(240 50 50)"
          />
          <rect
            x="72"
            y="47"
            height="6"
            width="25"
            rx="3"
            ry="3"
            fill={color}
            opacity="0.75"
            transform="rotate(270 50 50)"
          />
          <rect
            x="72"
            y="47"
            height="6"
            width="25"
            rx="3"
            ry="3"
            fill={color}
            opacity="0.8333333333333334"
            transform="rotate(300 50 50)"
          />
          <rect
            x="72"
            y="47"
            height="6"
            width="25"
            rx="3"
            ry="3"
            fill={color}
            opacity="0.9166666666666666"
            transform="rotate(330 50 50)"
          />
        </Svg>
      </SpinnerContainer>
    </Container>
  );
}

Spinner.defaultProps = {
  color: '#555555',
  size: 32,
  margin: '0',
  padding: '0',
};

export { Spinner };

const SpinAnimation = keyframes`
    0% {
        transform:rotate(0deg)
    }
    to {
        transform:rotate(360deg)
    }
`;

const Svg = styled.svg`
  animation: ${SpinAnimation} 1.2s steps(12) 0s infinite;
  animation-play-state: running;
`;

const Container = styled.div.attrs((props) => ({
  style: {
    margin: props.margin,
    padding: props.padding,
    height: `${props.size}px`,
  },
}))`
  position: relative;
  width: 100%;

  box-sizing: content-box;
`;

const SpinnerContainer = styled.div.attrs((props) => ({
  style: {
    width: `${props.size}px`,
    height: `${props.size}px`,
  },
}))`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
