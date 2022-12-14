import { createContext } from 'react'
import { AssetType, ICountyData, IGraphData, IMarketCompareResult, ITownData } from '../../../api/prod'
import { SpatialQueryType } from '..'
import { PolygonSketchMode } from '../../../components/PolygonSketch'

export interface IMarketCompareContext {
  queryPanelShow: boolean
  resultPanelShow: boolean
  longitude?: number
  latitude?: number
  locatedCounty: string | null
  locatedTown: string | null
  isSelectorActive: boolean
  isTransactionTimeFiltered: boolean
  isBuildingAreaFiltered: boolean
  isLandAreaFiltered: boolean
  isAgeFiltered: boolean
  isParkSpaceFiltered: boolean
  isUrbanUsageFiltered: boolean
  isPriceFiltered: boolean
  isUnitPriceFiltered: boolean
  isTransactionTimeFosced: boolean
  isBuildingAreaFosced: boolean
  isLandAreaFosced: boolean
  isAgeFosced: boolean
  isParkSpaceFosced: boolean
  isUrbanUsageFosced: boolean
  isPriceFocused: boolean
  isUnitPriceFocused: boolean
  isBuildingAreaCheckable: boolean
  isLandAreaCheckable: boolean
  assetTypeCode: AssetType
  buildingTypeCode: number
  bufferRadius: number
  transactiontime: number | null
  transactiontimeend: number
  buildingTransferArea: number | null
  landTransferArea: number | null
  age: number | null
  parkSpaceType: number | null
  urbanLandUse: number[] | undefined
  polygonGoejson: string | null
  minPrice?: number
  maxPrice?: number
  minUnitPrice?: number
  maxUnitPrice?: number
  filteredResults: IMarketCompareResult[] | null
  spatialQueryType: SpatialQueryType
  sketchMode: PolygonSketchMode
  graphData?: IGraphData
  county: string | null
  towns: string[]
  countyData: ICountyData | null
  townData: ITownData | null
  uploadPanelOpen: boolean
  onUploadClick: (value: boolean) => void
  onCoordinatorSelectorClick: (value: boolean) => void // (value) => {setisCoordinateSelectorActive(value)}
  onSpatialQueryTypeChange: (value: SpatialQueryType) => void // setspatialQueryType
  onBufferRadiusChange: (value: number) => void // (value) => { setbufferRadius(value) }
  onSketchModeChange: (value: PolygonSketchMode) => void // (value) => {setsketchMode(value)}
  onDraw: () => void // () => {setsketchMode('draw')}
  onClear: () => void // () => {setsketchMode('inactive')}
  onAssetTypeChange: (value: AssetType) => void // (value) => { setassetTypeCode(value) }
  onBuildingTypeChange: (value: number) => void
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
  onPriceFilteredChange: () => void
  onMinPriceChange: (value: number) => void
  onMaxPriceChange: (value: number) => void
  onUnitPriceFilteredChange: () => void
  onMinUnitPriceChange: (value: number) => void
  onMaxUnitPriceChange: (value: number) => void
  onCustomizeParamBtnClick: () => void //() => {setmsgOpen(true)seterrorTitle('??????')seterrorContent('?????????????????????????????????')}
  handleFormSubmit: () => void
  onResultPanelClose: () => void
  zoomId: { id: string } | null
  pending: boolean
  onZoomIdChange: (value: { id: string } | null) => void
  onPendingChange: (value: boolean) => void
  onDetailAprChange: (id: string) => void
  onShow: (value: boolean) => void
  onCountyRadioClick: () => void
  onCountyChange: (county: string) => void
  onTownChange: (town: string[]) => void
  // ??????
  handleCoordinateSelect: (longitude: number | null, latitude: number | null) => void
  // ????????????
  onCoordinateSelect: (longitude: number | undefined, latitude: number | undefined) => void
  onTransactionTimeCustomize: (startDate: string, endDate: string) => void
  onTransactionTimeCustomizeChange: () => void
  isTransactionTimeCustomize: boolean
  onBuildingAreaCustomize: (min: number, max: number) => void
  onBuildingAreaCustomizeChange: () => void
  isBuildingAreaCustomize: boolean
  onAgeCustomize: (min: number, max: number) => void
  onAgeCustomizeChange: () => void
  isAgeCustomize: boolean
  onLandAreaCustomize: (min: number, max: number) => void
  onLandAreaCustomizeChange: () => void
  isLandAreaCustomize: boolean
  onCustomizePanelOpen: (value: boolean) => void
  transactionTimeStartString: string
  transactionTimeEndString: string
  buildingTransferAreaInterval: number[]
  landAreaInterval: number[]
  ageInterval: number[]
  highlightIds: string[]
  onResultsHightlight: (ids: string[]) => void
}

const MarketCompareContext = createContext<IMarketCompareContext>({
  queryPanelShow: false,
  resultPanelShow: false,
  longitude: undefined,
  latitude: undefined,
  locatedCounty: null,
  locatedTown: null,
  isSelectorActive: false,
  isTransactionTimeFiltered: false,
  isBuildingAreaFiltered: false,
  isLandAreaFiltered: false,
  isAgeFiltered: false,
  isParkSpaceFiltered: false,
  isUrbanUsageFiltered: false,
  isPriceFiltered: false,
  isUnitPriceFiltered: false,
  isTransactionTimeFosced: false,
  isBuildingAreaFosced: false,
  isLandAreaFosced: false,
  isAgeFosced: false,
  isParkSpaceFosced: false,
  isUrbanUsageFosced: false,
  isPriceFocused: false,
  isUnitPriceFocused: false,
  isBuildingAreaCheckable: true,
  isLandAreaCheckable: true,
  assetTypeCode: 'building',
  buildingTypeCode: 0,
  bufferRadius: 300,
  transactiontime: null,
  transactiontimeend: 0,
  buildingTransferArea: null,
  landTransferArea: null,
  age: null,
  parkSpaceType: null,
  urbanLandUse: undefined,
  polygonGoejson: null,
  minPrice: undefined,
  maxPrice: undefined,
  minUnitPrice: undefined,
  maxUnitPrice: undefined,
  filteredResults: [],
  spatialQueryType: 'buffer',
  sketchMode: 'inactive',
  graphData: undefined,
  county: null,
  towns: [],
  countyData: null,
  townData: null,
  uploadPanelOpen: false,
  onUploadClick: (value) => { },
  onCoordinatorSelectorClick: (value: boolean) => { }, // (value) => {setisCoordinateSelectorActive(value)}
  onSpatialQueryTypeChange: (value: SpatialQueryType) => { }, // setspatialQueryType
  onBufferRadiusChange: (value: number) => { }, // (value) => { setbufferRadius(value) }
  onSketchModeChange: (value: PolygonSketchMode) => { }, // (value) => {setsketchMode(value)}
  onDraw: () => { }, // () => {setsketchMode('draw')}
  onClear: () => { }, // () => {setsketchMode('inactive')}
  onAssetTypeChange: (value: AssetType) => { }, // (value) => { setassetTypeCode(value) }
  onBuildingTypeChange: (value: number) => { },
  onTransactionTimeFilteredChange: () => { }, // () => {setisTransactionTimeFiltered(prev => !prev)settransactionTime(1)}
  onTransactionTimeSelect: (value: number) => { }, //(value) => {settransactionTime(value)setisTransactionTimeFosced(true)}
  onBuildingAreaFilteredChange: () => { }, //() => {setisBuildingAreaFiltered(prev => !prev)setbuildingTransferArea(0)}
  onBuildingAreaSelect: (value: number) => { }, //(value) => {setbuildingTransferArea(value)setisBuildingAreaFosced(true)}
  onLandAreaFilteredChange: () => { }, //() => {setisLandAreaFiltered(prev => !prev)setlandTransferArea(0)}
  onLandAreaSelect: (value: number) => { }, //(value) => {setlandTransferArea(value)setisLandAreaFosced(true)}
  onAgeFilteredChange: () => { }, //() => {setisAgeFiltered(prev => !prev)setage(0)}
  onAgeSelect: (value: number) => { }, //(value) => {setage(value)setisAgeFosced(true)}
  onParkSpaceTypeFilteredChange: () => { },
  onParkSpaceTypeSelect: (value: number) => { },
  onUrbanLaudUseFilteredChange: () => { },
  onUrbanLaudUseSelect: (value: number[]) => { },
  onCustomizeParamBtnClick: () => { }, //() => {setmsgOpen(true)seterrorTitle('??????')seterrorContent('?????????????????????????????????')}
  handleFormSubmit: () => { },
  onResultPanelClose: () => { },
  onPriceFilteredChange: () => { },
  onMinPriceChange: (value: number) => { },
  onMaxPriceChange: (value: number) => { },
  onUnitPriceFilteredChange: () => { },
  onMinUnitPriceChange: (value: number) => { },
  onMaxUnitPriceChange: (value: number) => { },
  zoomId: null,
  pending: false,
  onZoomIdChange: (value) => { },
  onPendingChange: (value) => { },
  onDetailAprChange: (id) => { },
  onShow: (value) => { },
  onCountyRadioClick: () => { },
  onCountyChange: (county) => { },
  onTownChange: (town) => { },
  handleCoordinateSelect: () => { },
  onCoordinateSelect: (longitude, latitude) => { },

  onTransactionTimeCustomize: () => { },
  onTransactionTimeCustomizeChange: () => { },
  isTransactionTimeCustomize: false,

  onBuildingAreaCustomize: (min, max) => { },
  onBuildingAreaCustomizeChange: () => { },
  isBuildingAreaCustomize: false,

  onAgeCustomize: (min, max) => { },
  onAgeCustomizeChange: () => { },
  isAgeCustomize: false,

  onLandAreaCustomize: (min, max) => { },
  onLandAreaCustomizeChange: () => { },
  isLandAreaCustomize: false,

  onCustomizePanelOpen: (value) => { },
  transactionTimeStartString: '',
  transactionTimeEndString: '',
  buildingTransferAreaInterval: [],
  landAreaInterval: [],
  ageInterval: [],
  highlightIds: [],
  onResultsHightlight: (value) => { }
})

export default MarketCompareContext
