import { ICountyData, ITownData } from "./aprRegion"

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

export const getVillageGeographyByTown = async (county: string, town: string) => {
  const response = await fetch(`http://140.122.82.98:9085/api/Utility/getVillageGeographyByTown?county=${county}&town=${town}`, {
    method: 'GET',
    redirect: 'follow'
  })
  const statusCode = response.status
  const responseContent = await response.json() as any
  return { statusCode, responseContent }
}

export const getCountyTownNameByCoordinate = async (longitude: number, latitude: number) => {
  const response = await fetch(`http://140.122.82.98:9085/api/Utility/getCountyTownNameByCoordinate?longitude=${longitude}&latitude=${latitude}`, {
    method: 'GET',
    redirect: 'follow'
  })
  const statusCode = response.status
  const responseContent = await response.json() as { countyname: string, townname: string }
  return { statusCode, responseContent }
}
