import React, { useState, useEffect } from 'react'
import style from './index.module.scss'
import { useSelector } from 'react-redux'
import { selectCommitee } from '../../store/slice/commitee'
import { parseCommitee } from '../../lib/parseCommitee'
import { ICommiteeAprDetail } from '../../store/slice/commitee'

export interface ICommiteeHeader {
  commiteeDetail: ICommiteeAprDetail[]
}

const CommiteeHeader = (props: ICommiteeHeader) => {
  const commiteeInfo = useSelector(selectCommitee)

  return (
    <div className={style.commiteeHeader}>
      <p className={style.commiteeTitle}>
        {
          parseCommitee(commiteeInfo.currentCommitee?.organization!)
        }
      </p>

      <div className={style.chipContainer}>

      </div>
    </div>
  )
}

export default CommiteeHeader