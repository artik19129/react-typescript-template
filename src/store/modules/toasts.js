import { createAction, createReducer } from 'redux-act';
import { getUniqueId } from 'lib/helpers';
import i18next from 'lib/i18n';

const addToast = createAction('Add toast');
export const removeToast = createAction('Remove toast');

export default createReducer(on => {
  on(addToast, (state, payload) => {
    const { toastId, toast } = payload;

    return {
      ...state,
      [toastId]: toast,
    };
  });

  on(removeToast, (state, payload) => {
    const { toastId } = payload;

    const { [toastId]: _, ...nextList } = state;

    return nextList;
  });
}, {});

function normalizeToast(content, options = {}) {
  let createdToast = {
    content,
    options,
  };

  if (typeof content === 'object') {
    createdToast = content;

    if (!content.options) {
      createdToast.options = {};
    }

    if (!createdToast.options.type) {
      createdToast.options.type = content.type || 'info';
    }
  } else if (typeof options === 'string') {
    createdToast.options = {
      type: options,
    };
  }

  return createdToast;
}

export const pushToast = (content, options = {}) => dispatch => {
  const createdToast = normalizeToast(content, options);
  const toastId = createdToast.options.toastId || getUniqueId();

  return dispatch(
    addToast({
      toastId,
      toast: createdToast,
    }),
  );
};

export const pushI18nToast = (message, type = 'success') => dispatch =>
  dispatch(
    pushToast({
      content: i18next.t(message),
      options: {
        type,
      },
    }),
  );

export const pushServerErrorToast = error => dispatch => {
  let message = error.response?.data?.error || error;

  if (typeof message === 'object' && message.message !== undefined) {
    message = 'unknown';
  }

  return dispatch(
    pushToast({
      content: i18next.t(`errors.${message}`),
      options: {
        type: 'error',
      },
    }),
  );
};
