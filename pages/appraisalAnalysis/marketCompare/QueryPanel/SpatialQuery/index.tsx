import React from 'react'
import style from './index.module.scss'
import classNames from 'classnames'
import CoordinateSelector from '../../../../../components/CoordinateSelector'
import { SpatialQueryType } from '../..'
import { Grid, Radio, TextField } from '@mui/material'
import PolygonSketch from '../../../../../components/PolygonSketch'
import { PolygonSketchMode } from '../../../../../components/PolygonSketch'
import CountySelector from '../../../../../components/CountySelector'
import TownSelector from '../../../../../components/TownSelector'

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

      <Grid container spacing={2}>
        {/* 搜索範圍 */}
        <Grid item xs={2}>
          <Radio
            checked={props.sketchMode === 'inactive'}
            onChange={() => {
              props.onSpatialQueryTypeChange('buffer')
              props.onSketchModeChange('inactive')
            }}
            value="a"
            name="radio-buttons"
            inputProps={{ 'aria-label': 'A' }}
          />
        </Grid>
        <Grid item xs={7}>
          <CoordinateSelector
            longitude={props.longitude!}
            latitude={props.latitude!}
            locatedCounty={props.locatedCounty!}
            locatedTown={props.locatedTown!}
            active={props.isSelectorActive!}
            enabled={props.sketchMode === 'inactive'}
            onClick={() => {
              props.onCoordinatorSelectorClick(!props.isSelectorActive)
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            type='number'
            label="距離(m)"
            size='small'
            InputProps={{ inputProps: { min: 0 } }}
            value={props.bufferRadius}
            onChange={(event) => {
              props.onBufferRadiusChange(
                Number(event.target.value)
              )
            }}
            disabled={props.sketchMode !== 'inactive'}
            fullWidth
          ></TextField>
        </Grid>
        <Grid item xs={2}>
          <Radio
            checked={
              props.sketchMode === 'draw'
            }
            onChange={() => {
              // props.onSpatialQueryTypeChange('rectangle')
              props.onSpatialQueryTypeChange('none')
              props.onSketchModeChange('draw')
              props.onCoordinatorSelectorClick(false)
            }}
            value="a"
            name="radio-buttons"
            inputProps={{ 'aria-label': 'A' }}
          />
        </Grid>
        <Grid item xs={10}
          className={style.polygonSketchContainer}
        >
          <PolygonSketch
            active={
              // props.spatialQueryType === 'polygon' ||
              // props.spatialQueryType === 'circle' ||
              // props.spatialQueryType === 'rectangle' || 
              props.sketchMode === 'draw'
            }
            mode={props.sketchMode}
            spatialQueryType={props.spatialQueryType}
            onModeChange={props.onSketchModeChange}
            onSpatialQueryTypeChange={props.onSpatialQueryTypeChange}
            onDraw={props.onDraw}
            onClear={props.onDraw}
          />
        </Grid>


        {/* <Grid item xs={2}>
          <Radio
            checked={
              props.sketchMode === 'county'
            }
            onChange={() => {
              props.onSpatialQueryTypeChange('none')
              props.onSketchModeChange('county')
              props.onCoordinatorSelectorClick(false)
            }}
            value="a"
            name="radio-buttons"
            inputProps={{ 'aria-label': 'A' }}
          />
        </Grid>
        <Grid item xs={5}
          className={style.polygonSketchContainer}
        >
          <CountySelector />
        </Grid>
        <Grid item xs={5}
          className={style.polygonSketchContainer}
        >
          <TownSelector />
        </Grid> */}

      </Grid>
    </div>
  )
}

export default SpatialQuery