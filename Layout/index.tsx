import React from 'react'
import Header from '../containers/Header'
import Footer from '../containers/Footer'

export interface ILayoutProps {
  children: React.ReactNode
}

const Layout = ({
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

export default Layout
