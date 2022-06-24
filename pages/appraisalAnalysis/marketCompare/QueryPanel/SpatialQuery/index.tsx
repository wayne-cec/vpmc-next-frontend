import React from 'react'
import style from './index.module.scss'
import classNames from 'classnames'
import CoordinateSelector from '../../../../../components/CoordinateSelector'
import { SpatialQueryType } from '../..'
import { Grid, Radio, TextField } from '@mui/material'
import PolygonSketch from '../../../../../components/PolygonSketch'
import { PolygonSketchMode } from '../../../../../components/PolygonSketch'

export interface ISpatialQuery {
  longitude?: number
  latitude?: number
  locatedCounty?: string
  locatedTown?: string
  isSelectorActive: boolean
  bufferRadius: number
  spatialQueryType: SpatialQueryType
  sketchMode: PolygonSketchMode
  onCoordinatorSelectorClick: (value: boolean) => void
  onSpatialQueryTypeChange: (value: SpatialQueryType) => void
  onBufferRadiusChange: (value: number) => void
  onSketchModeChange: (value: PolygonSketchMode) => void
  onDraw: () => void
  onClear: () => void
}

const SpatialQuery = (props: ISpatialQuery) => {

  return (
    <div className={classNames({
      [style.spatialQuery]: true,
      [style.divide]: true
    })}>
      <CoordinateSelector
        longitude={props.longitude!}
        latitude={props.latitude!}
        locatedCounty={props.locatedCounty!}
        locatedTown={props.locatedTown!}
        active={props.isSelectorActive!}
        enabled={props.spatialQueryType === 'buffer'}
        onClick={() => {
          props.onCoordinatorSelectorClick(!props.isSelectorActive)
        }}
      />
      <Grid container spacing={2}>
        {/* 搜索範圍 */}
        <Grid item xs={2}>
          <Radio
            checked={props.spatialQueryType === 'buffer'}
            onChange={() => {
              props.onSpatialQueryTypeChange('buffer')
            }}
            value="a"
            name="radio-buttons"
            inputProps={{ 'aria-label': 'A' }}
          />
        </Grid>
        <Grid item xs={5}>
          <TextField
            type='number'
            label="勘估標的距離(m)"
            size='small'
            InputProps={{ inputProps: { min: 0 } }}
            value={props.bufferRadius}
            onChange={(event) => {
              props.onBufferRadiusChange(
                Number(event.target.value)
              )
            }}
            disabled={props.spatialQueryType !== 'buffer'}
            fullWidth
          ></TextField>
        </Grid>
        <Grid item xs={2}>
          <Radio
            checked={props.spatialQueryType === 'polygon'}
            onChange={() => {
              props.onSpatialQueryTypeChange('polygon')
              props.onCoordinatorSelectorClick(false)
            }}
            value="a"
            name="radio-buttons"
            inputProps={{ 'aria-label': 'A' }}
          />
        </Grid>
        <Grid item xs={3}
          className={style.polygonSketchContainer}
        >
          <PolygonSketch
            active={props.spatialQueryType === 'polygon'}
            mode={props.sketchMode}
            onModeChange={props.onSketchModeChange}
            onDraw={props.onDraw}
            onClear={props.onDraw}
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default SpatialQuery