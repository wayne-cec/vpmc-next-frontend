import React from 'react'
import style from './index.module.scss'

interface IMarqueeNews {
  type: string
  title: string
  link: string
}

const MarqueeNews = (props: IMarqueeNews) => {
  return (
    <div className={style.marqueeNews}
      onClick={() => { window.open(props.link, '_blank') }}
    >
      <span className={style.newsType}>{props.type}</span>
      <span>{props.title}</span>
    </div>
  )
}

export default MarqueeNews