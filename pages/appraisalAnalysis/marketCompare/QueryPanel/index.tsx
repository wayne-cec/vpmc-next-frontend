import React from 'react'
import style from './index.module.scss'
import Image from 'next/image'
import classNames from 'classnames'
import {
  TextField, Select, MenuItem,
  InputLabel, FormControl, Checkbox,
  Grid, Radio
} from '@mui/material'
import MarketCompareResultCard from '../../../../components/MarketCompareResultCard'
import CoordinateSelector from '../../../../components/CoordinateSelector'
import PolygonSketch from '../../../../components/PolygonSketch'
import { PolygonSketchMode } from '../../../../components/PolygonSketch'
import {
  assetTypeSet, transactionTimeSet, buildingTransactionAreaSet,
  landTransactionAreaSet, ageSet
} from '../../../../lib/marketComapreConst'
import { IMarketCompareResult } from '../../../../api/prod'
import { SpatialQueryType } from '..'
import SpatialQuery from './SpatialQuery'
import AttributeQuery from './AttributeQuery'
import Action from './Action'

export interface IQueryPanel {
  longitude?: number
  latitude?: number
  locatedCounty?: string
  locatedTown?: string
  isSelectorActive: boolean
  isTransactionTimeFiltered: boolean
  isBuildingAreaFiltered: boolean
  isLandAreaFiltered: boolean
  isAgeFiltered: boolean
  isParkSpaceFiltered: boolean
  isTransactionTimeFosced: boolean
  isBuildingAreaFosced: boolean
  isLandAreaFosced: boolean
  isAgeFosced: boolean
  isParkSpaceFosced: boolean
  isBuildingAreaCheckable: boolean
  isLandAreaCheckable: boolean
  assetTypeCode: number
  bufferRadius: number
  transactionTime?: number
  buildingTransferArea?: number
  landTransferArea?: number
  age?: number
  parkSpaceType?: number
  polygonGoejson?: string
  filteredResults: IMarketCompareResult[]
  spatialQueryType: SpatialQueryType
  sketchMode: PolygonSketchMode
  onCoordinatorSelectorClick: (value: boolean) => void // (value) => {setisCoordinateSelectorActive(value)}
  onSpatialQueryTypeChange: (value: SpatialQueryType) => void // setspatialQueryType
  onBufferRadiusChange: (value: number) => void // (value) => { setbufferRadius(value) }
  onSketchModeChange: (value: PolygonSketchMode) => void // (value) => {setsketchMode(value)}
  onDraw: () => void // () => {setsketchMode('draw')}
  onClear: () => void // () => {setsketchMode('inactive')}
  onAssetTypeChange: (value: number) => void // (value) => { setassetTypeCode(value) }
  onTransactionTimeFilteredChange: () => void // () => {setisTransactionTimeFiltered(prev => !prev)settransactionTime(1)}
  onTransactionTimeSelect: (value: number) => void //(value) => {settransactionTime(value)setisTransactionTimeFosced(true)}
  onBuildingAreaFilteredChange: () => void //() => {setisBuildingAreaFiltered(prev => !prev)setbuildingTransferArea(0)}
  onBuildingAreaSelect: (value: number) => void //(value) => {setbuildingTransferArea(value)setisBuildingAreaFosced(true)}
  onLandAreaFilteredChange: () => void //() => {setisLandAreaFiltered(prev => !prev)setlandTransferArea(0)}
  onLandAreaSelect: (value: number) => void //(value) => {setlandTransferArea(value)setisLandAreaFosced(true)}
  onAgeFilteredChange: () => void //() => {setisAgeFiltered(prev => !prev)setage(0)}
  onAgeSelect: (value: number) => void //(value) => {setage(value)setisAgeFosced(true)}
  onCustomizeParamBtnClick: () => void //() => {setmsgOpen(true)seterrorTitle('訊息')seterrorContent('自定義參數功能尚未開發')}
  handleFormSubmit: () => void
}

const QueryPanel = (props: IQueryPanel) => {

  return (
    <div className={classNames({
      [style.queryPanel]: true,
      [style.show]: true
    })}>
      <div className={style.filterGroup}>

        <SpatialQuery
          longitude={props.longitude}
          latitude={props.latitude}
          locatedCounty={props.locatedCounty}
          locatedTown={props.locatedTown}
          isSelectorActive={props.isSelectorActive}
          bufferRadius={props.bufferRadius}
          spatialQueryType={props.spatialQueryType}
          sketchMode={props.sketchMode}
          onCoordinatorSelectorClick={props.onCoordinatorSelectorClick}
          onSpatialQueryTypeChange={props.onSpatialQueryTypeChange}
          onBufferRadiusChange={props.onBufferRadiusChange}
          onSketchModeChange={props.onSketchModeChange}
          onDraw={props.onDraw}
          onClear={props.onClear}
        />

        <AttributeQuery
          assetTypeCode={props.assetTypeCode}
          isTransactionTimeFiltered={props.isTransactionTimeFiltered}
          isBuildingAreaFiltered={props.isBuildingAreaFiltered}
          isLandAreaFiltered={props.isLandAreaFiltered}
          isAgeFiltered={props.isAgeFiltered}
          isParkSpaceFiltered={props.isParkSpaceFiltered}
          isTransactionTimeFosced={props.isTransactionTimeFosced}
          isBuildingAreaFosced={props.isBuildingAreaFosced}
          isLandAreaFosced={props.isLandAreaFosced}
          isAgeFosced={props.isAgeFosced}
          isParkSpaceFosced={props.isParkSpaceFosced}
          isBuildingAreaCheckable={props.isBuildingAreaCheckable}
          isLandAreaCheckable={props.isLandAreaCheckable}
          transactionTime={props.transactionTime}
          buildingTransferArea={props.buildingTransferArea}
          landTransferArea={props.landTransferArea}
          age={props.age}
          parkSpaceType={props.parkSpaceType}
          onAssetTypeChange={props.onAssetTypeChange}
          onTransactionTimeFilteredChange={props.onTransactionTimeFilteredChange}
          onTransactionTimeSelect={props.onTransactionTimeSelect}
          onBuildingAreaFilteredChange={props.onBuildingAreaFilteredChange}
          onBuildingAreaSelect={props.onBuildingAreaSelect}
          onLandAreaFilteredChange={props.onLandAreaFilteredChange}
          onLandAreaSelect={props.onLandAreaSelect}
          onAgeFilteredChange={props.onAgeFilteredChange}
          onAgeSelect={props.onAgeSelect}
        />

        <Action
          onCustomizeParamBtnClick={props.onCustomizeParamBtnClick}
          handleFormSubmit={props.handleFormSubmit}
        />

      </div>

      {/* 用手機瀏覽時才會渲染 */}
      {
        props.filteredResults && props.filteredResults.length !== 0
          ?
          <div className={style.resultGroup}>
            <p className={style.resultStatus}>共有
              <span className={style.count}>{props.filteredResults.length}</span>
              筆實價登陸紀錄
            </p>
            <div className={style.graphGroup}>
              {
                props.filteredResults.map((result, index) => {
                  return <MarketCompareResultCard
                    key={index}
                    {...result}
                  />
                })
              }
            </div>
          </div>
          : <></>
      }
    </div>
  )
}

export default QueryPanel