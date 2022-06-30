import React, { useState, useEffect } from 'react'
import style from './index.module.scss'
import Marquee from 'react-fast-marquee'
import MarqueeNews from './MarqueeNews'
import Parser from 'rss-parser'

interface INews {
  type: string
  title: string
  link: string
}

const parser = new Parser()

const CustomMarquee = () => {
  const [news, setnews] = useState<INews[]>([])

  useEffect(() => {
    (async () => {
      const feedPolicy = await parser.parseURL('https://house.udn.com/rss/news/1009/5885/5886?ch=house')
      const feedInfo = await parser.parseURL('https://house.udn.com/rss/news/1009/5885/5889?ch=house')
      const feedMortgage = await parser.parseURL('https://house.udn.com/rss/news/1009/5885/11137?ch=house')
      const tempNews = [
        { type: '政策', title: feedPolicy.items[0].title!, link: feedPolicy.items[0].link! },
        { type: '情報', title: feedInfo.items[0].title!, link: feedInfo.items[0].link! },
        { type: '房貸', title: feedMortgage.items[0].title!, link: feedMortgage.items[0].link! }
      ]
      setnews([...tempNews])
    })()
  }, [])

  return (
    <Marquee
      gradientWidth={10}
      speed={50}
      pauseOnHover={true}
    >
      {
        news.map((aNews, index) => {
          return <MarqueeNews
            key={index}
            {...aNews}
          />
        })
      }
      {/* <MarqueeNews type={'快訊'} title={'沒有啦，這是假新聞'} /> */}
    </Marquee>
  )
}

export default CustomMarquee