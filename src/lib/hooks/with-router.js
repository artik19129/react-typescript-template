import React from 'react';
import { useNavigate } from 'react-router-dom';

export const withRouter = Component => {
  return props => {
    const history = useNavigate();

    return <Component history={history} {...props} />;
  };
};
