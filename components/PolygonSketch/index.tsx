import React, { useState } from 'react'
import style from './index.module.scss'
import classNames from 'classnames'
import Image from 'next/image'
import { Tooltip } from '@mui/material'
import { SpatialQueryType } from '../../pages/appraisalAnalysis/marketCompare'

export type PolygonSketchMode = 'draw' | 'inactive'

export interface IPolygonSketch {
  active: boolean
  mode: PolygonSketchMode
  spatialQueryType: SpatialQueryType
  onModeChange: (value: PolygonSketchMode) => void
  onSpatialQueryTypeChange: (value: SpatialQueryType) => void
  onDraw: () => void
  onClear: () => void
}

const PolygonSketch = (props: IPolygonSketch) => {
  return (
    <div className={classNames({
      [style.polygonSketch]: true,
      [style.active]: props.active
    })}>
      <span className={style.legend}>自定義範圍</span>

      <Tooltip title="矩型範圍">
        <div className={classNames({
          [style.btnContainer]: true,
          [style.focus]: props.spatialQueryType === 'rectangle', // props.mode === 'draw',
          [style.active]: props.active
        })}
          onClick={() => {
            if (props.active) {
              props.onDraw()
              props.onSpatialQueryTypeChange('rectangle')
            }
          }}
        >
          <Image src={
            props.active ? '/marketCompare/rectangle.png' : '/marketCompare/rectangle-disabled.png'
          } width='25px' height='25px' />
        </div>
      </Tooltip>

      <Tooltip title="圓形範圍">
        <div className={classNames({
          [style.btnContainer]: true,
          [style.focus]: props.spatialQueryType === 'circle', // props.mode === 'draw',
          [style.active]: props.active
        })}
          onClick={() => {
            if (props.active) {
              props.onDraw()
              props.onSpatialQueryTypeChange('circle')
            }
          }}
        >
          <Image src={
            props.active ? '/marketCompare/circle.png' : '/marketCompare/circle-disabled.png'
          } width='25px' height='25px' />
        </div>
      </Tooltip>

      <Tooltip title="不規則範圍">
        <div className={classNames({
          [style.btnContainer]: true,
          [style.focus]: props.spatialQueryType === 'polygon', // props.mode === 'draw',
          [style.active]: props.active
        })}
          onClick={() => {
            if (props.active) {
              props.onDraw()
              props.onSpatialQueryTypeChange('polygon')
            }
          }}
        >
          <Image src={
            props.active ? '/marketCompare/polygon.png' : '/marketCompare/polygon-disabled.png'
          } width='25px' height='25px' />
        </div>
      </Tooltip>

      <Tooltip title="清除">
        <div className={classNames({
          [style.btnContainer]: true,
          [style.active]: props.active
        })}
          onClick={() => {
            if (props.active) {
              props.onSpatialQueryTypeChange('clear')
            }
          }}
        >
          <Image src={
            props.active ? '/marketCompare/trash.png' : '/marketCompare/trash-disabled.png'
          } width='25px' height='25px' />
        </div>

      </Tooltip>

    </div>
  )
}

export default PolygonSketch