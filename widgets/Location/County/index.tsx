import React, { useContext, useEffect, useState } from 'react'
import style from './index.module.scss'
import { widgetContext } from '../../WidgetExpand'
import CountySelector from '../../../components/CountySelector'
import TownSelector from '../../../components/TownSelector'
import { ICountyData } from '../../../api/prod'
import { ITownData } from '../../../api/prod'
import api from '../../../api'
import Point from '@arcgis/core/geometry/Point'

const County = () => {
  const { mapView } = useContext(widgetContext)
  const [county, setcounty] = useState<string | null>(null)
  const [town, settown] = useState<string | null>(null)
  const [countyData, setcountyData] = useState<ICountyData | null>(null)
  const [townData, settownData] = useState<ITownData | null>(null)

  const reFetchTownData = async (county: string) => {
    const { statusCode, responseContent2 } = await api.prod.listTownsByCounty(county)
    if (statusCode === 200) {
      settown(responseContent2['鄉鎮市區'][0].name)
      settownData(responseContent2)
    }
  }

  const handleSubmit = async () => {
    const { statusCode, responseContent } = await api.prod.getCoordinateByCountyTownName(county!, town!)
    if (statusCode === 200) {
      mapView?.goTo(new Point({
        longitude: responseContent.longitude,
        latitude: responseContent.latitude
      }))
    }
  }

  useEffect(() => {
    const fetchDefaultCountyData = async () => {
      const { statusCode, responseContent } = await api.prod.listCountiesByRegion()
      if (statusCode === 200) {
        setcountyData(responseContent)
        setcounty(responseContent['北部'][0].name)
        const { statusCode, responseContent2 } = await api.prod.listTownsByCounty(responseContent['北部'][0].name)
        if (statusCode === 200) {
          settownData(responseContent2)
          settown(responseContent2['鄉鎮市區'][0].name)
        }
      }
    }
    fetchDefaultCountyData()
  }, [])

  return (
    <div className={style.countyQuery}>
      <CountySelector
        countyData={countyData!}
        selectedCounty={county}
        offset={true}
        onCountyChange={(county) => {
          setcounty(county)
          reFetchTownData(county)
        }}
      />
      <TownSelector
        townData={townData!}
        selectedTown={town}
        offset={true}
        onTownChange={(town) => {
          settown(town)
        }}
      />
      <div className={style.queryBtn}
        onClick={handleSubmit}
      >
        查詢
      </div>
    </div>
  )
}

export default County
