import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

export const StyledToasts = styled(ToastContainer)`
  .Toastify__toast-container {
  }

  .Toastify__toast {
    font-family: inherit;
    position: relative;
    border-radius: 5px;
    font-size: 14px;
    line-height: 19px;
    padding: 14px 0 14px 19px;
    box-sizing: border-box;

    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.03);

    color: #475666;

    &--info,
    &--warning,
    &--error,
    &--blog,
    &--success {
      background-color: rgba(255, 211, 211, 0.1);
    }

    &--info {
      color: #B160D0 !important;
    }

    &--success {
      color: #40C254 !important;
    }

    &--error {
      color: #F84040 !important;
    }

    .Toastify__progress-bar {
      &--info {
        background-color: #B160D0 !important;
      }

      &--success {
        background-color: #40C254 !important;
      }

      &--error {
        background-color: #F84040 !important;
      }
    }
  }

  .Toastify__toast--pack-of-day {
    padding: 0;
  }

  .Toastify__close-button {
    display: none;
    position: absolute;
    top: 9px;
    right: 9px;

    width: 19px;
    height: 19px;
    border-radius: 50%;
    border: 1px solid #afc0d5;
    text-align: center;
  }

  Toastify__close-button--pack-of-day {
  }
`;

const CloseContainer = styled.div`
  position: absolute;
  top: 9px;
  right: 9px;

  width: 19px;
  height: 19px;

  border-radius: 50%;
  border: 1px solid #afc0d5;
  text-align: center;

  display: flex;
  align-items: center;
  justify-content: center;

  transition: border-color 0.2s, opacity 0.2s;

  opacity: 0.8;

  &:hover {
    opacity: 1;
  }
`;

const CloseButton = ({ closeToast }) => (
  <CloseContainer
    onClick={event => {
      event.stopPropagation();
      closeToast();
    }}
  >
    <svg width="7" height="7" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2.8 3.5L.6 5.7l.7.7 2.2-2.2 2.2 2.2.7-.7-2.2-2.2 2.2-2.2-.7-.7-2.2 2.2L1.3.6l-.7.7 2.2 2.2z"
        fill="#AFC0D5"
      />
    </svg>
  </CloseContainer>
);

StyledToasts.defaultProps = {
  closeButton: <CloseButton />,
};

export const Wrapper = styled.div`
  position: relative;
  z-index: 1100;
`;

export const Notification = styled.div`
  width: 300px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.03);
  border-radius: 5px;
  background-color: #ffffff;
  opacity: 0.98;
  text-align: left;
  padding: 19px 20px;
  position: fixed;
  display: flex;
  flex-direction: column;
  left: 20px;
  z-index: 5;
  bottom: ${props => `${props.count * 71 + (props.count + 1) * 20}px`};
  transition: bottom 0.25s ease-in-out;
`;

export const Title = styled.p`
  color: #69a6f1;
  font-size: 13px;
  padding-right: 25px;
`;

export const ToastBody = styled.div`
  margin-top: 2px;

  & a {
    font-size: 14px;
    line-height: 20px;
    margin-top: 9px;
    color: #5e98df;
  }
`;
