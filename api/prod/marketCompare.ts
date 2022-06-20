import { IResult, IResultStatistics } from "./aprRegion"

export interface IMarketCompareResult {
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
}

export interface IGraphData {
  [key: string]: {
    [key: string]: IResult[] | IResultStatistics
  }
}

export const marketCompare = async (params: IMarketCompare) => {
  let url = process.env.API_DOMAIN_PROD + `/api/Analysis/marketCompare?buildingType=${params.buildingType}`
  if (params.longitude && params.latitude && params.bufferRadius) {
    url += `&longitude=${params.longitude}&latitude=${params.latitude}&bufferRadius=${params.bufferRadius}`
  }
  if (params.geojson) {
    url += `&geojson=${params.geojson}`
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
  if (params.longitude && params.latitude && params.bufferRadius) {
    url += `&longitude=${params.longitude}&latitude=${params.latitude}&bufferRadius=${params.bufferRadius}`
  }
  if (params.geojson) {
    url += `&geojson=${params.geojson}`
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

  const response = await fetch(url, {
    method: 'GET',
    redirect: 'follow'
  })
  const statusCode = response.status
  const responseContent2 = await response.json() as IGraphData
  return { statusCode, responseContent2 }
}
