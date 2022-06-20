import React from 'react'
import Header from '../../containers/Header'
import Footer from '../../containers/Footer'
import classNames from 'classnames'
import style from './index.module.scss'
import 'animate.css'

export interface ILayoutProps {
  children: React.ReactNode
}

const BaseLayout = ({
  children
}: ILayoutProps) => {
  return (
    <div className={classNames({
      // 'animate__animated': true,
      // 'animate__backInLeft': true
    })}>
      <Header />
      <div className="content-container">
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default BaseLayout
