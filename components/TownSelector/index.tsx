import React, { useState, useEffect, useRef } from 'react'
import style from './index.module.scss'
import classNames from 'classnames'
import Image from 'next/image'
import { useOutside } from '../../hooks'
import { createPortal } from 'react-dom'

export interface ITownSelector {
  townData: { [key: string]: { name: string, marked: boolean }[] }
  selectedTown: string | null
  offset?: boolean
  onTownChange: (town: string) => void
}

const TownSelector = (props: ITownSelector) => {
  const ref = useRef<HTMLDivElement>(null)
  const [open, setopen] = useState<boolean>(false)
  const [coordinate, setcoordinate] = useState<{ x: string, y: string }>()

  useOutside(ref, () => {
    setopen(false)
  })

  const handleClick = () => {
    setopen(prev => !prev)
    if (!ref) return
    if (!ref.current) return
    if (!ref.current.firstElementChild) return
    const { x, y, height } = ref.current.firstElementChild.getBoundingClientRect()
    setcoordinate({
      x: `${props.offset === true ? x - 500 + 130 : x}px`,
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
        [style.townSelector]: true,
        [style.show]: open
      })}
        onClick={handleClick}
      >
        <div className={style.titleContainer}>
          <Image src={'/aprRegion/town.png'} width='25px' height='25px' />
          <p>
            {
              props.selectedTown
            }
          </p>
        </div>
        <Image src={'/aprRegion/expand.png'} width='25px' height='25px' />
      </div>

      {
        props.townData
          ? createPortal(
            <div className={classNames({
              [style.popPanel]: true,
              [style.show]: open,
              [style.hide]: !open
            })}
              style={getCSSVar()}
            >
              {
                Object.keys(props.townData).map((section, index) => {
                  return <div className={style.countySection} key={index}>
                    <p className={style.sectionTitle}>{section}</p>
                    <div className={style.chipContainer}>
                      {
                        props.townData[section].map((town, indexj) => {
                          return <span
                            key={indexj}
                            className={classNames({
                              [style.chip]: true,
                              [style.marked]: town.marked
                            })}
                            onClick={() => {
                              props.onTownChange(town.name)
                              setopen(false)
                            }}
                          >{town.name}</span>
                        })
                      }
                    </div>
                  </div>
                })
              }
            </div>, document.body
          )
          : null
      }

    </div>
  )
}

export default TownSelector