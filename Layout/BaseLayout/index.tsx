import React from 'react'
import Header from '../../containers/Header'
import Footer from '../../containers/Footer'

export interface ILayoutProps {
  children: React.ReactNode
}

const BaseLayout = ({
  children
}: ILayoutProps) => {
  return (
    <>
      <Header />
      <div className="content-container">
        {children}
      </div>
      <Footer />
    </>
  )
}

export default BaseLayout
