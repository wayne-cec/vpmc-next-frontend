import axios from "axios"

export interface ITGOSGeoFromAddress {
  oAPPId?: string
  oAPIKey?: string
  oAddress: string
  oSRS?: string
  oFuzzyType?: string
  oResultDataType?: string
  oFuzzyBuffer?: string
  oIsOnlyFullMatch?: string
  oIsLockCounty?: string
  oIsLockTown?: string
  oIsLockVillage?: string
  oIsLockRoadSection?: string
  oIsLockLane?: string
  oIsLockAlley?: string
  oIsLockArea?: string
  oIsSameNumber_SubNumber?: string
  oCanIgnoreVillage?: string
  oCanIgnoreNeighborhood?: string
  oReturnMaxCount?: string
}

export const getGeoinfoFromAddr = async (payload: ITGOSGeoFromAddress) => {
  let url = 'https://addr.tgos.tw/addrws/v30/QueryAddr.asmx/QueryAddr'
  let defaultPayload = {
    oAPPId: "KUELVYPeym2WwQ/0/HegdG3SAC3+KlK/czjeAeDNoOhGlKMYXiwF2w==",
    oAPIKey: "cGEErDNy5yNr14zbsE/4GSfiGP5i3PuZV86ivQhFbPPOjUQyVRvWeDwZ2P+l7QtVuX0D5JwdyKFoY0wlnh3vgviaOvHKSW6+aKkWncRUaAvXwFT6lgNQGrNUMk8yQnZh5xBSfQy5wu06OF8ZDRWbo9IH5KiRf8bbZeup6dXH87K+Hpxf8xDiRiuCCOf+2sLgwX/YA6pCE+yp7eGrdqaM1LVy6nO2rF+cm0/e7/BCtkyQkE+RY+Vum8MEdPmuRXuCgvafAsI/6kgCyrlIGL68JSJcy459+XvS8qGn6+0XjLwHHs8rb09JjXCEfSuI2hPzzh4yXEY5KK9Yc+5H9JuY9B8Ts/kXd6+BSko2w86Aht4JbO6vP+M8KA==",
    oAddress: '',
    oSRS: 'EPSG:4326',
    oFuzzyType: "0",
    oResultDataType: "JSON",
    oFuzzyBuffer: "0",
    oIsOnlyFullMatch: "false",
    oIsLockCounty: "false",
    oIsLockTown: "false",
    oIsLockVillage: "false",
    oIsLockRoadSection: "false",
    oIsLockLane: "false",
    oIsLockAlley: "false",
    oIsLockArea: "false",
    oIsSameNumber_SubNumber: "false",
    oCanIgnoreVillage: "false",
    oCanIgnoreNeighborhood: "false",
    oReturnMaxCount: "0"
  }
  let params = { ...defaultPayload, ...payload }
  let headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  }
  let searchParam = new URLSearchParams(params)
  try {
    // let resp = await axios.get(url, {params, headers} )
    let resp = await axios.post(url, searchParam.toString(), { headers })
    const parser = new DOMParser()
    const root = parser.parseFromString(resp.data, "text/xml")
    const result = root.querySelector("string")?.innerHTML
    if (!result) throw new Error('empty')
    return JSON.parse(result)
  }
  catch (err) {
    return Promise.reject(err)
  }
}