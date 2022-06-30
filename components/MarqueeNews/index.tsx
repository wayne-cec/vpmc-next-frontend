import React from 'react'
import style from './index.module.scss'

interface IMarqueeNews {
  type: string
  title: string
}

const MarqueeNews = (props: IMarqueeNews) => {
  return (
    <div className={style.marqueeNews}>
      <span className={style.newsType}>{props.type}</span>
      <span>{props.title}</span>
    </div>
  )
}

export default MarqueeNews