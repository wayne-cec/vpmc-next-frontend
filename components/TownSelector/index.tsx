import React, { useState, useEffect } from 'react'
import style from './index.module.scss'
import classNames from 'classnames'
import Image from 'next/image'

export interface ITownSelector {
  townData: { [key: string]: { name: string, marked: boolean }[] }
  selectedTown: string | null
  onTownChange: (town: string) => void
}

const TownSelector = (props: ITownSelector) => {
  const [open, setopen] = useState<boolean>(false)

  useEffect(() => {
    props.onTownChange(
      props.townData[Object.keys(props.townData)[0]][0].name
    )
  }, [])

  return (
    <div>
      <div className={classNames({
        [style.townSelector]: true,
        [style.show]: open
      })}
        onClick={() => {
          setopen(prev => !prev)
        }}
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

      <div className={classNames({
        [style.popPanel]: true,
        [style.show]: open
      })}
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
      </div>
    </div>
  )
}

export default TownSelector