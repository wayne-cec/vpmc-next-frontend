import React, { useEffect } from 'react'
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
import useMarketCompareStates from './MarketCompareStates'
import {
  Dialog, DialogActions,
  DialogContent, DialogContentText,
  DialogTitle, Button
} from '@mui/material'
import { IMarketCompare } from '../../api/prod'
import { useSelector } from 'react-redux'
import { selectUser } from '../../store/slice/user'
import { useLazyGetAssetDetailByAprIdQuery } from '../../store/services/apr'

const square = 3.305785

export type SpatialQueryType = 'buffer' | 'polygon' | 'circle' | 'rectangle' | 'none' | 'clear'

const MarketMapContainer = dynamic(
  () => import('../../components/MapContainer/MarketCompareMap'),
  { ssr: false }
)

const MarketCompareContainer = () => {
  const userInfo = useSelector(selectUser)
  const mcStates = useMarketCompareStates()
  const [trigger, { isFetching }] = useLazyGetAssetDetailByAprIdQuery()

  const handleCoordinateSelect = async (longitude: number | undefined, latitude: number | undefined) => {
    mcStates.setlongitude(longitude)
    mcStates.setlatitude(latitude)
    mcStates.setisCoordinateSelectorActive(false)
    const { statusCode, responseContent } = await api.prod.getCountyTownNameByCoordinate(longitude!, latitude!)
    if (statusCode === 200) {
      mcStates.setlocatedCounty(responseContent.countyname)
      mcStates.setlocatedTown(responseContent.townname)
    } else {
      mcStates.setlocatedCounty(null)
      mcStates.setlocatedTown(null)
    }
  }

  const handleFormSubmit = async () => {
    mcStates.setpending(true)
    mcStates.setfilteredResults(null)
    if (mcStates.assetTypeCode === null) {
      mcStates.setmsgOpen(true)
      mcStates.seterrorTitle('警告')
      mcStates.seterrorContent('請輸入資產類別')
      mcStates.setpending(false)
      return
    }
    if (
      mcStates.minPrice &&
      mcStates.maxPrice &&
      mcStates.minPrice > mcStates.maxPrice
    ) {
      mcStates.setmsgOpen(true)
      mcStates.seterrorTitle('錯誤')
      mcStates.seterrorContent('價格上限不能低於下限')
      mcStates.setpending(false)
      return
    }
    if (
      mcStates.minUnitPrice
      && mcStates.maxUnitPrice
      && mcStates.minUnitPrice > mcStates.maxUnitPrice
    ) {
      mcStates.setmsgOpen(true)
      mcStates.seterrorTitle('錯誤')
      mcStates.seterrorContent('價格上限不能低於下限')
      mcStates.setpending(false)
      return
    }
    // alert(spatialQueryType)
    const params: IMarketCompare = {
      assetType: mcStates.assetTypeCode,
      buildingType: mcStates.buildingTypeCode
    }
    if (
      mcStates.longitude !== undefined &&
      mcStates.latitude !== undefined &&
      mcStates.bufferRadius !== null &&
      mcStates.spatialQueryType === 'buffer'
    ) {
      params.longitude = mcStates.longitude
      params.latitude = mcStates.latitude
      params.bufferRadius = mcStates.bufferRadius
    } else if (
      mcStates.polygonGoejson !== null &&
      mcStates.spatialQueryType !== 'clear' &&
      mcStates.spatialQueryType !== 'buffer'
    ) {
      params.geojson = mcStates.polygonGoejson
    } else if (mcStates.sketchMode === 'county') {
      params.county = mcStates.county!
      params.town = mcStates.towns.join(',')
    } else {
      mcStates.setmsgOpen(true)
      mcStates.seterrorTitle('警告')
      mcStates.seterrorContent('至少選擇一種空間查詢方法，並輸入參數。')
      mcStates.setpending(false)
      return
    }

    if (mcStates.isTransactionTimeFiltered && mcStates.transactiontime) {
      const dateNow = new Date()
      params.transactionTimeStart = moment(dateNow).add(-mcStates.transactiontime, 'year').format('YYYY/MM/DD')
      params.transactionTimeEnd = moment(dateNow).format('YYYY/MM/DD')
    }
    if (mcStates.isBuildingAreaFiltered && mcStates.buildingTransferArea !== null) {
      if (mcStates.buildingTransferArea === 0) {
        params.buildingAreaStart = 0
        params.buildingAreaEnd = 25 * square
      } else if (mcStates.buildingTransferArea === 1) {
        params.buildingAreaStart = 25 * square
        params.buildingAreaEnd = 50 * square
      } else if (mcStates.buildingTransferArea === 2) {
        params.buildingAreaStart = 50 * square
        params.buildingAreaEnd = 80 * square
      } else if (mcStates.buildingTransferArea === 3) {
        params.buildingAreaStart = 80 * square
        params.buildingAreaEnd = 10000 * square
      }
    }
    if (mcStates.isLandAreaFiltered && mcStates.landTransferArea !== null) {
      if (mcStates.landTransferArea === 0) {
        params.landAreaStart = 0
        params.landAreaEnd = 50 * square
      } else if (mcStates.landTransferArea === 1) {
        params.landAreaStart = 50 * square
        params.landAreaEnd = 200 * square
      } else if (mcStates.landTransferArea === 2) {
        params.landAreaStart = 200 * square
        params.landAreaEnd = 100000 * square
      }
    }
    if (mcStates.isAgeFiltered && mcStates.age !== null) {
      if (mcStates.age === 0) {
        params.ageStart = 0
        params.ageEnd = 5
      } else if (mcStates.age === 1) {
        params.ageStart = 5
        params.ageEnd = 10
      } else if (mcStates.age === 2) {
        params.ageStart = 10
        params.ageEnd = 20
      } else if (mcStates.age === 3) {
        params.ageStart = 20
        params.ageEnd = 30
      } else if (mcStates.age === 4) {
        params.ageStart = 30
        params.ageEnd = 500
      }
    }
    if (mcStates.isParkSpaceFiltered && mcStates.parkSpaceType) {
      params.parkingSpaceType = mcStates.parkSpaceType
    }
    if (mcStates.isUrbanUsageFiltered && mcStates.urbanLandUse) {
      params.urbanLandUse = mcStates.urbanLandUse
    }
    if (mcStates.isPriceFiltered) {
      params.minPrice = mcStates.minPrice
      params.maxPrice = mcStates.maxPrice
    }
    if (mcStates.isUnitPriceFiltered) {
      params.minUnitPrice = mcStates.minUnitPrice
      params.maxUnitPrice = mcStates.maxUnitPrice
    }

    const { statusCode, responseContent } = await api.prod.marketCompare(params, userInfo.token)
    if (statusCode === 200) {
      console.log(responseContent)
      mcStates.setfilteredResults(responseContent)
      const { statusCode, responseContent2 } = await api.prod.marketCompareStatistic(params, userInfo.token)
      if (statusCode === 200) {
        mcStates.setgraphData(responseContent2)
        mcStates.setpending(false)
        mcStates.setqueryPanelShow(false)
        mcStates.setresultPanelShow(true)
      } else {
        mcStates.setmsgOpen(true)
        mcStates.seterrorTitle('錯誤')
        mcStates.seterrorContent('伺服器錯誤，統計圖表資料請求失敗，請聯繫開發人員')
        mcStates.setpending(false)
      }
    } else {
      mcStates.setfilteredResults(null)
      mcStates.setmsgOpen(true)
      mcStates.seterrorTitle('錯誤')
      mcStates.seterrorContent('伺服器錯誤，查詢失敗，請聯繫開發人員')
      mcStates.setpending(false)
    }
  }

  const handleShowQueryPanel = () => {
    mcStates.setqueryPanelShow(prev => !prev)
    mcStates.setresultPanelShow(false)
  }

  const handleShowResultPanel = () => {
    mcStates.setresultPanelShow(prev => !prev)
    mcStates.setqueryPanelShow(false)
  }

  const handleGetCommiteeByAprId = async (id: string) => {
    const { statusCode, responseContent } = await api.prod.getCommiteeByAprId(id)
    if (statusCode === 200) {
      return responseContent.organization
    }
    return undefined
  }

  const handleErrorDialogClose = () => {
    mcStates.setmsgOpen(false)
    mcStates.seterrorTitle('')
    mcStates.seterrorContent('')
  }

  const reFetchTownData = async (county: string) => {
    const { statusCode, responseContent2 } = await api.prod.listTownsByCounty(county)
    if (statusCode === 200) {
      mcStates.settowns([responseContent2['鄉鎮市區'][0].name])
      mcStates.settownData(responseContent2)
    }
  }

  useEffect(() => {
    if (mcStates.filteredResults?.length === 0) {
      mcStates.setmsgOpen(true)
      mcStates.seterrorTitle('訊息')
      mcStates.seterrorContent('查無資料')
    }
  }, [mcStates.filteredResults])

  useEffect(() => {
    (async () => {
      if (mcStates.filteredResults == null) return
      if (mcStates.filteredResults.length === 0) return
      const detailApr = mcStates.filteredResults.filter(apr => apr.id === mcStates.detailAprId.id)
      if (detailApr.length === 0) {
        mcStates.setdetailPanelShow(false)
        mcStates.setmsgOpen(true)
        mcStates.seterrorTitle('訊息')
        mcStates.seterrorContent(`查無 ${mcStates.detailAprId.id} 的詳細資訊，請聯繫開發人員。`)
        return
      }
      const commiteeName = await handleGetCommiteeByAprId(mcStates.detailAprId.id)
      const response = await trigger({
        id: mcStates.detailAprId.id
      })
      console.log(response.data)
      mcStates.setassetDetail(response.data)
      mcStates.setdetailPanelShow(true)
      mcStates.setdetailAprInfo({
        ...detailApr[0],
        organization: commiteeName ? commiteeName : '無管委會',
        assetsDetail: response.data
      })
    })()
  }, [mcStates.detailAprId])

  useEffect(() => {
    const fetchDefaultCountyData = async () => {
      const { statusCode, responseContent } = await api.prod.listCountiesByRegion()
      if (statusCode === 200) {
        mcStates.setcountyData(responseContent)
        mcStates.setcounty(responseContent['北部'][0].name)
        const { statusCode, responseContent2 } = await api.prod.listTownsByCounty(responseContent['北部'][0].name)
        if (statusCode === 200) {
          mcStates.settownData(responseContent2)
          mcStates.settowns([responseContent2['鄉鎮市區'][0].name])
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
          queryPanelShow: mcStates.queryPanelShow,
          resultPanelShow: mcStates.resultPanelShow,
          longitude: mcStates.longitude!,
          latitude: mcStates.latitude!,
          locatedCounty: mcStates.locatedCounty!,
          locatedTown: mcStates.locatedTown!,
          isSelectorActive: mcStates.isSelectorActive,
          isTransactionTimeFiltered: mcStates.isTransactionTimeFiltered,
          isBuildingAreaFiltered: mcStates.isBuildingAreaFiltered,
          isLandAreaFiltered: mcStates.isLandAreaFiltered,
          isAgeFiltered: mcStates.isAgeFiltered,
          isParkSpaceFiltered: mcStates.isParkSpaceFiltered,
          isUrbanUsageFiltered: mcStates.isUrbanUsageFiltered,
          isPriceFiltered: mcStates.isPriceFiltered,
          isUnitPriceFiltered: mcStates.isUnitPriceFiltered,
          isTransactionTimeFosced: mcStates.isTransactionTimeFosced,
          isBuildingAreaFosced: mcStates.isBuildingAreaFosced,
          isLandAreaFosced: mcStates.isLandAreaFosced,
          isAgeFosced: mcStates.isAgeFosced,
          isParkSpaceFosced: mcStates.isParkSpaceFosced,
          isUrbanUsageFosced: mcStates.isUrbanUsageFosced,
          isPriceFocused: mcStates.isPriceFocused,
          isUnitPriceFocused: mcStates.isUnitPriceFocused,
          isBuildingAreaCheckable: mcStates.isBuildingAreaCheckable,
          isLandAreaCheckable: mcStates.isLandAreaCheckable,
          assetTypeCode: mcStates.assetTypeCode,
          buildingTypeCode: mcStates.buildingTypeCode,
          bufferRadius: mcStates.bufferRadius,
          transactiontime: mcStates.transactiontime!,
          buildingTransferArea: mcStates.buildingTransferArea!,
          landTransferArea: mcStates.landTransferArea!,
          age: mcStates.age!,
          parkSpaceType: mcStates.parkSpaceType!,
          urbanLandUse: mcStates.urbanLandUse!,
          polygonGoejson: mcStates.polygonGoejson!,
          minPrice: mcStates.minPrice,
          maxPrice: mcStates.maxPrice,
          minUnitPrice: mcStates.minUnitPrice,
          maxUnitPrice: mcStates.maxUnitPrice,
          filteredResults: mcStates.filteredResults!,
          spatialQueryType: mcStates.spatialQueryType,
          sketchMode: mcStates.sketchMode,
          graphData: mcStates.graphData,
          county: mcStates.county,
          towns: mcStates.towns,
          countyData: mcStates.countyData,
          townData: mcStates.townData,
          uploadPanelOpen: mcStates.uploadPanelOpen,
          onUploadClick: (value) => { mcStates.setuploadPanelOpen(value) },
          onCoordinatorSelectorClick: (value) => { mcStates.setisCoordinateSelectorActive(value) },
          onSpatialQueryTypeChange: mcStates.setspatialQueryType,
          onBufferRadiusChange: (value) => { mcStates.setbufferRadius(value) },
          onSketchModeChange: (value) => { mcStates.setsketchMode(value) },
          onDraw: () => { mcStates.setsketchMode('draw') },
          onClear: () => { mcStates.setspatialQueryType('clear') },
          onAssetTypeChange: (value) => { mcStates.setassetTypeCode(value) },
          onBuildingTypeChange: (value) => { mcStates.setbuildingTypeCode(value) },
          onTransactionTimeFilteredChange: () => {
            mcStates.setisTransactionTimeFiltered(prev => !prev)
            mcStates.settransactionTime(1)
          },
          onTransactionTimeSelect: (value) => {
            mcStates.settransactionTime(value)
            mcStates.setisTransactionTimeFosced(true)
          },
          onBuildingAreaFilteredChange: () => {
            mcStates.setisBuildingAreaFiltered(prev => !prev)
            mcStates.setbuildingTransferArea(0)
          },
          onBuildingAreaSelect: (value) => {
            mcStates.setbuildingTransferArea(value)
            mcStates.setisBuildingAreaFosced(true)
          },
          onLandAreaFilteredChange: () => {
            mcStates.setisLandAreaFiltered(prev => !prev)
            mcStates.setlandTransferArea(0)
          },
          onLandAreaSelect: (value) => {
            mcStates.setlandTransferArea(value)
            mcStates.setisLandAreaFosced(true)
          },
          onAgeFilteredChange: () => {
            mcStates.setisAgeFiltered(prev => !prev)
            mcStates.setage(0)
          },
          onAgeSelect: (value) => {
            mcStates.setage(value)
            mcStates.setisAgeFosced(true)
          },
          onParkSpaceTypeFilteredChange: () => {
            mcStates.setisParkSpaceFiltered(prev => !prev)
            mcStates.setparkSpaceType(0)
          },
          onParkSpaceTypeSelect: (value) => {
            mcStates.setparkSpaceType(value)
            mcStates.setisParkSpaceFosced(true)
          },
          onUrbanLaudUseFilteredChange: () => {
            mcStates.setisUrbanUsageFiltered(prev => !prev)
            mcStates.seturbanLandUse([0])
          },
          onUrbanLaudUseSelect: (value) => {
            mcStates.seturbanLandUse(value)
            mcStates.setisUrbanUsageFosced(true)
          },
          onPriceFilteredChange: () => {
            mcStates.setisPriceFiltered(prev => !prev)
          },
          onMinPriceChange: (value) => {
            mcStates.setminPrice(value)
          },
          onMaxPriceChange: (value) => {
            mcStates.setmaxPrice(value)
          },

          onUnitPriceFilteredChange: () => {
            mcStates.setisUnitPriceFiltered(prev => !prev)
          },
          onMinUnitPriceChange: (value) => {
            mcStates.setminUnitPrice(value)
          },
          onMaxUnitPriceChange: (value) => {
            mcStates.setmaxUnitPrice(value)
          },
          onCustomizeParamBtnClick: () => {
            mcStates.setmsgOpen(true)
            mcStates.seterrorTitle('訊息')
            mcStates.seterrorContent('自定義參數功能尚未開發')
          },
          handleFormSubmit: handleFormSubmit,
          zoomId: mcStates.zoomId,
          pending: mcStates.pending,
          onZoomIdChange: (value) => { mcStates.setzoomId(value) },
          setpending: (value) => { mcStates.setpending(value) },
          onDetailAprChange: (id) => { mcStates.setdetailAprId({ id: id }) },
          onShow: (value) => { mcStates.setdetailPanelShow(value) },
          onResultPanelClose: () => { mcStates.setfilteredResults(null) },
          onCountyRadioClick: () => {
            mcStates.setmsgOpen(true)
            mcStates.seterrorTitle('警告')
            mcStates.seterrorContent('此方法會調出大量資料，請謹慎使用。')
          },
          onCountyChange: (county) => {
            mcStates.setcounty(county)
            reFetchTownData(county)
          },
          onTownChange: (towns) => {
            mcStates.settowns(towns)
          },
          handleCoordinateSelect: (longitude, latitude) => {
            if (longitude)
              mcStates.setlongitude(longitude)
            if (latitude)
              mcStates.setlatitude(latitude)
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
              icon={mcStates.queryPanelShow || mcStates.queryPanelHover ? '/marketCompare/magnifier-focused.png' : '/marketCompare/magnifier.png'}
              focused={mcStates.queryPanelShow}
              onClick={handleShowQueryPanel}
              onHover={(value) => { mcStates.setqueryPanelHover(value) }}
            />
            <PanelButton
              content='結果'
              icon={mcStates.resultPanelShow || mcStates.resultPanelHover ? '/marketCompare/sheet-focused.png' : '/marketCompare/sheet.png'}
              focused={mcStates.resultPanelShow}
              onClick={handleShowResultPanel}
              onHover={(value) => { mcStates.setresultPanelHover(value) }}
            />
          </PanelContainer>
          <QueryPanel />
          <ResultPanel />
          <div className={style.content}>
            <div className={style.mapContainer}>
              <MarketMapContainer
                onCoordinateSelect={handleCoordinateSelect}
                onSketchModeChange={mcStates.setsketchMode}
                onGeojsonChange={mcStates.setpolygonGoejson}
                onSpatialQueryTypeChange={mcStates.setspatialQueryType}
              />
            </div>
          </div>
        </div>
      </MarketCompareContext.Provider>
      <Dialog
        open={mcStates.msgOpen}
        onClose={handleErrorDialogClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {mcStates.errorTitle}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {mcStates.errorContent}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleErrorDialogClose}>
            確認
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={mcStates.detailPanelShow}
        onClose={() => {
          mcStates.setdetailPanelShow(false)
        }}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title"
          sx={{ paddingBottom: '0px' }}
        >
          {mcStates.detailAprInfo && mcStates.detailAprInfo.address}
        </DialogTitle>

        <DialogContent sx={{ width: '900px' }}>
          {
            mcStates.detailAprInfo && <AprDetailContent
              {...mcStates.detailAprInfo}
            />
          }
        </DialogContent>

        <DialogActions>
          <Button onClick={() => {
            mcStates.setdetailPanelShow(false)
          }}>
            確認
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default WithNavProtected(MarketCompareContainer)
