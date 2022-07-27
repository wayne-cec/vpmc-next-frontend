import React, { useContext } from 'react'
import style from './index.module.scss'
import Image from 'next/image'
import classNames from 'classnames'
import MarketCompareContext from '../../../MarketCompareContext'
import { Tooltip } from '@mui/material'

export interface IAction {
  onCustomizeParamBtnClick: () => void
  handleFormSubmit: () => void
}

const ActionIntelligence = () => {
  // const marketCompareContext = useContext(MarketCompareContext)
  // const { pending } = useContext(MarketCompareContext)

  return (
    <div className={style.action}>
      <Tooltip title={'此功能尚未開放'}>
        <div className={classNames({
          [style.searchBtn]: true,
          [style.loading]: false,
          [style.disabled]: true
        })}
          onClick={() => { }}
        >
          {
            false
              ? <div className={style.loader}></div>
              : <Image src={'/aprRegion/search.png'} width='30px' height='30px' />
          }

          <p>查詢</p>
        </div>
      </Tooltip>
    </div>
  )
}

export default ActionIntelligence
