import React from 'react'
import style from './index.module.scss'

export interface IPaper {
  pid: string

}

// const formatter = new Intl.NumberFormat('en-US', {
//   style: 'currency',
//   currency: 'USD'
// })
const formatter = new Intl.NumberFormat(undefined, { style: 'decimal' })

const MarketCompareDocument = (props: IPaper) => {
  return (
    <div className={style.MarketCompareDocument} id={props.pid}>
    </div>
  )
}

export default MarketCompareDocument
