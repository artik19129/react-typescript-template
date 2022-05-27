import React from 'react';

function wrapWithPreload(modalCtor, preload) {
  return Promise.all([modalCtor(), preload()]).then(
    ([{ default: LoadableModal }, preloaded]) => ({
      default: (props) => <LoadableModal {...preloaded} {...props} />,
    }),
  );
}

export { wrapWithPreload };
