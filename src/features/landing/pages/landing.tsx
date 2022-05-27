import React, { FunctionComponent } from 'react';
import styled, { keyframes } from 'styled-components';
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux';

const Landing: FunctionComponent = () => {
  const { t } = useTranslation('landing');
  const { ...args } = useSelector( // TODO
    state => state.landing,
  );
  const dispatch = useDispatch();


  return (
    <Container>
      <FixedSize>

      </FixedSize>
    </Container>
  );
};

export default Landing;

const fade = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;


const FixedSize = styled.div`
  width: 100%;
  padding: 50px 300px;
  max-width: 100vw;
  box-sizing: border-box;
  margin: 0 auto;

  @media (max-width: 1700px) {
    padding: 50px 150px;
  }

  @media (max-width: 1400px) {
    padding: 50px 35px;
    max-width: unset;
  }
`;

const Container = styled.div`
  background-color: #df2342;
  background-repeat: no-repeat;
  background-position: top;
  background-size: cover;
  min-height: 100vh;
  max-height: 100vh;
`;
