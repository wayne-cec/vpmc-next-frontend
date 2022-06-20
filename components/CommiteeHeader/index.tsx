import React from 'react'
import style from './index.module.scss'
import { parseCommitee } from '../../lib/parseCommitee'
import { ICommiteeAprDetail } from '../../store/slice/commitee'
import { ITempCommiteeInfo } from '../../pages/aprV2/commiteeInfo/[id]'

export interface ICommiteeHeader {
  commiteeDetail: ICommiteeAprDetail[]
  commiteeInfo: ITempCommiteeInfo
}

const CommiteeHeader = (props: ICommiteeHeader) => {
  return (
    <div className={style.commiteeHeader}>
      <p className={style.commiteeTitle}>
        {
          parseCommitee(props.commiteeInfo.organization)
        }
      </p>

      <div className={style.chipContainer}>

      </div>
    </div>
  )
}

export default CommiteeHeader