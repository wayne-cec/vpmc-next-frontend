import React, { useState, useRef } from 'react'
import style from './index.module.scss'
import classNames from 'classnames'
import Image from 'next/image'

const countyData: { [key: string]: { name: string, marked: boolean }[] } = {
  "北部": [
    { name: '台北市', marked: true },
    { name: '新北市', marked: true },
    { name: '桃園市', marked: true },
    { name: '新竹市', marked: false },
    { name: '新竹縣', marked: false },
    { name: '宜蘭縣', marked: false },
    { name: '基隆市', marked: false }
  ],
  "中部": [
    { name: '台中市', marked: true },
    { name: '彰化縣', marked: false },
    { name: '雲林縣', marked: false },
    { name: '苗栗縣', marked: false },
    { name: '南投縣', marked: false }
  ],
  "南部": [
    { name: '高雄市', marked: true },
    { name: '台南市', marked: true },
    { name: '嘉義市', marked: false },
    { name: '嘉義縣', marked: false },
    { name: '屏東縣', marked: false }
  ],
  "東部": [
    { name: '台東縣', marked: false },
    { name: '花蓮縣', marked: false },
    { name: '澎湖縣', marked: false },
    { name: '金門縣', marked: false },
    { name: '連江縣', marked: false }
  ]
}

const CountySelector = () => {
  const [selectedCounty, setselectedCounty] = useState<string>('台北市')
  const [open, setopen] = useState<boolean>(false)
  return (
    <div>
      <div className={style.countySelector}
        onClick={() => {
          setopen(prev => !prev)
        }}
      >
        <div className={style.titleContainer}>
          <Image src={'/aprRegion/locate.png'} width='25px' height='25px' />
          <p>{selectedCounty}</p>
        </div>
        <Image src={'/aprRegion/expand.png'} width='25px' height='25px' />
      </div>

      <div className={classNames({
        [style.popPanel]: true,
        [style.show]: open
      })}
      >
        {
          Object.keys(countyData).map((section, index) => {
            return <div className={style.countySection} key={index}>
              <p className={style.sectionTitle}>{section}</p>
              <div className={style.chipContainer}>
                {
                  countyData[section].map((county, indexj) => {
                    return <span
                      key={indexj}
                      className={classNames({
                        [style.chip]: true,
                        [style.marked]: county.marked
                      })}
                      onClick={() => {
                        setselectedCounty(county.name)
                        setopen(false)
                      }}
                    >{county.name}</span>
                  })
                }
              </div>
            </div>
          })
        }
      </div>
    </div>

  )
}

export default CountySelector