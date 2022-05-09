import React, { useEffect, useState } from 'react'
import Kanban, { IKanbanProps } from './Kanban'
import classNames from 'classnames'
import style from './IntervalKanban.module.scss'

export interface IIntervalKanbanProps {
  sec?: number
  activeId?: number
  kanbans: Array<IKanbanProps>
  onActiveIdChange?: (id: number) => void
}

const IntervalKanban = ({
  sec = 10,
  activeId,
  kanbans,
  onActiveIdChange
}: IIntervalKanbanProps) => {
  const [kanbanId, setkanbanId ] = useState(0)
  const [intervalId, setintervalId] = useState<number>()

  const getNextKanbanId = (currentId: number) => {
    return currentId >= kanbans.length - 1 ? 0 : currentId + 1
  }
  const getPrevKanbanId = (currentId: number) => {
    return currentId === 0 ? kanbans.length - 1 : currentId - 1
  }

  const handleInterval = () => {
    setkanbanId(prevId => {
      const nextId = getNextKanbanId(prevId)
      if (onActiveIdChange) {
        onActiveIdChange(nextId)
      }
      return nextId
    })
  }

  const restartInterval = () => {
    window.clearInterval(intervalId)
    const id = window.setInterval( handleInterval, sec * 1000)
    setintervalId(id)
  }

  const changeActiveKanbanId = (id: number) => {
    setkanbanId(id)
    if (onActiveIdChange) {
      onActiveIdChange(id)
    }
    restartInterval()
  }

  useEffect(() => {
    restartInterval()
    return () => {
      setintervalId(iid => {
        window.clearInterval(iid)
        return undefined
      })
    }
  }, [])
  useEffect(() => {
    if (activeId) {
      changeActiveKanbanId(activeId)
    }
  }, [activeId])

  return (
    <div className={style.IntervalKanban}>
      {
        kanbans.map((kanbanProps, index) => (
          <div key={index} className={classNames({
            [style.KanbanItem]: true,
            [style.hide]: index !== kanbanId && index !== getPrevKanbanId(kanbanId)
          })}>
            <Kanban
              imgSrc={kanbanProps.imgSrc}
              leaveAnimation={index === getPrevKanbanId(kanbanId)}
              >
                {kanbanProps.children}
            </Kanban>
          </div>
        ))
      }
      <div className={style.controller}>
        {
          kanbans.map((item, index) => (
            <span key={index} className={style.ctrlBtn} onClick={() => changeActiveKanbanId(index)}>{ kanbanId === index ? '●' : '○' }</span>
          ))
        }
      </div>
    </div>
  )
}

export default IntervalKanban
