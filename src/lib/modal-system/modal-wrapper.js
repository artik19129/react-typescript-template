import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import styled from 'styled-components';

Modal.setAppElement('#app');

function ModalAdapter({ className, ...props }) {
  const contentClassName = `${className}__content`;
  const overlayClassName = `${className}__overlay`;

  return (
    <Modal
      portalClassName={className}
      className={contentClassName}
      overlayClassName={overlayClassName}
      {...props}
    />
  );
}

ModalAdapter.propTypes = {
  className: PropTypes.string.isRequired,
};

export const ModalWrapper = styled(ModalAdapter)`
  &__overlay {
    z-index: 1040;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;

    transition: opacity 0.4s;
    opacity: 0;

    &.ReactModal__Overlay--after-open {
      opacity: 1;
    }

    &.ReactModal__Overlay--before-close {
      opacity: 0;
    }
  }
`;

ModalWrapper.propTypes = {
  isOpen: PropTypes.bool,
  onRequestClose: PropTypes.func,
  closeTimeoutMS: PropTypes.number,
};

ModalWrapper.defaultProps = {
  isOpen: false,
  onRequestClose: () => {},
  closeTimeoutMS: 0,
};

export default ModalWrapper;
