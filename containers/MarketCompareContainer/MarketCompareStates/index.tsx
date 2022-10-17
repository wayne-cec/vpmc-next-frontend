import { useState } from 'react'
import { PolygonSketchMode } from '../../../components/PolygonSketch'
import { AssetType, IGraphData, ICountyData, ITownData } from '../../../api/prod'
import { IMarketCompareResult } from '../../../api/prod'
import { SpatialQueryType } from '..'
import { IDetailAprInfo } from '../AprDetailContent'
import { AssetDetailResponse } from '../../../store/services/types/apr'
import api from '../../../api'
import { IMarketCompare } from '../../../api/prod'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { selectUser } from '../../../store/slice/user'

const square = 3.305785

const useMarketCompareStates = () => {
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

  const [isTransactionTimeCustomize, setisTransactionTimeCustomize] = useState<boolean>(false)
  const [isBuildingAreaCustomize, setisBuildingAreaCustomize] = useState<boolean>(false)
  const [isLandAreaCustomize, setisLandAreaCustomize] = useState<boolean>(false)
  const [isAgeCustomize, setisAgeCustomize] = useState<boolean>(false)


  const [isTransactionTimeFosced, setisTransactionTimeFosced] = useState<boolean>(false)
  const [isBuildingAreaFosced, setisBuildingAreaFosced] = useState<boolean>(false)
  const [isLandAreaFosced, setisLandAreaFosced] = useState<boolean>(false)
  const [isAgeFosced, setisAgeFosced] = useState<boolean>(false)
  const [isParkSpaceFosced, setisParkSpaceFosced] = useState<boolean>(false)
  const [isUrbanUsageFosced, setisUrbanUsageFosced] = useState<boolean>(false)
  const [isPriceFocused] = useState<boolean>(false)
  const [isUnitPriceFocused] = useState<boolean>(false)

  const [isBuildingAreaCheckable] = useState<boolean>(true)
  const [isLandAreaCheckable] = useState<boolean>(true)
  const [assetTypeCode, setassetTypeCode] = useState<AssetType>('building')
  const [buildingTypeCode, setbuildingTypeCode] = useState<number>(0)
  const [bufferRadius, setbufferRadius] = useState<number>(300)

  const [transactiontime, settransactionTime] = useState<number | null>(null)
  const [transactiontimeend, settransactiontimeend] = useState<number>(0)

  const [buildingTransferArea, setbuildingTransferArea] = useState<number | null>(null)
  const [buildingTransferAreaInterval, setbuildingTransferAreaInterval] = useState<number[]>([0, 100])
  const [landTransferArea, setlandTransferArea] = useState<number | null>(null)
  const [landAreaInterval, setlandAreaInterval] = useState<number[]>([0, 50])
  const [age, setage] = useState<number | null>(null)
  const [ageInterval, setageInterval] = useState<number[]>([0, 10])

  const [parkSpaceType, setparkSpaceType] = useState<number | null>(null)
  const [urbanLandUse, seturbanLandUse] = useState<number[] | undefined>(undefined)
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
  const [assetsDetail, setassetDetail] = useState<AssetDetailResponse | undefined>(undefined)
  const [customizePanelOpen, setcustomizePanelOpen] = useState<boolean>(false)

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
    if (
      minPrice &&
      maxPrice &&
      minPrice > maxPrice
    ) {
      setmsgOpen(true)
      seterrorTitle('錯誤')
      seterrorContent('價格上限不能低於下限')
      setpending(false)
      return
    }
    if (
      minUnitPrice
      && maxUnitPrice
      && minUnitPrice > maxUnitPrice
    ) {
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
    if (
      longitude !== undefined &&
      latitude !== undefined &&
      bufferRadius !== null &&
      spatialQueryType === 'buffer'
    ) {
      params.longitude = longitude
      params.latitude = latitude
      params.bufferRadius = bufferRadius
    } else if (
      polygonGoejson !== null &&
      spatialQueryType !== 'clear' &&
      spatialQueryType !== 'buffer'
    ) {
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

  const handleMapCoordinateSelect = async (longitude: number | undefined, latitude: number | undefined) => {
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

  const onUploadClick = (value: boolean) => {
    setuploadPanelOpen(value)
  }

  const onCoordinatorSelectorClick = (value: boolean) => {
    setisCoordinateSelectorActive(value)
  }

  const onSpatialQueryTypeChange = setspatialQueryType

  const onBufferRadiusChange = (value: number) => {
    setbufferRadius(value)
  }

  const onSketchModeChange = (value: PolygonSketchMode) => {
    setsketchMode(value)
  }

  const onDraw = () => {
    setsketchMode('draw')
  }

  const onClear = () => {
    setspatialQueryType('clear')
  }

  const onAssetTypeChange = (value: AssetType) => {
    setassetTypeCode(value)
  }

  const onBuildingTypeChange = (value: number) => {
    setbuildingTypeCode(value)
  }

  const onTransactionTimeCustomizeChange = () => {
    setisTransactionTimeCustomize(prev => !prev)
  }

  const onTransactionTimeFilteredChange = () => {
    setisTransactionTimeFiltered(prev => !prev)
    settransactionTime(1)
  }

  const onTransactionTimeSelect = (value: number) => {
    settransactionTime(value)
    setisTransactionTimeFosced(true)
  }

  const onTransactionTimeCustomize = (startDate: string, endDate: string) => {
    const dateNow = new Date()
    //   params.transactionTimeStart = moment(dateNow).add(-transactiontime, 'year').format('YYYY/MM/DD')
    //   params.transactionTimeEnd = moment(dateNow).format('YYYY/MM/DD')

    const startDateDelta = moment
      .duration(moment(dateNow, 'YYYY/MM/DD HH:mm')
        .diff(moment(startDate, 'YYYY/MM/DD HH:mm'))
      ).asDays;
    console.log(startDateDelta)
  }

  const onBuildingAreaFilteredChange = () => {
    setisBuildingAreaFiltered(prev => !prev)
    setbuildingTransferArea(0)
  }

  const onBuildingAreaSelect = (value: number) => {
    setbuildingTransferArea(value)
    setisBuildingAreaFosced(true)
  }

  const onBuildingAreaCustomize = (min: number, max: number) => {
    setbuildingTransferAreaInterval([min, max])
  }

  const onBuildingAreaCustomizeChange = () => {
    setisBuildingAreaCustomize(prev => !prev)
  }

  const onLandAreaFilteredChange = () => {
    setisLandAreaFiltered(prev => !prev)
    setlandTransferArea(0)
  }

  const onLandAreaCustomize = (min: number, max: number) => {
    setlandAreaInterval([min, max])
  }

  const onLandAreaCustomizeChange = () => {
    setisLandAreaCustomize(prev => !prev)
  }


  const onLandAreaSelect = (value: number) => {
    setlandTransferArea(value)
    setisLandAreaFosced(true)
  }

  const onAgeFilteredChange = () => {
    setisAgeFiltered(prev => !prev)
    setage(0)
  }

  const onAgeSelect = (value: number) => {
    setage(value)
    setisAgeFosced(true)
  }

  const onAgeCustomize = (min: number, max: number) => {
    setageInterval([min, max])
  }

  const onAgeCustomizeChange = () => {
    setisAgeCustomize(prev => !prev)
  }

  const onParkSpaceTypeFilteredChange = () => {
    setisParkSpaceFiltered(prev => !prev)
    setparkSpaceType(0)
  }

  const onParkSpaceTypeSelect = (value: number) => {
    setparkSpaceType(value)
    setisParkSpaceFosced(true)
  }

  const onUrbanLaudUseFilteredChange = () => {
    setisUrbanUsageFiltered(prev => !prev)
    seturbanLandUse([0])
  }

  const onUrbanLaudUseSelect = (value: number[]) => {
    seturbanLandUse(value)
    setisUrbanUsageFosced(true)
  }

  const onPriceFilteredChange = () => {
    setisPriceFiltered(prev => !prev)
  }

  const onMinPriceChange = (value: number) => {
    setminPrice(value)
  }

  const onMaxPriceChange = (value: number) => {
    setmaxPrice(value)
  }

  const onUnitPriceFilteredChange = () => {
    setisUnitPriceFiltered(prev => !prev)
  }

  const onMinUnitPriceChange = (value: number) => {
    setminUnitPrice(value)
  }

  const onMaxUnitPriceChange = (value: number) => {
    setmaxUnitPrice(value)
  }

  const onCustomizeParamBtnClick = () => {
    setcustomizePanelOpen(true)
  }

  const onZoomIdChange = (value: {
    id: string;
  } | null) => {
    setzoomId(value)
  }

  const onPendingChange = (value: boolean) => {
    setpending(value)
  }

  const onDetailAprChange = (value: string) => {
    setdetailAprId({
      id: value
    })
  }

  const onShow = (value: boolean) => {
    setdetailPanelShow(value)
  }

  const onResultPanelClose = () => {
    setfilteredResults(null)
  }

  const onCountyRadioClick = () => {
    setmsgOpen(true)
    seterrorTitle('警告')
    seterrorContent('此方法會調出大量資料，請謹慎使用。')
  }

  const onCountyChange = (county: string) => {
    setcounty(county)
    reFetchTownData(county)
  }

  const onTownChange = (towns: string[]) => {
    settowns(towns)
  }

  const handleCoordinateSelect = (
    longitude: number | null,
    latitude: number | null
  ) => {
    if (longitude)
      setlongitude(longitude)
    if (latitude)
      setlatitude(latitude)
  }

  const onCoordinateSelect = (
    longitude: number | undefined,
    latitude: number | undefined
  ) => {
    handleMapCoordinateSelect(longitude, latitude)
  }

  const onCustomizePanelOpen = (value: boolean) => {
    setcustomizePanelOpen(value)
  }

  return {
    longitude, setlongitude,
    latitude, setlatitude,
    locatedCounty, setlocatedCounty,
    locatedTown, setlocatedTown,
    isSelectorActive, setisCoordinateSelectorActive,
    isTransactionTimeFiltered, setisTransactionTimeFiltered,
    isBuildingAreaFiltered, setisBuildingAreaFiltered,
    isLandAreaFiltered, setisLandAreaFiltered,
    isAgeFiltered, setisAgeFiltered,
    isParkSpaceFiltered, setisParkSpaceFiltered,
    isUrbanUsageFiltered, setisUrbanUsageFiltered,
    isPriceFiltered, setisPriceFiltered,
    isUnitPriceFiltered, setisUnitPriceFiltered,
    isTransactionTimeFosced, setisTransactionTimeFosced,
    isBuildingAreaFosced, setisBuildingAreaFosced,
    isLandAreaFosced, setisLandAreaFosced,
    isAgeFosced, setisAgeFosced,
    isParkSpaceFosced, setisParkSpaceFosced,
    isUrbanUsageFosced, setisUrbanUsageFosced,
    isPriceFocused,
    isUnitPriceFocused,
    isBuildingAreaCheckable,
    isLandAreaCheckable,
    assetTypeCode, setassetTypeCode,
    buildingTypeCode, setbuildingTypeCode,
    bufferRadius, setbufferRadius,
    transactiontime, settransactionTime,
    buildingTransferArea, setbuildingTransferArea,
    landTransferArea, setlandTransferArea,
    age, setage,
    parkSpaceType, setparkSpaceType,
    urbanLandUse, seturbanLandUse,
    polygonGoejson, setpolygonGoejson,
    minPrice, setminPrice,
    maxPrice, setmaxPrice,
    minUnitPrice, setminUnitPrice,
    maxUnitPrice, setmaxUnitPrice,
    filteredResults, setfilteredResults,
    msgOpen, setmsgOpen,
    errorTitle, seterrorTitle,
    errorContent, seterrorContent,
    graphData, setgraphData,
    spatialQueryType, setspatialQueryType,
    sketchMode, setsketchMode,
    zoomId, setzoomId,
    pending, setpending,
    queryPanelShow, setqueryPanelShow,
    resultPanelShow, setresultPanelShow,
    queryPanelHover, setqueryPanelHover,
    resultPanelHover, setresultPanelHover,
    detailPanelShow, setdetailPanelShow,
    detailAprId, setdetailAprId,
    detailAprInfo, setdetailAprInfo,
    county, setcounty,
    towns, settowns,
    countyData, setcountyData,
    townData, settownData,
    uploadPanelOpen, setuploadPanelOpen,
    assetsDetail, setassetDetail,
    handleMapCoordinateSelect,
    handleFormSubmit,
    handleShowQueryPanel,
    handleShowResultPanel,
    handleGetCommiteeByAprId,
    handleErrorDialogClose,
    reFetchTownData,
    onUploadClick,
    onCoordinatorSelectorClick,
    onSpatialQueryTypeChange,
    onBufferRadiusChange,
    onSketchModeChange,
    onDraw,
    onClear,
    onAssetTypeChange,
    onBuildingTypeChange,
    onTransactionTimeFilteredChange,
    onTransactionTimeSelect,
    onBuildingAreaFilteredChange,
    onBuildingAreaSelect,
    onLandAreaFilteredChange,
    onLandAreaSelect,
    onAgeFilteredChange,
    onAgeSelect,
    onParkSpaceTypeFilteredChange,
    onParkSpaceTypeSelect,
    onUrbanLaudUseFilteredChange,
    onUrbanLaudUseSelect,
    onPriceFilteredChange,
    onMinPriceChange,
    onMaxPriceChange,
    onUnitPriceFilteredChange,
    onMinUnitPriceChange,
    onMaxUnitPriceChange,
    onCustomizeParamBtnClick,
    onZoomIdChange,
    onPendingChange,
    onDetailAprChange,
    onShow,
    onResultPanelClose,
    onCountyRadioClick,
    onCountyChange,
    onTownChange,
    handleCoordinateSelect,
    onCoordinateSelect,
    customizePanelOpen, setcustomizePanelOpen,
    transactiontimeend, settransactiontimeend,


    onTransactionTimeCustomize,
    onTransactionTimeCustomizeChange,
    isTransactionTimeCustomize,

    onBuildingAreaCustomize,
    onBuildingAreaCustomizeChange,
    isBuildingAreaCustomize,

    onAgeCustomize,
    onAgeCustomizeChange,
    isAgeCustomize,

    onLandAreaCustomize,
    onLandAreaCustomizeChange,
    isLandAreaCustomize,

    onCustomizePanelOpen
  }
}

export default useMarketCompareStates
