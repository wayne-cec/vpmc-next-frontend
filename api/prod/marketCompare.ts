import { IResult, IResultStatistics } from "./aprRegion"

export interface IMarketCompareResult {
  id: string
  transactiontime: string
  completiontime: string
  transferFloor: number
  unitPrice: number
  priceWithoutParking: number
  roomNumber: number
  hallNumber: number
  bathNumber: number
  buildingTransferArea: number
  parkingSpacePrice: number
  parkingSpaceTransferArea: number
  price: number
  landAmount: number
  buildingAmount: number
  parkAmount: number
  buildingType: number
  floor: number
  urbanLandUse: number
  buildingArea: number
  subBuildingArea: number
  belconyArea: number
  landTransferArea: number
  parkingSpaceType: number
  longitude: number
  latitude: number
}

export interface IMarketCompare {
  buildingType: number
  longitude?: number
  latitude?: number
  bufferRadius?: number
  geojson?: string
  transactionTimeStart?: string
  transactionTimeEnd?: string
  buildingAreaStart?: number
  buildingAreaEnd?: number
  landAreaStart?: number
  landAreaEnd?: number
  ageStart?: number
  ageEnd?: number
  parkingSpaceType?: number
  urbanLandUse?: number[]
  county?: string
  town?: string
  minPrice?: number
  maxPrice?: number
  minUnitPrice?: number
  maxUnitPrice?: number
}

export interface IGraphData {
  [key: string]: {
    [key: string]: IResult[] | IResultStatistics
  }
}

export const assetTypeMapping: { [key: number]: number } = {
  0: 0,
  1: 100,
  2: 200,
  3: 1,
  4: 3,
  5: 4,
  6: 5,
  7: 6,
  8: 7,
  9: 8,
  10: 9,
  11: 10,
  12: 11,
  13: 2
}

const buildMarketCompareUrl = (url: string, params: IMarketCompare): string => {
  if (params.longitude && params.latitude && params.bufferRadius) {
    url += `&longitude=${params.longitude}&latitude=${params.latitude}&bufferRadius=${params.bufferRadius}`
  }
  if (params.geojson) {
    url += `&geojson=${params.geojson}`
  }
  if (params.county && params.town) {
    url += `&county=${params.county}&town=${params.town}`
  }
  if (params.transactionTimeStart && params.transactionTimeEnd) {
    url += `&transactionTimeStart=${params.transactionTimeStart}&transactionTimeEnd=${params.transactionTimeEnd}`
  }
  if (params.buildingAreaStart !== undefined && params.buildingAreaEnd) {
    url += `&buildingAreaStart=${params.buildingAreaStart}&buildingAreaEnd=${params.buildingAreaEnd}`
  }
  if (params.landAreaStart !== undefined && params.landAreaEnd) {
    url += `&landAreaStart=${params.landAreaStart}&landAreaEnd=${params.landAreaEnd}`
  }
  if (params.ageStart !== undefined && params.ageEnd) {
    url += `&ageStart=${params.ageStart}&ageEnd=${params.ageEnd}`
  }
  if (params.parkingSpaceType) {
    url += `&parkingSpaceType=${params.parkingSpaceType}`
  }
  if (params.urbanLandUse) {
    url += `&urbanLandUse=${params.urbanLandUse.join(',')}`
  }
  if (params.minPrice && params.maxPrice) {
    url += `&minPrice=${params.minPrice}&maxPrice=${params.maxPrice}`
  }
  if (params.minUnitPrice && params.maxUnitPrice) {
    url += `&minUnitPrice=${params.minUnitPrice}&maxUnitPrice=${params.maxUnitPrice}`
  }
  return url
}

export const marketCompare = async (params: IMarketCompare) => {
  let url = process.env.API_DOMAIN_PROD + `/api/Analysis/marketCompare?buildingType=${assetTypeMapping[params.buildingType]}`
  url = buildMarketCompareUrl(url, params)
  const response = await fetch(url, {
    method: 'GET',
    redirect: 'follow'
  })
  const statusCode = response.status
  const responseContent = await response.json() as IMarketCompareResult[]
  return { statusCode, responseContent }
}

export const marketCompareStatistic = async (params: IMarketCompare) => {
  let url = process.env.API_DOMAIN_PROD + `/api/Analysis/marketCompareStatistic?buildingType=${params.buildingType}`
  url = buildMarketCompareUrl(url, params)
  const response = await fetch(url, {
    method: 'GET',
    redirect: 'follow'
  })
  const statusCode = response.status
  const responseContent2 = await response.json() as IGraphData
  return { statusCode, responseContent2 }
}
