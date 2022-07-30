import React from 'react'
import style from './index.module.scss'
import Divider from '../../components/SpaceDivider'

export interface IPageHeader {
  title?: string
}

const PageHeader = (props: IPageHeader) => {
  return (
    <>
      <div className={style.pageHeader}>
        <Divider distance='70px' />
        <p className={style.title}>{props.title}</p>
        <Divider distance='70px' />
      </div>
      <Divider distance='100px' />
    </>
  )
}

export default PageHeader
