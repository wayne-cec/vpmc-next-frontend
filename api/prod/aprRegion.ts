import axios from 'axios'

export interface IAprRegionGraphDisplayData {
  [key: string]: {
    [key: string]: IResult[] | IResultStatistics
  }
}

export interface IResult {
  buildingType: number
  priceWithoutParking: number
  unitPrice: number
  completiontime?: string
  transactiontime: string
  age: number
}

export interface IResultStatistics {
  priceWithoutParking_MEAN: number
  unitPrice_MEAN: number
  age_MEAN: number
  count: number
}

export interface ICountyData {
  [key: string]: { name: string, marked: boolean }[]
}

export interface ITownData {
  [key: string]: { name: string, marked: boolean }[]
}

export const getTownInfo = async (county: string, town: string) => {
  const response = await axios.request({
    method: "get",
    url: process.env.API_DOMAIN_PROD + `/api/Apr/getTownInfo?county=${county}&town=${town}`,
    onDownloadProgress (progressEvent) {
      let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      console.log(progressEvent.lengthComputable)
      console.log(percentCompleted);
    }
  })
  const statusCode = response.status
  const responseContent = response.data as {
    [key: string]: {
      [key: string]: IResult[] | IResultStatistics
    }
  }
  return { statusCode, responseContent }
}
