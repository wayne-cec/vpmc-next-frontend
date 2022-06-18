import React, { useState } from 'react'
import style from './index.module.scss'
import classNames from 'classnames'
import Image from 'next/image'

export type PolygonSketchMode = 'draw' | 'inactive'

export interface IPolygonSketch {
  active: boolean
  mode: PolygonSketchMode
  onModeChange: (value: PolygonSketchMode) => void
  onDraw: () => void
  onClear: () => void
}

const PolygonSketch = (props: IPolygonSketch) => {
  return (
    <div className={classNames({
      [style.polygonSketch]: true,
      [style.active]: props.active
    })}>
      <div className={classNames({
        [style.btnContainer]: true,
        [style.focus]: props.mode === 'draw',
        [style.active]: props.active
      })}
        onClick={() => {
          if (props.active) {
            props.onDraw()
          }
        }}
      >
        <Image src={
          props.active ? '/marketCompare/polygon.png' : '/marketCompare/polygon-disabled.png'
        } width='25px' height='25px' />
      </div>
      <div className={classNames({
        [style.btnContainer]: true,
        [style.active]: props.active
      })}
        onClick={() => {
          if (props.active) {
            props.onClear()
          }
        }}
      >
        <Image src={
          props.active ? '/marketCompare/trash.png' : '/marketCompare/trash-disabled.png'
        } width='25px' height='25px' />
      </div>
    </div>
  )
}

export default PolygonSketch