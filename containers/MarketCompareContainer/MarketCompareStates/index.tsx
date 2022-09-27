import { useState } from 'react'
import { PolygonSketchMode } from '../../../components/PolygonSketch'
import { AssetType, IGraphData, ICountyData, ITownData } from '../../../api/prod'
import { IMarketCompareResult } from '../../../api/prod'
import { SpatialQueryType } from '..'
import { IDetailAprInfo } from '../AprDetailContent'
import { AssetDetailResponse } from '../../../store/services/types/apr'

const useMarketCompareStates = () => {
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
  const [isPriceFocused] = useState<boolean>(false)
  const [isUnitPriceFocused] = useState<boolean>(false)
  const [isBuildingAreaCheckable] = useState<boolean>(true)
  const [isLandAreaCheckable] = useState<boolean>(true)
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
  const [assetsDetail, setassetDetail] = useState<AssetDetailResponse | undefined>(undefined)
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
    assetsDetail, setassetDetail
  }
}

export default useMarketCompareStates
