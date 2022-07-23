import React, { useState, useRef, useEffect } from 'react'
import style from './index.module.scss'
import classNames from 'classnames'
import Image from 'next/image'
import { useOutside } from '../../hooks'
import { createPortal } from 'react-dom'

export interface ICountySelector {
  countyData: { [key: string]: { name: string, marked: boolean }[] }
  selectedCounty: string | null
  offset?: boolean
  disabled?: boolean
  onCountyChange: (county: string) => void
}

const CountySelector = ({
  countyData,
  selectedCounty,
  offset,
  disabled = false,
  onCountyChange
}: ICountySelector) => {
  const ref = useRef<HTMLDivElement>(null)
  const refPanel = useRef<HTMLDivElement>(null)
  const [open, setopen] = useState<boolean>(false)
  const [coordinate, setcoordinate] = useState<{ x: string, y: string }>()

  useOutside(refPanel, () => {
    setopen(false)
  })

  const handleClick = () => {
    setopen(prev => !prev)
    if (!ref) return
    if (!ref.current) return
    if (!ref.current.firstElementChild) return
    const { x, y, height } = ref.current.firstElementChild.getBoundingClientRect()
    setcoordinate({
      x: `${offset === true ? x - 500 + 130 : x}px`,
      y: `${y + height + 10}px`
    })
  }

  const getCSSVar = (): { [key: string]: string } => {
    if (coordinate) {
      return { '--top': coordinate.y, '--left': coordinate.x }
    }
    return {}
  }

  return (
    <div
      ref={ref}
    >
      <div className={classNames({
        [style.countySelector]: true,
        [style.show]: open,
        [style.disabled]: disabled
      })}
        onClick={() => {
          if (!disabled)
            handleClick()
        }}
      >
        <div className={style.titleContainer}>
          <Image src={disabled ? '/aprRegion/locate-disabled.png' : '/aprRegion/locate.png'} width='25px' height='25px' />
          <p>
            {
              selectedCounty
            }
          </p>
        </div>
        <Image src={'/aprRegion/expand.png'} width='25px' height='25px' />
      </div>

      {
        countyData
          ? createPortal(
            <div className={classNames({
              [style.popPanel]: true,
              [style.show]: open,
              [style.hide]: !open
            })}
              style={getCSSVar()}
              ref={refPanel}
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
                              onCountyChange(county.name)
                              setopen(false)
                            }}
                          >{county.name}</span>
                        })
                      }
                    </div>
                  </div>
                })
              }
            </div>, document.body)
          : null
      }

    </div>
  )
}

export default CountySelector