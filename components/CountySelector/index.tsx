import React, { useState, useRef, useEffect } from 'react'
import style from './index.module.scss'
import classNames from 'classnames'
import Image from 'next/image'
import { useOutside } from '../../hooks'

export interface ICountySelector {
  countyData: { [key: string]: { name: string, marked: boolean }[] }
  selectedCounty: string | null
  onCountyChange: (county: string) => void
}

const CountySelector = (props: ICountySelector) => {
  const btnRef = useRef(null)
  const [open, setopen] = useState<boolean>(false)
  useOutside(btnRef, () => {
    setopen(false)
  })

  return (
    <div
      ref={btnRef}
    >
      <div className={classNames({
        [style.countySelector]: true,
        [style.show]: open
      })}
        onClick={() => {
          setopen(prev => !prev)
        }}
      >
        <div className={style.titleContainer}>
          <Image src={'/aprRegion/locate.png'} width='25px' height='25px' />
          <p>
            {
              props.selectedCounty
            }
          </p>
        </div>
        <Image src={'/aprRegion/expand.png'} width='25px' height='25px' />
      </div>

      {
        props.countyData ? <div className={classNames({
          [style.popPanel]: true,
          [style.show]: open
        })}
        >
          {
            Object.keys(props.countyData).map((section, index) => {
              return <div className={style.countySection} key={index}>
                <p className={style.sectionTitle}>{section}</p>
                <div className={style.chipContainer}>
                  {
                    props.countyData[section].map((county, indexj) => {
                      return <span
                        key={indexj}
                        className={classNames({
                          [style.chip]: true,
                          [style.marked]: county.marked
                        })}
                        onClick={() => {
                          props.onCountyChange(county.name)
                          setopen(false)
                        }}
                      >{county.name}</span>
                    })
                  }
                </div>
              </div>
            })
          }
        </div> : <></>
      }

    </div>
  )
}

export default CountySelector