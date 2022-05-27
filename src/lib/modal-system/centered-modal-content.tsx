import React, { useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { useOnClickOutside } from '../hooks/useOnClickOutside';

interface CenteredModalContentProps {
  onOverlayClick: Function;
  disableClickOutside?: boolean;
  children: Node;
}

function CenteredModalContent({ onOverlayClick, children }: CenteredModalContentProps) {
  const contentRef = useRef();

  useOnClickOutside(contentRef, onOverlayClick);

  return (
    <CenterContentOverlay>
      <Content ref={contentRef}>{children}</Content>
    </CenterContentOverlay>
  );
}

const CenterContentOverlay = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  overflow: hidden;
  backdrop-filter: blur(4px);
`;

const transformDown = keyframes`
  from {
    transform: translate3d(0, -50px, 0);
  }

  to {
    transform: translate3d(0, 0, 0);
  }
`;

const Content = styled.div`
  margin: auto;
  max-width: 100%;
  padding: 24px;

  @media (max-width: 768px) {
    padding: 0;
    margin: 0 auto 24px;
    align-self: flex-start;

    transform-origin: top center;
  }

  transform: translate3d(0, -50px, 0);
  animation: ${transformDown} 0.3s ease-out forwards;
`;

export { CenteredModalContent };
