import React from 'react'
import classNames from 'classnames'
import Image from 'next/image'
import style from './Kanban.module.scss'

export interface IKanbanProps {
  children?: React.ReactNode
  imgSrc: string
  className?: string
  leaveAnimation?: boolean
}

const Kanban = ({
  children,
  imgSrc,
  className = '',
  leaveAnimation = false
}: IKanbanProps) => {
  const getCssVariable = () => ({ [`--KanbanImg`]: `url('${imgSrc}')` }) as { [k: string]: string }
  return (
    <div className={`${style.Kanban} ${className}`} >
      <div className={classNames({
        [style.kanbanImg]: true,
        magictime: true,
        slideRightReturn: !leaveAnimation,
        slideLeft: leaveAnimation
      })}>
        <div className={style.ImgWrapper}>
          <div className={style.ImgParent}><Image src={imgSrc} layout='fill' objectFit='cover' objectPosition='center' alt='none' /></div>
        </div>
        <div className={style.KanbanContent}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Kanban
