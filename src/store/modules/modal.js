import { createAction, createReducer } from 'redux-act';

let globalModalResolver = () => {};
let globalModalReject = () => {};

export const showModal = createAction('Show modal', (ctor, props) => {
  if (typeof ctor === 'object') return ctor;

  return {
    ctor,
    props,
  };
});
export const hideModal = createAction('Hide modal');
export const hideFiltersModal = createAction('Hide filters modal');

const defaultModalContainerState = {
  isVisible: false,
  lastStackId: 0,
  stack: [],
};

const defaultModalState = {
  id: 0,
  modalCtor: null,
  overlayElement: null, // ModalSystemContainer will fallback to `CenteredModalContent`
  props: null,
  isAsync: false,
};

export const modalsReducer = createReducer(
  on => {
    on(showModal, (state, payload) => {
      const { lastStackId } = state;
      const { ctor: modalCtor, overlayElement, isAsync, props } = payload;

      const nextModalId = lastStackId + 1;

      return {
        ...defaultModalContainerState,
        stack: [
          {
            ...defaultModalState,
            modalCtor,
            props,
            overlayElement,

            id: nextModalId,
            isAsync: Boolean(isAsync),
          },
          ...state.stack,
        ],
        isVisible: true,
        lastStackId: nextModalId,
      };
    });

    on(hideModal, (state, value) => {

      if (!state.stack[0]) {
        return {
          ...state,
          stack: state.stack.slice(1),
          isVisible: state.stack.length > 1,
        };
      }

      return {
        ...state,
        stack: state.stack.slice(1),
        isVisible: state.stack.length > 1,
      };
    });
  },
  {
    ...defaultModalContainerState,
  },
);

export const showModalAsync = (ctor, props) => dispatch =>
  new Promise((resolve, reject) => {
    globalModalResolver = resolve;
    globalModalReject = reject;

    return dispatch(
      showModal({
        ctor,
        props,
        isAsync: true,
      }),
    );
  });

export const hideModalAsync = (value, isRejected) => dispatch => {
  if (isRejected) {
    globalModalReject(value);
  } else {
    globalModalResolver(value);
  }

  return dispatch(hideModal());
};

export default modalsReducer;
