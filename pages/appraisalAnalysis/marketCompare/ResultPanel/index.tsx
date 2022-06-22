import React, { useState, useEffect } from 'react'
import style from './index.module.scss'
import classNames from 'classnames'
import { IMarketCompareResult } from '../../../../api/prod'
import MarketCompareResultCard from '../../../../components/MarketCompareResultCard'

export interface IResultPanel {
  filteredResults: IMarketCompareResult[]
}

const ResultPanel = (props: IResultPanel) => {

  return (
    <div className={classNames({
      [style.panel]: true,
      'animate__animated': true,
      'animate__backInLeft': true
    })}>
      {
        props.filteredResults && props.filteredResults.length !== 0
          ?
          <div className={style.resultGroup}>
            <p className={style.resultStatus}>共有
              <span className={style.count}>{props.filteredResults.length}</span>
              筆實價登陸紀錄
            </p>
            <div className={style.graphGroup}>
              {
                props.filteredResults.map((result, index) => {
                  return <MarketCompareResultCard
                    key={index}
                    {...result}
                  />
                })
              }
            </div>
          </div>
          : <></>
      }
    </div>
  )
}

export default ResultPanel