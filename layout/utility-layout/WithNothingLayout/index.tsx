import React from 'react'

export const WithNothingLayout = function <P extends { [k: string]: any }> (Component: React.ComponentType<P>) {
  const wrappedComponent = (props: P) => {
    return <Component {...props} />
  }
  return wrappedComponent
}

export default WithNothingLayout
