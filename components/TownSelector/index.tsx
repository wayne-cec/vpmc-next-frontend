import React, { useState, useEffect, useRef } from 'react'
import style from './index.module.scss'
import classNames from 'classnames'
import Image from 'next/image'
import { useOutside } from '../../hooks'
import { createPortal } from 'react-dom'

export interface ITownSelector {
  townData: { [key: string]: { name: string, marked: boolean }[] }
  selectedTown?: string
  selectedTowns?: string[]
  offset?: boolean
  disabled?: boolean
  multiple?: boolean
  onTownChange?: (town: string) => void
  onTownsChange?: (town: string[]) => void
}

const TownSelector = ({
  townData,
  selectedTown,
  selectedTowns,
  offset,
  disabled = false,
  multiple = false,
  onTownChange,
  onTownsChange
}: ITownSelector) => {
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

  const handleSingleSelect = (townname: string) => {
    if (multiple || !selectedTown || !onTownChange) return
    onTownChange(townname)
    setopen(false)
  }

  const handleMultipleSelect = (townname: string) => {
    if (!multiple || !selectedTowns || !onTownsChange) return
    let newSelectedTowns = [...selectedTowns]
    if (newSelectedTowns.includes(townname)) {
      newSelectedTowns = newSelectedTowns.filter(t => t !== townname)
      if (newSelectedTowns.length === 0) {
        return
      }
    } else {
      newSelectedTowns.push(townname)
    }
    onTownsChange([...newSelectedTowns])
  }

  return (
    <div
      ref={ref}
    >
      <div className={classNames({
        [style.townSelector]: true,
        [style.show]: open,
        [style.disabled]: disabled
      })}
        onClick={() => {
          if (!disabled)
            handleClick()
        }}
      >
        <div className={style.titleContainer}>
          <Image src={disabled ? '/aprRegion/town-disabled.png' : '/aprRegion/town.png'} width='25px' height='25px' />
          <p>
            {
              selectedTowns
                ? selectedTowns[0]
                : selectedTown
            }
            {
              selectedTowns && selectedTowns.length !== 1
                ? `+${selectedTowns.length - 1}`
                : null
            }
          </p>
        </div>
        <Image src={'/aprRegion/expand.png'} width='25px' height='25px' />
      </div>

      {
        townData
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
                Object.keys(townData).map((section, index) => {
                  return <div
                    className={style.countySection}
                    key={index}
                  >
                    <p className={style.sectionTitle}>{section}</p>
                    <div className={style.chipContainer}>
                      {
                        townData[section].map((town, indexj) => {
                          return <span
                            key={indexj}
                            className={classNames({
                              [style.chip]: true,
                              // [style.marked]: town.marked
                              [style.selected]: selectedTown === town.name || selectedTowns?.includes(town.name)
                            })}
                            onClick={() => {
                              handleMultipleSelect(town.name)
                              handleSingleSelect(town.name)
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