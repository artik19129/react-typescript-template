import React from 'react';
import Responsive from 'react-responsive';

const breakpoints = {
  desktop: '769px',
  tablet: '768px',
  mobile: '425px',
};

export const Desktop = props => (
  <Responsive {...props} minWidth={breakpoints.desktop} />
);

export const Tablet = props => (
  <Responsive {...props} maxWidth={breakpoints.tablet} />
);

export const Mobile = props => (
  <Responsive {...props} maxWidth={breakpoints.mobile} />
);
