import React, { useContext, useState } from 'react'
import { PolygonSketchMode } from '../../../../components/PolygonSketch'
import { IMarketCompareResult } from '../../../../api/prod'
import { SpatialQueryType } from '..'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Tab } from '@mui/material'
import style from './index.module.scss'
import classNames from 'classnames'
import EditIcon from '@mui/icons-material/Edit'
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh'
import MarketCompareContext from '../MarketCompareContext'
import SpatialQuery from './ManualQuery/SpatialQuery'
import AttributeQuery from './ManualQuery/AttributeQuery'
import Action from './ManualQuery/Action'
import SpatialQueryIntelligence from './IntelligenceQuery/SpatialQueryIntelligence'
import AttributeQueryIntelligence from './IntelligenceQuery/AttributeQueryIntelligence'

const ManualQuery = () => {
  return (
    <div className={style.filterGroup}>
      <SpatialQuery />
      <AttributeQuery />
      <Action />
    </div>
  )
}

const IntelligenceQuery = () => {
  return (
    <div className={style.filterGroup}>
      <SpatialQueryIntelligence />
      <AttributeQueryIntelligence />
    </div>
  )
}

export interface IQueryPanel {
  show: boolean
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
  isUrbanUsageFiltered: boolean
  isTransactionTimeFosced: boolean
  isBuildingAreaFosced: boolean
  isLandAreaFosced: boolean
  isAgeFosced: boolean
  isParkSpaceFosced: boolean
  isUrbanUsageFosced: boolean
  isBuildingAreaCheckable: boolean
  isLandAreaCheckable: boolean
  assetTypeCode: number
  bufferRadius: number
  transactiontime?: number
  buildingTransferArea?: number
  landTransferArea?: number
  age?: number
  parkSpaceType?: number
  urbanLandUse?: number[]
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
  onParkSpaceTypeFilteredChange: () => void
  onParkSpaceTypeSelect: (value: number) => void

  onUrbanLaudUseFilteredChange: () => void
  onUrbanLaudUseSelect: (value: number[]) => void

  onCustomizeParamBtnClick: () => void //() => {setmsgOpen(true)seterrorTitle('訊息')seterrorContent('自定義參數功能尚未開發')}
  handleFormSubmit: () => void
}

const QueryPanel = () => {
  const marketCompareContext = useContext(MarketCompareContext)
  const [value, setvalue] = useState('0')

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setvalue(newValue)
  }

  return (
    <div className={classNames({
      [style.queryPanel]: true,
      [style.show]: marketCompareContext.queryPanelShow,
      [style.hide]: !marketCompareContext.queryPanelShow,
    })}>


      <TabContext value={value}>

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleTabChange}>
            <Tab
              icon={<EditIcon />} iconPosition="start"
              label="自行選取" value="0"
            />
            <Tab
              icon={<AutoFixHighIcon />} iconPosition="start"
              label="系統智選" value="1"
            />
          </TabList>
        </Box>

        <TabPanel value="0" sx={{ padding: '0px' }}>
          <ManualQuery />
        </TabPanel>

        <TabPanel value="1" sx={{ padding: '0px' }}>
          <IntelligenceQuery />
        </TabPanel>

      </TabContext>

      {/* 用手機瀏覽時才會渲染 */}
      {/* {
        marketCompareContext.filteredResults && marketCompareContext.filteredResults.length !== 0
          ?
          <div className={style.resultGroup}>
            <p className={style.resultStatus}>共有
              <span className={style.count}>{marketCompareContext.filteredResults.length}</span>
              筆實價登陸紀錄
            </p>
            <div className={style.graphGroup}>
              {
                marketCompareContext.filteredResults.map((result, index) => {
                  return <MarketCompareResultCard
                    key={index}
                    {...result}
                  />
                })
              }
            </div>
          </div>
          : <></>
      } */}
    </div>
  )
}

export default QueryPanel