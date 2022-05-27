import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import loadable from '@loadable/component';
import { shallowEqual } from 'react-redux';

import {
  disableBodyScroll,
  enableBodyScroll,
} from 'body-scroll-lock/lib/bodyScrollLock.es6';
import { defaultTheme } from 'lib/themes';
import { Spinner } from 'components/loaders';
import { ModalWrapper } from './modal-wrapper';
import { CenteredModalContent } from './centered-modal-content';

class ModalSystemContainer extends Component {
  overlayRef = null;

  state = {
    ActiveModal: null,
    activeModalCtor: null,
    activeModalProps: null,
    isLoaded: false,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { modalCtor, props } = nextProps;
    const { activeModalCtor, activeModalProps } = prevState;

    const isModalUpdated = !matchModals(activeModalCtor, activeModalProps)(
      modalCtor,
      props,
    );

    if (isModalUpdated) {
      return {
        ActiveModal: modalCtor === null ? modalCtor : loadable(modalCtor),
        activeModalCtor: modalCtor,
        activeModalProps: props,
        isLoaded: false,
      };
    }

    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    const { activeModalCtor, isLoaded, ActiveModal } = this.state;

    const isModalUpdated =
      ActiveModal && activeModalCtor !== prevState.activeModalCtor;

    if (isModalUpdated && !isLoaded) {
      ActiveModal.load().then(() =>
        this.setState(
          state =>
            state.activeModalCtor === activeModalCtor && { isLoaded: true },
        ),
      );
    }
  }

  componentWillUnmount() {
    const { isVisible } = this.props;

    if (isVisible) {
      enableBodyScroll(this.overlayRef);
    }
  }

  handleCloseRequested = (data = null) => {
    const { isAsync, close, closeAsync } = this.props;
    const { activeModalProps } = this.state;

    if (activeModalProps && typeof activeModalProps.onClose === 'function') {
      activeModalProps.onClose(data);
    }

    if (isAsync) {
      closeAsync(data);
    } else {
      close(data);
    }
  };

  overlayRendered = overlay => {
    if (overlay) {
      this.overlayRef = overlay;
      disableBodyScroll(overlay);
    } else {
      enableBodyScroll(this.overlayRef);
    }
  };

  render() {
    const { isVisible, isOpenedFromStack, overlayElement } = this.props;

    const ModalOverlay = overlayElement || CenteredModalContent;

    const { ActiveModal, activeModalProps, isLoaded } = this.state;

    const modalStatus =
      (ActiveModal && isLoaded && 'complete') ||
      (ActiveModal && !isLoaded && 'loading') ||
      'closed';

    return (
      <ThemeProvider theme={defaultTheme}>
        <ModalWrapper
          isOpen={isVisible}
          closeTimeoutMS={400}
          overlayRef={this.overlayRendered}
          onRequestClose={() => this.handleCloseRequested()}
        >
          <ModalOverlay onOverlayClick={() => this.handleCloseRequested()}>
            {modalStatus === 'loading' && <Spinner color="#fff" />}

            {modalStatus === 'complete' && (
              <ActiveModal
                {...activeModalProps}
                onClose={this.handleCloseRequested}
                isOpenedFromStack={isOpenedFromStack}
              />
            )}
          </ModalOverlay>
        </ModalWrapper>
      </ThemeProvider>
    );
  }
}

ModalSystemContainer.propTypes = {
  close: PropTypes.func.isRequired,
  closeAsync: PropTypes.func.isRequired,

  modalCtor: PropTypes.func,
  isVisible: PropTypes.bool,
  props: PropTypes.shape({}),
  isAsync: PropTypes.bool,
  isOpenedFromStack: PropTypes.bool,
  overlayElement: PropTypes.elementType,
};

ModalSystemContainer.defaultProps = {
  modalCtor: null,
  isVisible: false,
  props: null,
  isAsync: false,
  isOpenedFromStack: false,
  overlayElement: null,
};

export { ModalSystemContainer };

const matchModals = (ctor, props) => (nextCtor, nextProps) => {
  const isShallowMatch = ctor === nextCtor && shallowEqual(props, nextProps);

  if (isShallowMatch) {
    // my own deep equal for backend Notification events
    return props && props.notification
      ? props.notification.id === nextProps.notification.id
      : isShallowMatch;
  }

  return isShallowMatch;
};
