import React from 'react'
import style from './index.module.scss'

export interface ICommiteePopupTemplate {
  unitPrice: number
  commiteeName: string

}

const CommiteePopupTemplate = (props: ICommiteePopupTemplate) => {

  return (
    <div className={style.CommiteePopupTemplate}>
      {props.commiteeName}
    </div>
  )
}

export default CommiteePopupTemplate