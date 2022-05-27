import React from 'react';
import styled, { keyframes } from 'styled-components';

interface CircleSpinnerProps {
  size: number;
  color: string;
}

function CircleSpinner<CircleSpinnerProps>({ size, color }) {
  return (
    <Wrapper
      style={{
        width: size,
        height: size,
        color,
      }}
    >
      <Svg viewBox="0 0 50 50">
        <Circle cx="25" cy="25" r="20" fill="none" />
      </Svg>
    </Wrapper>
  );
}

CircleSpinner.defaultProps = {
  color: '#555555',
  size: 70,
};

export { CircleSpinner };

const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const dash = keyframes`
  0% {
    stroke-dasharray: 1px 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 100px 200px;
    stroke-dashoffset: -120px;
  }
`;

const Wrapper = styled.div`
  display: block;
  overflow: hidden;
`;

const Svg = styled.svg`
  animation: ${rotate} 1.4s linear infinite;
  display: block;
`;

const Circle = styled.circle`
  stroke: currentColor;
  stroke-linecap: round;
  animation: ${dash} 1.4s ease-in-out infinite;
  stroke-dasharray: 80px 200px;
  stroke-dashoffset: 0;
  stroke-width: 3px;
`;
