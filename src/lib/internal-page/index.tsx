import React, { Fragment } from 'react'

interface InternalPageProps {
  isHeaderVisible?: boolean;
  children: React.FunctionComponentElement<any>[];
}

function InternalPage({ children, isHeaderVisible }: InternalPageProps) {

  return (
    <Fragment>
      {children}
    </Fragment>
  )
}

export default InternalPage;
