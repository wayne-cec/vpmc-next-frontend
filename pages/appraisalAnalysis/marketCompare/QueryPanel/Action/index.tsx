import React, { useContext } from 'react'
import style from './index.module.scss'
import Image from 'next/image'
import classNames from 'classnames'
import MarketCompareContext from '../../MarketCompareContext'

export interface IAction {
  onCustomizeParamBtnClick: () => void
  handleFormSubmit: () => void
}

const Action = () => {
  const marketCompareContext = useContext(MarketCompareContext)
  const { pending } = useContext(MarketCompareContext)

  return (
    <div className={style.action}>
      <div className={style.settingBtn}
        onClick={marketCompareContext.onCustomizeParamBtnClick}
      >
        <Image src={'/aprRegion/setting.png'} width='30px' height='30px' />
        <p>自定義參數</p>
      </div>

      <div className={classNames({
        [style.searchBtn]: true,
        [style.loading]: pending
      })}
        onClick={() => {
          if (!pending) {
            marketCompareContext.handleFormSubmit()
          }
        }}
      >
        {
          pending
            ? <div className={style.loader}></div>
            : <Image src={'/aprRegion/search.png'} width='30px' height='30px' />
        }

        <p>查詢</p>
      </div>
    </div>
  )
}

export default Action
