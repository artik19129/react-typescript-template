import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast as toastify } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as store from 'store/modules/toasts';
import i18n from 'lib/i18n';
import { StyledToasts, Title, ToastBody } from 'lib/toasts/styled';

export const CUSTOM_TOASTS = {

};

const colorByType = {
  info: '#B160D0',
  error: '#F84040',
  success: '#40C254',
  blog: '#3f5061',
};

function Toast({ toast }) {
  const { content, options } = toast;
  const { type } = options;

  return (
    <>
      <Title style={{ color: colorByType[type] }}>
        {i18n.t(`common:toasts.title.${type}`)}
      </Title>
      <ToastBody>{content}</ToastBody>
    </>
  );
}

const defaultToastOptions = {
  position: toastify.POSITION.BOTTOM_RIGHT,
  type: toastify.TYPE.INFO,
  autoClose: 10000,
};

function Toasts() {
  const dispatch = useDispatch();
  const [showed, setShowed] = useState([]);
  const toasts = useSelector(state => state.toasts);

  const removedToasts = useMemo(
    () =>
      showed.filter(
        showedToastId =>
          !Object.keys(toasts).some(toastId => toastId === showedToastId),
      ),
    [toasts],
  );

  useEffect(() => {
    removedToasts.forEach(removedId => {
      if (toastify.isActive(removedId)) {
        toastify.dismiss(removedId);
      }
    });
  }, [removedToasts]);

  // Call react-toastify when `toasts` update
  useEffect(() => {
    const toastsToShow = Object.keys(toasts).filter(id => !showed.includes(id));
    if (toastsToShow.length === 0) {
      return;
    }

    setShowed(showedIds => [...showedIds, ...toastsToShow]);

    toastsToShow.forEach(toastId => {
      const toast = toasts[toastId];
      const { options } = toast;

      toastify(<Toast toast={toast} />, {
        ...defaultToastOptions,
        ...options,

        onClose: () => {
          if (typeof options.onClose === 'function') {
            options.onClose();
          }

          dispatch(store.removeToast({ toastId }));
        },
      });
    });
  }, [toasts, showed]);

  return <StyledToasts />;
}

export { Toasts };
