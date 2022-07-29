import React from 'react'
import style from './index.module.scss'
import Image from 'next/image'

export interface ICommiteePopupTemplate {
  unitPrice: number
  commiteeName: string
}

const CommiteePopupTemplate = (props: ICommiteePopupTemplate) => {

  return (
    <div className={style.CommiteePopupTemplate}>
      {/* {props.commiteeName} */}
      <Image src={'/aprRegion/community.jpg'} width='332px' height='346px' />
    </div>
  )
}

export default CommiteePopupTemplate