import axios from 'axios'

export interface IResult {
  buildingType: number
  priceWithoutParking: number
  unitPrice: number
  completionTime?: string
  transactionTime: string
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
    url: `http://140.122.82.98:9085/api/Apr/getTownInfo?county=${county}&town=${town}`,
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

export const listCountiesByRegion = async () => {
  const response = await fetch("http://140.122.82.98:9085/api/Utility/listCountiesByRegion", {
    method: 'GET',
    redirect: 'follow'
  })
  const statusCode = response.status
  const responseContent = await response.json() as ICountyData
  return { statusCode, responseContent }
}

export const listTownsByCounty = async (county: string) => {
  const response = await fetch(`http://140.122.82.98:9085/api/Utility/listTownsByCounty?county=${county}`, {
    method: 'GET',
    redirect: 'follow'
  })
  const statusCode = response.status
  const responseContent2 = await response.json() as ITownData
  return { statusCode, responseContent2 }
}
