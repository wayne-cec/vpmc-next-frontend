import type { NextPage } from 'next'
import style from './index.module.scss'
import dynamic from 'next/dynamic'
import api from '../../../api'
import Head from 'next/head'
import moment from 'moment'
import { PolygonSketchMode } from '../../../components/PolygonSketch'
import { IGraphData } from '../../../api/prod'
import { useState, useEffect, useContext } from 'react'
import {
  Dialog, DialogActions,
  DialogContent, DialogContentText,
  DialogTitle, Button
} from '@mui/material'
import { IMarketCompare, IMarketCompareResult } from '../../../api/prod'
import { WithNavProtected } from '../../../layout/BaseLayout'
import QueryPanel from './QueryPanel'
import ResultPanel from './ResultPanel'
import React, { createContext } from 'react'
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer'
import MapView from '@arcgis/core/views/MapView'
import PictureMarkerSymbol from '@arcgis/core/symbols/PictureMarkerSymbol'
import PanelContainer from '../../../components/PanelContainer'
import PanelButton from '../../../components/PanelContainer/PanelButton'
import { parseCommitee } from '../../../lib/parseCommitee'
import AprDetailContent from './AprDetailContent'
import { IDetailAprInfo } from './AprDetailContent'

const square = 3.305785

export type SpatialQueryType = 'buffer' | 'polygon' | 'circle' | 'rectangle' | 'none' | 'clear'

const MarketMapContainer = dynamic(
  () => import('../../../components/MapContainer/MarketCompareMap'),
  { ssr: false }
)

export const ZoomContext = createContext<{
  zoomId: { id: string } | null
  onZoomIdChange: (value: { id: string } | null) => void
}>({
  zoomId: null,
  onZoomIdChange: (value) => { }
})

export const PendingContext = createContext<{
  pending: boolean,
  setpending: (value: boolean) => void
}>({
  pending: false,
  setpending: (value) => { }
})

export const usePendingStatus = () => {
  return useContext(PendingContext)
}

export const DetailContext = createContext<{
  onDetailAprChange: (id: string) => void
  onShow: (value: boolean) => void
}>({
  onDetailAprChange: (id) => { },
  onShow: (value) => { }
})

const MarketCompare: NextPage = () => {
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

  const [assetTypeCode, setassetTypeCode] = useState<number>(0)
  const [bufferRadius, setbufferRadius] = useState<number>(300)
  const [transactiontime, settransactionTime] = useState<number | null>(null)
  const [buildingTransferArea, setbuildingTransferArea] = useState<number | null>(null)
  const [landTransferArea, setlandTransferArea] = useState<number | null>(null)
  const [age, setage] = useState<number | null>(null)
  const [parkSpaceType, setparkSpaceType] = useState<number | null>(null)
  // const [urbanLandUse, seturbanLandUse] = useState<number | null>(null)
  const [polygonGoejson, setpolygonGoejson] = useState<string | null>(null)

  const [filteredResults, setfilteredResults] = useState<IMarketCompareResult[] | null>(null)

  const [msgOpen, setmsgOpen] = useState<boolean>(false)
  const [errorTitle, seterrorTitle] = useState<string>('')
  const [errorContent, seterrorContent] = useState<string>('')

  const [graphData, setgraphData] = useState<IGraphData | null>(null)
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

  const handleCoordinateSelect = async (longitude: number | null, latitude: number | null) => {
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
    if (assetTypeCode !== null) {
      // alert(spatialQueryType)
      const params: IMarketCompare = {
        buildingType: assetTypeCode
      }
      if (longitude !== null && latitude !== null && bufferRadius !== null && spatialQueryType === 'buffer') {
        params.longitude = longitude
        params.latitude = latitude
        params.bufferRadius = bufferRadius
      } else if (polygonGoejson !== null && spatialQueryType !== 'clear' && spatialQueryType !== 'buffer') {
        params.geojson = polygonGoejson
      } else {
        setmsgOpen(true)
        seterrorTitle('警告')
        seterrorContent('至少選擇一種空間查詢方法')
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
      const { statusCode, responseContent } = await api.prod.marketCompare(params)
      if (statusCode === 200) {
        console.log(responseContent)
        setfilteredResults(responseContent)
        const { statusCode, responseContent2 } = await api.prod.marketCompareStatistic(params)
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
    } else {
      setmsgOpen(true)
      seterrorTitle('警告')
      seterrorContent('請輸入資產類別')
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


  return (
    <>
      <Head>
        <title>VPMC | 實價登錄資訊平台</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/yuantai.ico" />
      </Head>
      <ZoomContext.Provider value={{
        zoomId: zoomId,
        onZoomIdChange: (value) => { setzoomId(value) }
      }}>
        <PendingContext.Provider value={{
          pending: pending,
          setpending: (value) => { setpending(value) }
        }}>
          <DetailContext.Provider value={{
            onDetailAprChange: (id) => { setdetailAprId({ id: id }) },
            onShow: (value) => { setdetailPanelShow(value) }
          }}>
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

              <QueryPanel
                show={queryPanelShow}
                longitude={longitude!}
                latitude={latitude!}
                locatedCounty={locatedCounty!}
                locatedTown={locatedTown!}
                isSelectorActive={isSelectorActive}
                isTransactionTimeFiltered={isTransactionTimeFiltered}
                isBuildingAreaFiltered={isBuildingAreaFiltered}
                isLandAreaFiltered={isLandAreaFiltered}
                isAgeFiltered={isAgeFiltered}
                isParkSpaceFiltered={isParkSpaceFiltered}
                isTransactionTimeFosced={isTransactionTimeFosced}
                isBuildingAreaFosced={isBuildingAreaFosced}
                isLandAreaFosced={isLandAreaFosced}
                isAgeFosced={isAgeFosced}
                isParkSpaceFosced={isParkSpaceFosced}
                isBuildingAreaCheckable={isBuildingAreaCheckable}
                isLandAreaCheckable={isLandAreaCheckable}
                assetTypeCode={assetTypeCode}
                bufferRadius={bufferRadius}
                transactiontime={transactiontime!}
                buildingTransferArea={buildingTransferArea!}
                landTransferArea={landTransferArea!}
                age={age!}
                parkSpaceType={parkSpaceType!}
                polygonGoejson={polygonGoejson!}
                filteredResults={filteredResults!}
                spatialQueryType={spatialQueryType}
                sketchMode={sketchMode}
                onCoordinatorSelectorClick={(value) => { setisCoordinateSelectorActive(value) }}
                onSpatialQueryTypeChange={setspatialQueryType}
                onBufferRadiusChange={(value) => { setbufferRadius(value) }}
                onSketchModeChange={(value) => { setsketchMode(value) }}
                onDraw={() => { setsketchMode('draw') }}
                onClear={() => { setspatialQueryType('clear') }}
                onAssetTypeChange={(value) => { setassetTypeCode(value) }}
                onTransactionTimeFilteredChange={() => {
                  setisTransactionTimeFiltered(prev => !prev)
                  settransactionTime(1)
                }}
                onTransactionTimeSelect={(value) => {
                  settransactionTime(value)
                  setisTransactionTimeFosced(true)
                }}
                onBuildingAreaFilteredChange={() => {
                  setisBuildingAreaFiltered(prev => !prev)
                  setbuildingTransferArea(0)
                }}
                onBuildingAreaSelect={(value) => {
                  setbuildingTransferArea(value)
                  setisBuildingAreaFosced(true)
                }}
                onLandAreaFilteredChange={() => {
                  setisLandAreaFiltered(prev => !prev)
                  setlandTransferArea(0)
                }}
                onLandAreaSelect={(value) => {
                  setlandTransferArea(value)
                  setisLandAreaFosced(true)
                }}
                onAgeFilteredChange={() => {
                  setisAgeFiltered(prev => !prev)
                  setage(0)
                }}
                onAgeSelect={(value) => {
                  setage(value)
                  setisAgeFosced(true)
                }}
                onParkSpaceTypeFilteredChange={() => {
                  setisParkSpaceFiltered(prev => !prev)
                  setparkSpaceType(0)
                }}
                onParkSpaceTypeSelect={(value) => {
                  setparkSpaceType(value)
                  setisParkSpaceFosced(true)
                }}
                onCustomizeParamBtnClick={() => {
                  setmsgOpen(true)
                  seterrorTitle('訊息')
                  seterrorContent('自定義參數功能尚未開發')
                }}
                handleFormSubmit={handleFormSubmit}
              />

              <ResultPanel
                show={resultPanelShow}
                filteredResults={filteredResults!}
                graphData={graphData!}
                onClose={() => {
                  setfilteredResults(null)
                }}
              />

              <div className={style.content}>
                <div className={style.mapContainer}>
                  <MarketMapContainer
                    active={isSelectorActive}
                    bufferRadius={bufferRadius!}
                    filteredResults={filteredResults!}
                    spatialQueryType={spatialQueryType}
                    sketchMode={sketchMode}
                    zoomId={zoomId}
                    onCoordinateSelect={handleCoordinateSelect}
                    onSketchModeChange={setsketchMode}
                    onGeojsonChange={setpolygonGoejson}
                    onSpatialQueryTypeChange={setspatialQueryType}
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
                  }}>
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

                <DialogContent>
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

            </div>
          </DetailContext.Provider>
        </PendingContext.Provider>
      </ZoomContext.Provider>
    </>
  )
}

export default WithNavProtected(MarketCompare)
