import React from 'react';

function forwardInnerRef(Component) {
  return ({ innerRef, ...props }) => <Component ref={innerRef} {...props} />;
}

export { forwardInnerRef };
