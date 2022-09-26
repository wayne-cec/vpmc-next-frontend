import React, { useState, useEffect } from 'react'
import style from './index.module.scss'
import dynamic from 'next/dynamic'
import api from '../../api'
import Head from 'next/head'
import moment from 'moment'
import QueryPanel from './QueryPanel'
import ResultPanel from './ResultPanel'
import AprDetailContent from './AprDetailContent'
import MarketCompareContext from './MarketCompareContext'
import PanelContainer from '../../components/PanelContainer'
import PanelButton from '../../components/PanelContainer/PanelButton'
import WithNavProtected from '../../layout/front-layout/WithNavProtected'
import { PolygonSketchMode } from '../../components/PolygonSketch'
import { AssetType, IGraphData } from '../../api/prod'
import {
  Dialog, DialogActions,
  DialogContent, DialogContentText,
  DialogTitle, Button
} from '@mui/material'
import { IMarketCompare, IMarketCompareResult } from '../../api/prod'
import { parseCommitee } from '../../lib/parseCommitee'
import { IDetailAprInfo } from './AprDetailContent'
import { ICountyData, ITownData } from '../../api/prod'
import { useSelector } from 'react-redux'
import { selectUser } from '../../store/slice/user'

const square = 3.305785

export type SpatialQueryType = 'buffer' | 'polygon' | 'circle' | 'rectangle' | 'none' | 'clear'

const MarketMapContainer = dynamic(
  () => import('../../components/MapContainer/MarketCompareMap'),
  { ssr: false }
)

const MarketCompareContainer = () => {
  const userInfo = useSelector(selectUser)
  const [longitude, setlongitude] = useState<number | undefined>(undefined)
  const [latitude, setlatitude] = useState<number | undefined>(undefined)
  const [locatedCounty, setlocatedCounty] = useState<string | null>(null)
  const [locatedTown, setlocatedTown] = useState<string | null>(null)
  const [isSelectorActive, setisCoordinateSelectorActive] = useState<boolean>(false)

  const [isTransactionTimeFiltered, setisTransactionTimeFiltered] = useState<boolean>(false)
  const [isBuildingAreaFiltered, setisBuildingAreaFiltered] = useState<boolean>(false)
  const [isLandAreaFiltered, setisLandAreaFiltered] = useState<boolean>(false)
  const [isAgeFiltered, setisAgeFiltered] = useState<boolean>(false)
  const [isParkSpaceFiltered, setisParkSpaceFiltered] = useState<boolean>(false)
  const [isUrbanUsageFiltered, setisUrbanUsageFiltered] = useState<boolean>(false)
  const [isPriceFiltered, setisPriceFiltered] = useState<boolean>(false)
  const [isUnitPriceFiltered, setisUnitPriceFiltered] = useState<boolean>(false)

  const [isTransactionTimeFosced, setisTransactionTimeFosced] = useState<boolean>(false)
  const [isBuildingAreaFosced, setisBuildingAreaFosced] = useState<boolean>(false)
  const [isLandAreaFosced, setisLandAreaFosced] = useState<boolean>(false)
  const [isAgeFosced, setisAgeFosced] = useState<boolean>(false)
  const [isParkSpaceFosced, setisParkSpaceFosced] = useState<boolean>(false)
  const [isUrbanUsageFosced, setisUrbanUsageFosced] = useState<boolean>(false)
  const [isPriceFocused, setisPriceFocused] = useState<boolean>(false)
  const [isUnitPriceFocused, setisUnitPriceFocused] = useState<boolean>(false)

  const [isBuildingAreaCheckable, setisBuildingAreaCheckable] = useState<boolean>(true)
  const [isLandAreaCheckable, setisLandAreaCheckable] = useState<boolean>(true)

  const [assetTypeCode, setassetTypeCode] = useState<AssetType>('building')
  const [buildingTypeCode, setbuildingTypeCode] = useState<number>(0)

  const [bufferRadius, setbufferRadius] = useState<number>(300)
  const [transactiontime, settransactionTime] = useState<number | null>(null)
  const [buildingTransferArea, setbuildingTransferArea] = useState<number | null>(null)
  const [landTransferArea, setlandTransferArea] = useState<number | null>(null)
  const [age, setage] = useState<number | null>(null)
  const [parkSpaceType, setparkSpaceType] = useState<number | null>(null)
  const [urbanLandUse, seturbanLandUse] = useState<number[] | null>(null)
  const [polygonGoejson, setpolygonGoejson] = useState<string | null>(null)

  const [minPrice, setminPrice] = useState<number | undefined>(0)
  const [maxPrice, setmaxPrice] = useState<number | undefined>(2000)
  const [minUnitPrice, setminUnitPrice] = useState<number | undefined>(0)
  const [maxUnitPrice, setmaxUnitPrice] = useState<number | undefined>(100)

  const [filteredResults, setfilteredResults] = useState<IMarketCompareResult[] | null>(null)

  const [msgOpen, setmsgOpen] = useState<boolean>(false)
  const [errorTitle, seterrorTitle] = useState<string>('')
  const [errorContent, seterrorContent] = useState<string>('')

  const [graphData, setgraphData] = useState<IGraphData | undefined>(undefined)
  const [spatialQueryType, setspatialQueryType] = useState<SpatialQueryType>('buffer')
  const [sketchMode, setsketchMode] = useState<PolygonSketchMode>('inactive')
  const [zoomId, setzoomId] = useState<{ id: string } | null>(null)
  const [pending, setpending] = useState<boolean>(false)

  const [queryPanelShow, setqueryPanelShow] = useState<boolean>(true)
  const [resultPanelShow, setresultPanelShow] = useState<boolean>(false)
  const [queryPanelHover, setqueryPanelHover] = useState<boolean>(false)
  const [resultPanelHover, setresultPanelHover] = useState<boolean>(false)

  const [detailPanelShow, setdetailPanelShow] = useState<boolean>(false)
  const [detailAprId, setdetailAprId] = useState<{ id: string }>({ id: '' })
  const [detailAprInfo, setdetailAprInfo] = useState<IDetailAprInfo | null>(null)

  const [county, setcounty] = useState<string | null>(null)
  const [towns, settowns] = useState<string[]>([])
  const [countyData, setcountyData] = useState<ICountyData | null>(null)
  const [townData, settownData] = useState<ITownData | null>(null)
  const [uploadPanelOpen, setuploadPanelOpen] = useState<boolean>(false)

  const handleCoordinateSelect = async (longitude: number | undefined, latitude: number | undefined) => {
    setlongitude(longitude)
    setlatitude(latitude)
    setisCoordinateSelectorActive(false)
    const { statusCode, responseContent } = await api.prod.getCountyTownNameByCoordinate(longitude!, latitude!)
    if (statusCode === 200) {
      setlocatedCounty(responseContent.countyname)
      setlocatedTown(responseContent.townname)
    } else {
      setlocatedCounty(null)
      setlocatedTown(null)
    }
  }

  const handleFormSubmit = async () => {
    setpending(true)
    setfilteredResults(null)
    if (assetTypeCode === null) {
      setmsgOpen(true)
      seterrorTitle('警告')
      seterrorContent('請輸入資產類別')
      setpending(false)
      return
    }
    if (minPrice && maxPrice && minPrice > maxPrice) {
      setmsgOpen(true)
      seterrorTitle('錯誤')
      seterrorContent('價格上限不能低於下限')
      setpending(false)
      return
    }
    if (minUnitPrice && maxUnitPrice && minUnitPrice > maxUnitPrice) {
      setmsgOpen(true)
      seterrorTitle('錯誤')
      seterrorContent('價格上限不能低於下限')
      setpending(false)
      return
    }
    // alert(spatialQueryType)
    const params: IMarketCompare = {
      assetType: assetTypeCode,
      buildingType: buildingTypeCode
    }
    if (longitude !== undefined && latitude !== undefined && bufferRadius !== null && spatialQueryType === 'buffer') {
      params.longitude = longitude
      params.latitude = latitude
      params.bufferRadius = bufferRadius
    } else if (polygonGoejson !== null && spatialQueryType !== 'clear' && spatialQueryType !== 'buffer') {
      params.geojson = polygonGoejson
    } else if (sketchMode === 'county') {
      params.county = county!
      params.town = towns.join(',')
    } else {
      setmsgOpen(true)
      seterrorTitle('警告')
      seterrorContent('至少選擇一種空間查詢方法，並輸入參數。')
      setpending(false)
      return
    }

    if (isTransactionTimeFiltered && transactiontime) {
      const dateNow = new Date()
      params.transactionTimeStart = moment(dateNow).add(-transactiontime, 'year').format('YYYY/MM/DD')
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
    if (isUrbanUsageFiltered && urbanLandUse) {
      params.urbanLandUse = urbanLandUse
    }
    if (isPriceFiltered) {
      params.minPrice = minPrice
      params.maxPrice = maxPrice
    }
    if (isUnitPriceFiltered) {
      params.minUnitPrice = minUnitPrice
      params.maxUnitPrice = maxUnitPrice
    }


    const { statusCode, responseContent } = await api.prod.marketCompare(params, userInfo.token)
    if (statusCode === 200) {
      console.log(responseContent)
      setfilteredResults(responseContent)
      const { statusCode, responseContent2 } = await api.prod.marketCompareStatistic(params, userInfo.token)
      if (statusCode === 200) {
        setgraphData(responseContent2)
        setpending(false)
        setqueryPanelShow(false)
        setresultPanelShow(true)
      } else {
        setmsgOpen(true)
        seterrorTitle('錯誤')
        seterrorContent('伺服器錯誤，統計圖表資料請求失敗，請聯繫開發人員')
        setpending(false)
      }
    } else {
      setfilteredResults(null)
      setmsgOpen(true)
      seterrorTitle('錯誤')
      seterrorContent('伺服器錯誤，查詢失敗，請聯繫開發人員')
      setpending(false)
    }
  }

  const handleShowQueryPanel = () => {
    setqueryPanelShow(prev => !prev)
    setresultPanelShow(false)
  }

  const handleShowResultPanel = () => {
    setresultPanelShow(prev => !prev)
    setqueryPanelShow(false)
  }

  const handleGetCommiteeByAprId = async (id: string) => {
    const { statusCode, responseContent } = await api.prod.getCommiteeByAprId(id)
    if (statusCode === 200) {
      return responseContent.organization
    }
    return undefined
  }

  const handleErrorDialogClose = () => {
    setmsgOpen(false)
    seterrorTitle('')
    seterrorContent('')
  }

  const reFetchTownData = async (county: string) => {
    const { statusCode, responseContent2 } = await api.prod.listTownsByCounty(county)
    if (statusCode === 200) {
      settowns([responseContent2['鄉鎮市區'][0].name])
      settownData(responseContent2)
    }
  }

  useEffect(() => {
    if (filteredResults?.length === 0) {
      setmsgOpen(true)
      seterrorTitle('訊息')
      seterrorContent('查無資料')
    }
  }, [filteredResults])

  useEffect(() => {
    (async () => {
      if (filteredResults == null) return
      if (filteredResults.length === 0) return
      const detailApr = filteredResults.filter(apr => apr.id === detailAprId.id)
      if (detailApr.length === 0) {
        setdetailPanelShow(false)
        setmsgOpen(true)
        seterrorTitle('訊息')
        seterrorContent(`查無 ${detailAprId.id} 的詳細資訊，請聯繫開發人員。`)
        return
      }
      const commiteeName = await handleGetCommiteeByAprId(detailAprId.id)
      setdetailPanelShow(true)
      setdetailAprInfo({ ...detailApr[0], organization: commiteeName ? commiteeName : '無管委會' })
    })()
  }, [detailAprId])

  useEffect(() => {
    const fetchDefaultCountyData = async () => {
      const { statusCode, responseContent } = await api.prod.listCountiesByRegion()
      if (statusCode === 200) {
        setcountyData(responseContent)
        setcounty(responseContent['北部'][0].name)
        const { statusCode, responseContent2 } = await api.prod.listTownsByCounty(responseContent['北部'][0].name)
        if (statusCode === 200) {
          settownData(responseContent2)
          settowns([responseContent2['鄉鎮市區'][0].name])
        }
      }
    }
    fetchDefaultCountyData()
  }, [])

  return (
    <>
      <Head>
        <title>VPMC | 實價登錄資訊平台</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/yuantai.ico" />
      </Head>
      <MarketCompareContext.Provider
        value={{
          queryPanelShow: queryPanelShow,
          resultPanelShow: resultPanelShow,
          longitude: longitude!,
          latitude: latitude!,
          locatedCounty: locatedCounty!,
          locatedTown: locatedTown!,
          isSelectorActive: isSelectorActive,
          isTransactionTimeFiltered: isTransactionTimeFiltered,
          isBuildingAreaFiltered: isBuildingAreaFiltered,
          isLandAreaFiltered: isLandAreaFiltered,
          isAgeFiltered: isAgeFiltered,
          isParkSpaceFiltered: isParkSpaceFiltered,
          isUrbanUsageFiltered: isUrbanUsageFiltered,
          isPriceFiltered: isPriceFiltered,
          isUnitPriceFiltered: isUnitPriceFiltered,
          isTransactionTimeFosced: isTransactionTimeFosced,
          isBuildingAreaFosced: isBuildingAreaFosced,
          isLandAreaFosced: isLandAreaFosced,
          isAgeFosced: isAgeFosced,
          isParkSpaceFosced: isParkSpaceFosced,
          isUrbanUsageFosced: isUrbanUsageFosced,
          isPriceFocused: isPriceFocused,
          isUnitPriceFocused: isUnitPriceFocused,
          isBuildingAreaCheckable: isBuildingAreaCheckable,
          isLandAreaCheckable: isLandAreaCheckable,
          assetTypeCode: assetTypeCode,
          buildingTypeCode: buildingTypeCode,
          bufferRadius: bufferRadius,
          transactiontime: transactiontime!,
          buildingTransferArea: buildingTransferArea!,
          landTransferArea: landTransferArea!,
          age: age!,
          parkSpaceType: parkSpaceType!,
          urbanLandUse: urbanLandUse!,
          polygonGoejson: polygonGoejson!,
          minPrice: minPrice,
          maxPrice: maxPrice,
          minUnitPrice: minUnitPrice,
          maxUnitPrice: maxUnitPrice,
          filteredResults: filteredResults!,
          spatialQueryType: spatialQueryType,
          sketchMode: sketchMode,
          graphData: graphData,
          county: county,
          towns: towns,
          countyData: countyData,
          townData: townData,
          uploadPanelOpen: uploadPanelOpen,
          onUploadClick: (value) => { setuploadPanelOpen(value) },
          onCoordinatorSelectorClick: (value) => { setisCoordinateSelectorActive(value) },
          onSpatialQueryTypeChange: setspatialQueryType,
          onBufferRadiusChange: (value) => { setbufferRadius(value) },
          onSketchModeChange: (value) => { setsketchMode(value) },
          onDraw: () => { setsketchMode('draw') },
          onClear: () => { setspatialQueryType('clear') },
          onAssetTypeChange: (value) => { setassetTypeCode(value) },
          onBuildingTypeChange: (value) => { setbuildingTypeCode(value) },
          onTransactionTimeFilteredChange: () => {
            setisTransactionTimeFiltered(prev => !prev)
            settransactionTime(1)
          },
          onTransactionTimeSelect: (value) => {
            settransactionTime(value)
            setisTransactionTimeFosced(true)
          },
          onBuildingAreaFilteredChange: () => {
            setisBuildingAreaFiltered(prev => !prev)
            setbuildingTransferArea(0)
          },
          onBuildingAreaSelect: (value) => {
            setbuildingTransferArea(value)
            setisBuildingAreaFosced(true)
          },
          onLandAreaFilteredChange: () => {
            setisLandAreaFiltered(prev => !prev)
            setlandTransferArea(0)
          },
          onLandAreaSelect: (value) => {
            setlandTransferArea(value)
            setisLandAreaFosced(true)
          },
          onAgeFilteredChange: () => {
            setisAgeFiltered(prev => !prev)
            setage(0)
          },
          onAgeSelect: (value) => {
            setage(value)
            setisAgeFosced(true)
          },
          onParkSpaceTypeFilteredChange: () => {
            setisParkSpaceFiltered(prev => !prev)
            setparkSpaceType(0)
          },
          onParkSpaceTypeSelect: (value) => {
            setparkSpaceType(value)
            setisParkSpaceFosced(true)
          },
          onUrbanLaudUseFilteredChange: () => {
            setisUrbanUsageFiltered(prev => !prev)
            seturbanLandUse([0])
          },
          onUrbanLaudUseSelect: (value) => {
            seturbanLandUse(value)
            setisUrbanUsageFosced(true)
          },
          onPriceFilteredChange: () => {
            setisPriceFiltered(prev => !prev)
          },
          onMinPriceChange: (value) => {
            setminPrice(value)
          },
          onMaxPriceChange: (value) => {
            setmaxPrice(value)
          },

          onUnitPriceFilteredChange: () => {
            setisUnitPriceFiltered(prev => !prev)
          },
          onMinUnitPriceChange: (value) => {
            setminUnitPrice(value)
          },
          onMaxUnitPriceChange: (value) => {
            setmaxUnitPrice(value)
          },
          onCustomizeParamBtnClick: () => {
            setmsgOpen(true)
            seterrorTitle('訊息')
            seterrorContent('自定義參數功能尚未開發')
          },
          handleFormSubmit: handleFormSubmit,
          zoomId: zoomId,
          pending: pending,
          onZoomIdChange: (value) => { setzoomId(value) },
          setpending: (value) => { setpending(value) },
          onDetailAprChange: (id) => { setdetailAprId({ id: id }) },
          onShow: (value) => { setdetailPanelShow(value) },
          onResultPanelClose: () => { setfilteredResults(null) },
          onCountyRadioClick: () => {
            setmsgOpen(true)
            seterrorTitle('警告')
            seterrorContent('此方法會調出大量資料，請謹慎使用。')
          },
          onCountyChange: (county) => {
            setcounty(county)
            reFetchTownData(county)
          },
          onTownChange: (towns) => {
            settowns(towns)
          },
          handleCoordinateSelect: (longitude, latitude) => {
            if (longitude)
              setlongitude(longitude)
            if (latitude)
              setlatitude(latitude)
          },
          onCoordinateSelect: (longitude, latitude) => {
            handleCoordinateSelect(longitude, latitude)
          }
        }}
      >
        <div className={style.main}>
          <PanelContainer>
            <PanelButton
              content='查詢'
              icon={queryPanelShow || queryPanelHover ? '/marketCompare/magnifier-focused.png' : '/marketCompare/magnifier.png'}
              focused={queryPanelShow}
              onClick={handleShowQueryPanel}
              onHover={(value) => { setqueryPanelHover(value) }}
            />
            <PanelButton
              content='結果'
              icon={resultPanelShow || resultPanelHover ? '/marketCompare/sheet-focused.png' : '/marketCompare/sheet.png'}
              focused={resultPanelShow}
              onClick={handleShowResultPanel}
              onHover={(value) => { setresultPanelHover(value) }}
            />
          </PanelContainer>
          <QueryPanel />
          <ResultPanel />
          <div className={style.content}>
            <div className={style.mapContainer}>
              <MarketMapContainer
                onCoordinateSelect={handleCoordinateSelect}
                onSketchModeChange={setsketchMode}
                onGeojsonChange={setpolygonGoejson}
                onSpatialQueryTypeChange={setspatialQueryType}
              />
            </div>
          </div>
        </div>
      </MarketCompareContext.Provider>
      <Dialog
        open={msgOpen}
        onClose={handleErrorDialogClose}
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
          <Button onClick={handleErrorDialogClose}>
            確認
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={detailPanelShow}
        onClose={() => {
          setdetailPanelShow(false)
        }}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title"
          sx={{ paddingBottom: '0px' }}
        >
          {parseCommitee(detailAprInfo ? detailAprInfo.organization : '無管委會')}
        </DialogTitle>

        <DialogContent sx={{ width: '900px' }}>
          <AprDetailContent {...detailAprInfo!} />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => {
            setdetailPanelShow(false)
          }}>
            確認
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default WithNavProtected(MarketCompareContainer)
