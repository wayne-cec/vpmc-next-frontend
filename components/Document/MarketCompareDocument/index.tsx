import React from 'react'
import style from './index.module.scss'

export interface IPaper {
  pid: string

}
const formatter = new Intl.NumberFormat(undefined, { style: 'decimal' })

const MarketCompareDocument = (props: IPaper) => {
  return (
    <div className={style.MarketCompareDocument} id={props.pid}>
      這是市場比較的文件
    </div>
  )
}

export default MarketCompareDocument
