import React, { ElementType } from 'react';
import styled from 'styled-components';
import { prop } from 'styled-tools';

interface ModalTemplateProps {
  isAbleToClose?: boolean;
  container?: ElementType;
  desktopWidth?: string | number;
  tabletWidth?: number;
  onClose: Function;
  children: React.FunctionComponentElement<any>[];
}

function ModalTemplate({
  container,
  desktopWidth,
  tabletWidth,
  children,
}: ModalTemplateProps) {
  const Container = container || ModalContainer;

  return (
    <Container desktopWidth={desktopWidth} tabletWidth={tabletWidth}>
      {children}
    </Container>
  );
}

export { ModalTemplate };

const ModalContainer = styled.div<{ desktopWidth: number; tabletWidth: number; }>`
  max-width: 78.125vw;
  position: relative;
  border-radius: 5px;
  @media (max-width: 768px) {
    width: ${prop('tabletWidth')};
    max-width: 100%;
    border-radius: 0 0 5px 5px;
  }
`;

const BodyContainer = styled.div`
  overflow: auto;

  button {
    padding: 0.821em 1vw;
  }
`;

const Body = styled.div`
  //margin: 16px 30px 30px;
`;

export { ModalContainer, BodyContainer, Body };
