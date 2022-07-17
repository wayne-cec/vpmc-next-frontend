import React, { useContext } from 'react'
import style from './index.module.scss'
import classNames from 'classnames'
import CoordinateSelector from '../../../../../components/CoordinateSelector'
import { SpatialQueryType } from '../..'
import { Grid, Radio, TextField } from '@mui/material'
import PolygonSketch from '../../../../../components/PolygonSketch'
import { PolygonSketchMode } from '../../../../../components/PolygonSketch'
import CountySelector from '../../../../../components/CountySelector'
import TownSelector from '../../../../../components/TownSelector'
import MarketCompareContext from '../../MarketCompareContext'

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

const SpatialQuery = () => {
  const marketCompareContext = useContext(MarketCompareContext)

  return (
    <div className={classNames({
      [style.spatialQuery]: true,
      [style.divide]: true
    })}>

      <Grid container spacing={2}>
        {/* 搜索範圍 */}
        <Grid item xs={2}>
          <Radio
            checked={marketCompareContext.sketchMode === 'inactive'}
            onChange={() => {
              marketCompareContext.onSpatialQueryTypeChange('buffer')
              marketCompareContext.onSketchModeChange('inactive')
            }}
            value="a"
            name="radio-buttons"
            inputProps={{ 'aria-label': 'A' }}
          />
        </Grid>
        <Grid item xs={7}>
          <CoordinateSelector
            longitude={marketCompareContext.longitude!}
            latitude={marketCompareContext.latitude!}
            locatedCounty={marketCompareContext.locatedCounty!}
            locatedTown={marketCompareContext.locatedTown!}
            active={marketCompareContext.isSelectorActive!}
            enabled={marketCompareContext.sketchMode === 'inactive'}
            onClick={() => {
              marketCompareContext.onCoordinatorSelectorClick(!marketCompareContext.isSelectorActive)
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            type='number'
            label="距離(m)"
            size='small'
            InputProps={{ inputProps: { min: 0 } }}
            value={marketCompareContext.bufferRadius}
            onChange={(event) => {
              marketCompareContext.onBufferRadiusChange(
                Number(event.target.value)
              )
            }}
            disabled={marketCompareContext.sketchMode !== 'inactive'}
            fullWidth
          ></TextField>
        </Grid>
        <Grid item xs={2}>
          <Radio
            checked={
              marketCompareContext.sketchMode === 'draw'
            }
            onChange={() => {
              // marketCompareContext.onSpatialQueryTypeChange('rectangle')
              marketCompareContext.onSpatialQueryTypeChange('none')
              marketCompareContext.onSketchModeChange('draw')
              marketCompareContext.onCoordinatorSelectorClick(false)
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
              // marketCompareContext.spatialQueryType === 'polygon' ||
              // marketCompareContext.spatialQueryType === 'circle' ||
              // marketCompareContext.spatialQueryType === 'rectangle' || 
              marketCompareContext.sketchMode === 'draw'
            }
            mode={marketCompareContext.sketchMode}
            spatialQueryType={marketCompareContext.spatialQueryType}
            onModeChange={marketCompareContext.onSketchModeChange}
            onSpatialQueryTypeChange={marketCompareContext.onSpatialQueryTypeChange}
            onDraw={marketCompareContext.onDraw}
            onClear={marketCompareContext.onDraw}
          />
        </Grid>


        {/* <Grid item xs={2}>
          <Radio
            checked={
              marketCompareContext.sketchMode === 'county'
            }
            onChange={() => {
              marketCompareContext.onSpatialQueryTypeChange('none')
              marketCompareContext.onSketchModeChange('county')
              marketCompareContext.onCoordinatorSelectorClick(false)
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