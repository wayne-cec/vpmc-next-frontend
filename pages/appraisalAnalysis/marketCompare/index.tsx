import type { NextPage } from 'next'
import style from './index.module.scss'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import classNames from 'classnames'
import Image from 'next/image'
import CoordinateSelector from '../../../components/CoordinateSelector'
import { useState, useRef, useEffect } from 'react'
import {
  TextField, Select,
  MenuItem, InputLabel, FormControl,
  Checkbox, makeStyles, Grid, Dialog,
  DialogActions, DialogContent, DialogContentText,
  DialogTitle, Button, Radio
} from '@mui/material'
import {
  assetTypeSet, transactionTimeSet, buildingTransactionAreaSet,
  landTransactionAreaSet, ageSet, parkSpaceSet, urbanUsageSet
} from '../../../lib/marketComapreConst'
import { IMarketCompare, IMarketCompareResult } from '../../../api/prod'
import moment from 'moment'
import api from '../../../api'
import MarketCompareResultCard from '../../../components/MarketCompareResultCard'
import { IGraphData } from '../../../api/prod'
import TabsPanel from '../../../components/TabsPanel'
import ReactEcharts from 'echarts-for-react'
import { EChartsOption } from 'echarts'
import { IResultStatistics } from '../../../api/prod'
import PolygonSketch from '../../../components/PolygonSketch'
import handler from '../../api/hello'
import { PolygonSketchMode } from '../../../components/PolygonSketch'

const square = 3.305785

export type SpatialQueryType = 'buffer' | 'polygon'

const MarketMapContainer = dynamic(
  () => import('../../../components/MapContainer/MarketCompareMap'),
  { ssr: false }
)

const AprRegion: NextPage = () => {
  const [longitude, setlongitude] = useState<number | null>(null)
  const [latitude, setlatitude] = useState<number | null>(null)
  const [locatedCounty, setlocatedCounty] = useState<string | null>(null)
  const [locatedTown, setlocatedTown] = useState<string | null>(null)
  const [isSelectorActive, setisCoordinateSelectorActive] = useState<boolean>(false)

  const [isTransactionTimeFiltered, setisTransactionTimeFiltered] = useState<boolean>(false)
  const [isBuildingAreaFiltered, setisBuildingAreaFiltered] = useState<boolean>(false)
  const [isLandAreaFiltered, setisLandAreaFiltered] = useState<boolean>(false)
  const [isAgeFiltered, setisAgeFiltered] = useState<boolean>(false)
  const [isParkSpaceFiltered, setisParkSpaceFiltered] = useState<boolean>(false)
  // const [isUrbanUsageFiltered, setisUrbanUsageFiltered] = useState<boolean>(false)

  const [isTransactionTimeFosced, setisTransactionTimeFosced] = useState<boolean>(false)
  const [isBuildingAreaFosced, setisBuildingAreaFosced] = useState<boolean>(false)
  const [isLandAreaFosced, setisLandAreaFosced] = useState<boolean>(false)
  const [isAgeFosced, setisAgeFosced] = useState<boolean>(false)
  const [isParkSpaceFosced, setisParkSpaceFosced] = useState<boolean>(false)
  // const [isUrbanUsageFosced, setisUrbanUsageFosced] = useState<boolean>(false)

  const [isBuildingAreaCheckable, setisBuildingAreaCheckable] = useState<boolean>(true)
  const [isLandAreaCheckable, setisLandAreaCheckable] = useState<boolean>(true)

  const [assetTypeCode, setassetTypeCode] = useState<number | null>(0)
  const [bufferRadius, setbufferRadius] = useState<number | null>(300)
  const [transactionTime, settransactionTime] = useState<number | null>(null)
  const [buildingTransferArea, setbuildingTransferArea] = useState<number | null>(null)
  const [landTransferArea, setlandTransferArea] = useState<number | null>(null)
  const [age, setage] = useState<number | null>(null)
  const [parkSpaceType, setparkSpaceType] = useState<number | null>(null)
  // const [urbanLandUse, seturbanLandUse] = useState<number | null>(null)

  const [filteredResults, setfilteredResults] = useState<IMarketCompareResult[] | null>(null)

  const [msgOpen, setmsgOpen] = useState<boolean>(false)
  const [errorTitle, seterrorTitle] = useState<string>('')
  const [errorContent, seterrorContent] = useState<string>('')

  const [graphData, setgraphData] = useState<IGraphData | null>(null)
  const [spatialQueryType, setspatialQueryType] = useState<SpatialQueryType>('buffer')
  const [sketchMode, setsketchMode] = useState<PolygonSketchMode>('inactive')

  const handleCoordinateSelect = async (longitude: number, latitude: number) => {
    setlongitude(longitude)
    setlatitude(latitude)
    setisCoordinateSelectorActive(false)
    const { statusCode, responseContent } = await api.prod.getCountyTownNameByCoordinate(longitude, latitude)
    if (statusCode === 200) {
      setlocatedCounty(responseContent.countyname)
      setlocatedTown(responseContent.townname)
    } else {
      setlocatedCounty(null)
      setlocatedTown(null)
    }
  }

  const handleDraw = () => {
    setsketchMode('draw')
  }

  const handleClear = () => {
    setsketchMode('inactive')
  }

  const handleFormSubmit = async () => {
    if (longitude !== null && latitude !== null && bufferRadius !== null && assetTypeCode !== null) {
      const params: IMarketCompare = {
        longitude: longitude,
        latitude: latitude,
        bufferRadius: bufferRadius,
        buildingType: assetTypeCode
      }
      if (isTransactionTimeFiltered && transactionTime) {
        const dateNow = new Date()
        params.transactionTimeStart = moment(dateNow).add(-transactionTime, 'year').format('YYYY/MM/DD')
        params.transactionTimeEnd = moment(dateNow).format('YYYY/MM/DD')
      }
      if (isBuildingAreaFiltered && buildingTransferArea !== null) {
        if (buildingTransferArea === 0) {
          params.buildingAreaStart = 0
          params.buildingAreaEnd = 25 * square
        } else if (buildingTransferArea === 1) {
          params.buildingAreaStart = 25 * square
          params.buildingAreaEnd = 50 * square
        } else if (buildingTransferArea === 2) {
          params.buildingAreaStart = 50 * square
          params.buildingAreaEnd = 80 * square
        } else if (buildingTransferArea === 3) {
          params.buildingAreaStart = 80 * square
          params.buildingAreaEnd = 10000 * square
        }
      }
      if (isLandAreaFiltered && landTransferArea !== null) {
        if (landTransferArea === 0) {
          params.landAreaStart = 0
          params.landAreaEnd = 50 * square
        } else if (landTransferArea === 1) {
          params.landAreaStart = 50 * square
          params.landAreaEnd = 200 * square
        } else if (landTransferArea === 2) {
          params.landAreaStart = 200 * square
          params.landAreaEnd = 100000 * square
        }
      }
      if (isAgeFiltered && age !== null) {
        if (age === 0) {
          params.ageStart = 0
          params.ageEnd = 5
        } else if (age === 1) {
          params.ageStart = 5
          params.ageEnd = 10
        } else if (age === 2) {
          params.ageStart = 10
          params.ageEnd = 20
        } else if (age === 3) {
          params.ageStart = 20
          params.ageEnd = 30
        } else if (age === 4) {
          params.ageStart = 30
          params.ageEnd = 500
        }
      }
      if (isParkSpaceFiltered && parkSpaceType) {
        params.parkingSpaceType = parkSpaceType
      }
      const { statusCode, responseContent } = await api.prod.marketCompare(params)
      if (statusCode === 200) {
        // console.log(responseContent)
        setfilteredResults(responseContent)
        const { statusCode, responseContent2 } = await api.prod.marketCompareStatistic(params)
        if (statusCode === 200) {
          setgraphData(responseContent2)
        } else {
          setmsgOpen(true)
          seterrorTitle('錯誤')
          seterrorContent('伺服器錯誤，統計圖表資料請求失敗，請聯繫開發人員')
        }
      } else {
        setfilteredResults(null)
        setmsgOpen(true)
        seterrorTitle('錯誤')
        seterrorContent('伺服器錯誤，查詢失敗，請聯繫開發人員')
      }
    } else {
      setmsgOpen(true)
      seterrorTitle('警告')
      seterrorContent('請輸入勘估點座標')
    }
  }

  useEffect(() => {
    if (filteredResults?.length === 0) {
      setmsgOpen(true)
      seterrorTitle('訊息')
      seterrorContent('查無資料')
    }
  }, [filteredResults])

  return (
    <>
      <Head>
        <title>VPMC | 實價登錄資訊平台</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/yuantai.ico" />
      </Head>
      <div className={style.main}>

        <div className={style.panel}>
          <div className={style.filterGroup}>

            <div className={classNames({
              [style.filterSection]: true,
              [style.divide]: true
            })}>
              <CoordinateSelector
                longitude={longitude}
                latitude={latitude}
                locatedCounty={locatedCounty}
                locatedTown={locatedTown}
                active={isSelectorActive}
                onClick={() => {
                  setisCoordinateSelectorActive(prev => !prev)
                }}
              />
            </div>

            <div className={classNames({
              [style.filterSection]: true,
              [style.divide]: true
            })}>

              <Grid container spacing={2}>

                <Grid item xs={12}>
                  <FormControl size='small' fullWidth>
                    <InputLabel id="asset-type">資產類型*</InputLabel>
                    <Select
                      labelId="asset-type"
                      label="資產類型"
                      id="asset-type-select"
                      value={assetTypeCode}
                      // value={''}
                      onChange={(event) => { setassetTypeCode(Number(event.target.value)) }}
                      size='small'
                      fullWidth
                    >
                      {
                        Object.keys(assetTypeSet).map((assetCode, index) => {
                          return <MenuItem
                            key={index}
                            value={assetCode}
                          >{assetTypeSet[Number(assetCode)]}</MenuItem>
                        })
                      }
                    </Select>
                  </FormControl>
                </Grid>

                {/* 搜索範圍 */}
                <Grid item xs={2}>
                  <Radio
                    checked={spatialQueryType === 'buffer'}
                    onChange={() => {
                      setspatialQueryType('buffer')
                    }}
                    value="a"
                    name="radio-buttons"
                    inputProps={{ 'aria-label': 'A' }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    type='number'
                    label="勘估標的距離(m)"
                    size='small'
                    InputProps={{ inputProps: { min: 0 } }}
                    value={bufferRadius}
                    onChange={(event) => { setbufferRadius(Number(event.target.value)) }}
                    disabled={spatialQueryType !== 'buffer'}
                    fullWidth
                  ></TextField>
                </Grid>
                <Grid item xs={2}>
                  <Radio
                    checked={spatialQueryType === 'polygon'}
                    onChange={() => {
                      setspatialQueryType('polygon')
                      setisCoordinateSelectorActive(false)
                    }}
                    value="a"
                    name="radio-buttons"
                    inputProps={{ 'aria-label': 'A' }}
                  />
                </Grid>
                <Grid item xs={4}
                  className={style.polygonSketchContainer}
                >
                  <PolygonSketch
                    active={spatialQueryType === 'polygon'}
                    mode={sketchMode}
                    onModeChange={setsketchMode}
                    onDraw={handleDraw}
                    onClear={handleClear}
                  />
                </Grid>

                {/* 交易時間 */}
                <Grid item xs={2}>
                  <Checkbox
                    checked={isTransactionTimeFiltered}
                    onClick={() => {
                      setisTransactionTimeFiltered(prev => !prev)
                      settransactionTime(1)
                    }}
                  />
                </Grid>
                <Grid item xs={10}>
                  <FormControl size='small' fullWidth>
                    {
                      isTransactionTimeFiltered && !isTransactionTimeFosced
                        ? <></>
                        : <InputLabel id="transaction-time">交易時間</InputLabel>
                    }
                    <Select
                      labelId="transaction-time"
                      label="交易時間"
                      id="transaction-time-select"
                      size='small'
                      value={isTransactionTimeFiltered ? transactionTime : ''}
                      disabled={!isTransactionTimeFiltered}
                      // autoFocus={isTransactionTimeFiltered}
                      onChange={(event) => {
                        settransactionTime(Number(event.target.value))
                        setisTransactionTimeFosced(true)
                      }}
                      fullWidth
                    >
                      {
                        Object.keys(transactionTimeSet).map((assetCode, index) => {
                          return <MenuItem
                            key={index}
                            value={assetCode}
                          >{transactionTimeSet[Number(assetCode)]}</MenuItem>
                        })
                      }
                    </Select>
                  </FormControl>
                </Grid>

                {/* 建坪面積 */}
                <Grid item xs={2}>
                  <Checkbox
                    checked={isBuildingAreaFiltered}
                    onClick={() => {
                      setisBuildingAreaFiltered(prev => !prev)
                      setbuildingTransferArea(0)
                    }}
                    disabled={!isBuildingAreaCheckable}
                  />
                </Grid>
                <Grid item xs={10}>
                  <FormControl size='small' fullWidth>
                    {
                      isBuildingAreaFiltered && !isBuildingAreaFosced
                        ? <></>
                        : <InputLabel id="building-transfer-area">建坪面積</InputLabel>
                    }
                    <Select
                      labelId="building-transfer-area"
                      label="建坪面積"
                      id="building-transfer-area-select"
                      size='small'
                      value={isBuildingAreaFiltered ? buildingTransferArea : ''}
                      onChange={(event) => {
                        setbuildingTransferArea(Number(event.target.value))
                        setisBuildingAreaFosced(true)
                      }}
                      disabled={!isBuildingAreaFiltered}
                      // autoFocus={isBuildingAreaFiltered}
                      fullWidth
                    >
                      {
                        Object.keys(buildingTransactionAreaSet).map((assetCode, index) => {
                          return <MenuItem
                            key={index}
                            value={assetCode}
                          >{buildingTransactionAreaSet[Number(assetCode)]}</MenuItem>
                        })
                      }
                    </Select>
                  </FormControl>

                </Grid>

                {/* 地坪面積 */}
                <Grid item xs={2}>
                  <Checkbox
                    checked={isLandAreaFiltered}
                    onClick={() => {
                      setisLandAreaFiltered(prev => !prev)
                      setlandTransferArea(0)
                    }}
                    disabled={!isLandAreaCheckable}
                  />
                </Grid>
                <Grid item xs={10}>
                  <FormControl size='small' fullWidth>
                    {
                      isLandAreaFiltered && !isLandAreaFosced
                        ? <></>
                        : <InputLabel id="land-transfer-area">地坪面積</InputLabel>
                    }
                    <Select
                      labelId="land-transfer-area"
                      label="地坪面積"
                      id="land-transfer-area-select"
                      size='small'
                      fullWidth
                      value={isLandAreaFiltered ? landTransferArea : ''}
                      onChange={(event) => {
                        setlandTransferArea(Number(event.target.value))
                        setisLandAreaFosced(true)
                      }}
                      // autoFocus={isLandAreaFiltered}
                      disabled={!isLandAreaFiltered}
                    >
                      {
                        Object.keys(landTransactionAreaSet).map((assetCode, index) => {
                          return <MenuItem
                            key={index}
                            value={assetCode}
                          >{landTransactionAreaSet[Number(assetCode)]}</MenuItem>
                        })
                      }
                    </Select>
                  </FormControl>

                </Grid>

                {/* 屋齡 */}
                <Grid item xs={2}>
                  <Checkbox
                    checked={isAgeFiltered}
                    onClick={() => {
                      setisAgeFiltered(prev => !prev)
                      setage(0)
                    }}
                  />
                </Grid>
                <Grid item xs={10}>
                  <FormControl size='small' fullWidth>
                    {
                      isAgeFiltered && !isAgeFosced
                        ? <></>
                        : <InputLabel id="age">屋齡</InputLabel>
                    }
                    <Select
                      labelId="age"
                      label="屋齡"
                      id="age-select"
                      size='small'
                      value={isAgeFiltered ? age : ''}
                      onChange={(event) => {
                        setage(Number(event.target.value))
                        setisAgeFosced(true)
                      }}
                      disabled={!isAgeFiltered}
                      // autoFocus={isAgeFiltered}
                      fullWidth
                    >
                      {
                        Object.keys(ageSet).map((assetCode, index) => {
                          return <MenuItem
                            key={index}
                            value={assetCode}
                          >{ageSet[Number(assetCode)]}</MenuItem>
                        })
                      }
                    </Select>
                  </FormControl>

                </Grid>

                {/* 車位類型 */}
                <Grid item xs={2}>
                  <Checkbox
                    checked={isParkSpaceFiltered}
                    onClick={() => {
                      setisParkSpaceFiltered(prev => !prev)
                      setparkSpaceType(0)
                      if (isLandAreaFiltered) {
                        setisLandAreaFiltered(false)
                        setisLandAreaCheckable(false)
                      } else if (!isLandAreaCheckable) {
                        setisLandAreaFiltered(true)
                        setisLandAreaCheckable(true)
                      }

                      if (isBuildingAreaFiltered) {
                        setisBuildingAreaFiltered(false)
                        setisBuildingAreaCheckable(false)
                      } else if (!isBuildingAreaCheckable) {
                        setisBuildingAreaFiltered(true)
                        setisBuildingAreaCheckable(true)
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={10}>
                  <FormControl size='small' fullWidth>
                    {
                      isParkSpaceFiltered && !isParkSpaceFosced
                        ? <></>
                        : <InputLabel id="park-space">車位類型</InputLabel>
                    }
                    <Select
                      labelId="park-space"
                      label="車位類型"
                      id="park-space-select"
                      size='small'
                      fullWidth
                      value={isParkSpaceFiltered ? parkSpaceType : ''}
                      onChange={(event) => {
                        setparkSpaceType(Number(event.target.value))
                        setisParkSpaceFosced(true)
                      }}
                      // autoFocus={isParkSpaceFiltered}
                      disabled={!isParkSpaceFiltered}
                    >
                      {
                        Object.keys(parkSpaceSet).map((assetCode, index) => {
                          return <MenuItem
                            key={index}
                            value={assetCode}
                          >{parkSpaceSet[Number(assetCode)]}</MenuItem>
                        })
                      }
                    </Select>
                  </FormControl>

                </Grid>

                {/* 使用分區 */}
                {/* <Grid item xs={2}>
                  <Checkbox
                    checked={isUrbanUsageFiltered}
                    onClick={() => {
                      setisUrbanUsageFiltered(prev => !prev)
                      seturbanLandUse(0)
                    }}
                  />
                </Grid>
                <Grid item xs={10}>
                  <FormControl size='small' fullWidth>
                    {
                      isUrbanUsageFiltered && !isUrbanUsageFosced
                        ? <></>
                        : <InputLabel id="land-use">使用分區</InputLabel>
                    }
                    <Select
                      labelId="land-use"
                      label="使用分區"
                      id="land-use-select"
                      size='small'
                      fullWidth
                      value={isUrbanUsageFiltered ? urbanLandUse : null}
                      onChange={(event) => {
                        seturbanLandUse(Number(event.target.value))
                        setisUrbanUsageFosced(true)
                      }}
                      // autoFocus={isUrbanUsageFiltered}
                      disabled={!isUrbanUsageFiltered}
                    >
                      {
                        Object.keys(urbanUsageSet).map((assetCode, index) => {
                          return <MenuItem
                            key={index}
                            value={assetCode}
                          >{urbanUsageSet[Number(assetCode)]}</MenuItem>
                        })
                      }
                    </Select>
                  </FormControl>

                </Grid> */}

              </Grid>

            </div>

            <div className={style.controlSet}>
              <div className={style.settingBtn}
                onClick={() => {
                  setmsgOpen(true)
                  seterrorTitle('訊息')
                  seterrorContent('自定義參數功能尚未開發')
                }}
              >
                <Image src={'/aprRegion/setting.png'} width='30px' height='30px' />
                <p>自定義參數</p>
              </div>

              <div className={style.searchBtn}
                onClick={handleFormSubmit}
              >
                <Image src={'/aprRegion/search.png'} width='30px' height='30px' />
                <p>查詢</p>
              </div>
            </div>

          </div>
          {
            filteredResults && filteredResults.length !== 0
              ?
              <div className={style.resultGroup}>
                <p className={style.resultStatus}>共有
                  <span className={style.count}>{filteredResults.length}</span>
                  筆實價登陸紀錄
                </p>
                <div className={style.graphGroup}>
                  {
                    filteredResults.map((result, index) => {
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

        {
          filteredResults === null || filteredResults.length === 0
            ? <></>
            :
            <div className={style.resultPanel}>
              {
                filteredResults && filteredResults.length !== 0
                  ?
                  <>
                    <div className={style.resultHeader}>
                      <span className={style.resultStatus}>共有
                        <span className={style.count}>{filteredResults.length}</span>
                        筆實價登陸紀錄
                      </span>
                      <span className={style.closeBtn}
                        onClick={() => {
                          setfilteredResults(null)
                        }}
                      >✖</span>
                    </div>
                    <div className={style.aprRecordGroup}>
                      {
                        filteredResults.map((result, index) => {
                          return <MarketCompareResultCard
                            key={index}
                            {...result}
                          />
                        })
                      }
                    </div>

                    {
                      graphData
                        ? <div className={style.chartsGroup}>
                          {
                            Object.keys(graphData!).map((buildingType, index) => {
                              const typeData = graphData![buildingType]
                              const years = Object.keys(typeData)
                              const meanPriceValues: number[] = []
                              const meanUnitPriceValues: number[] = []
                              const meanAgeValues: number[] = []
                              const countValues: number[] = []

                              years.forEach((year) => {
                                const yearD = typeData[year] as IResultStatistics
                                meanPriceValues.push(yearD.priceWithoutParking_MEAN)
                                meanUnitPriceValues.push(yearD.unitPrice_MEAN)
                                meanAgeValues.push(yearD.age_MEAN)
                                countValues.push(yearD.count)
                              })

                              const meanPriceOption: EChartsOption = {
                                xAxis: {
                                  type: 'category',
                                  data: years
                                },
                                yAxis: {
                                  type: 'value',
                                  name: "單位(百萬)",
                                  axisLabel: {
                                    formatter: (function (value: string) {
                                      const newVlaue = Math.round(Number(value) / 1000000)
                                      return newVlaue.toString()
                                    }),
                                    align: 'center'
                                  }
                                },
                                series: [
                                  {
                                    data: meanPriceValues,
                                    type: 'line',
                                    smooth: true
                                  }
                                ],
                                tooltip: {
                                  trigger: 'axis',
                                  formatter: function (param: any, value) {
                                    // console.log(param[0].value)
                                    const newVlaue = Math.round(Number(param[0].value) / 1000000)
                                    if (Math.floor(newVlaue / 10) !== 0) {
                                      return `${Math.floor(newVlaue / 10)}千${newVlaue % 10}百萬`
                                    } else {
                                      return `${newVlaue % 10}百萬`
                                    }

                                  }
                                }
                              }

                              const meanUnitPriceOption: EChartsOption = {
                                xAxis: {
                                  type: 'category',
                                  data: years
                                },
                                yAxis: {
                                  type: 'value',
                                  name: "單位(萬/坪)",
                                  axisLabel: {
                                    formatter: (function (value: string) {
                                      const newVlaue = Math.round(Math.round(Number(value) * 3.305785 / 1000) / 10)
                                      return newVlaue.toString()
                                    }),
                                    align: 'center'
                                  }
                                },
                                series: [
                                  {
                                    data: meanUnitPriceValues,
                                    type: 'line',
                                    smooth: true
                                  }
                                ]
                              }

                              const meanAgeOption: EChartsOption = {
                                xAxis: {
                                  type: 'category',
                                  data: years
                                },
                                yAxis: {
                                  type: 'value',
                                  name: "年"
                                },
                                series: [
                                  {
                                    data: meanAgeValues,
                                    type: 'line',
                                    smooth: true
                                  }
                                ]
                              }

                              const countOption: EChartsOption = {
                                xAxis: {
                                  type: 'category',
                                  data: years
                                },
                                yAxis: {
                                  type: 'value',
                                  name: "交易數量(千)",
                                  axisLabel: {
                                    formatter: (function (value: string) {
                                      return (Number(value) / 1000).toString()
                                    }),
                                    align: 'center'
                                  }
                                },
                                series: [
                                  {
                                    data: countValues,
                                    type: 'line',
                                    smooth: true
                                  }
                                ]
                              }

                              return <div className={style.chartsContainer} key={index}>
                                <p className={style.title}>平均成交價格</p>
                                <ReactEcharts option={meanPriceOption} />
                                <p className={style.title}>平均成交單價</p>
                                <ReactEcharts option={meanUnitPriceOption} />
                                <p className={style.title}>平均成交屋齡</p>
                                <ReactEcharts option={meanAgeOption} />
                                <p className={style.title}>平均成交數量</p>
                                <ReactEcharts option={countOption} />
                              </div>
                            })
                          }

                        </div>
                        : <></>
                    }

                  </>
                  : <></>
              }
            </div>
        }

        <div className={style.content}>
          <div className={style.mapContainer}>
            <MarketMapContainer
              active={isSelectorActive}
              bufferRadius={bufferRadius!}
              filteredResults={filteredResults!}
              onCoordinateSelect={handleCoordinateSelect}
            />
          </div>
        </div>

        <Dialog
          open={msgOpen}
          onClose={() => {
            setmsgOpen(false)
            seterrorTitle('')
            seterrorContent('')
          }}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {errorTitle}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {errorContent}
            </DialogContentText>
          </DialogContent>
          <DialogActions>

            <Button onClick={() => {
              setmsgOpen(false)
              seterrorTitle('')
              seterrorContent('')
            }} autoFocus>
              確認
            </Button>
          </DialogActions>
        </Dialog>

      </div>
    </>
  )
}

export default AprRegion
