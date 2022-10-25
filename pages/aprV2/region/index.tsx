import type { NextPage } from 'next'
import style from './index.module.scss'
import Drawer from '../../../components/Drawer'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import CountySelector from '../../../components/CountySelector'
import TownSelector from '../../../components/TownSelector'
import Image from 'next/image'
import api from '../../../api'
import TabsPanel from '../../../components/TabsPanel'
import { useEffect, useState } from 'react'
import classNames from 'classnames'
import { ICountyData, ITownData, IAprRegionGraphDisplayData } from '../../../api/prod'
import WithNavFooterProtected from '../../../Layout/front-layout/WithNavFooterProtected'

const RegionMapContainer = dynamic(
  () => import('../../../components/MapContainer/AprRegionMap'),
  { ssr: false }
)

const countyData: { [key: string]: { name: string, marked: boolean }[] } = {
  "北部": [
    { name: '台北市', marked: true },
    { name: '新北市', marked: true },
    { name: '桃園市', marked: true },
    { name: '新竹市', marked: false },
    { name: '新竹縣', marked: false },
    { name: '宜蘭縣', marked: false },
    { name: '基隆市', marked: false }
  ],
  "中部": [
    { name: '台中市', marked: true },
    { name: '彰化縣', marked: false },
    { name: '雲林縣', marked: false },
    { name: '苗栗縣', marked: false },
    { name: '南投縣', marked: false }
  ],
  "南部": [
    { name: '高雄市', marked: true },
    { name: '台南市', marked: true },
    { name: '嘉義市', marked: false },
    { name: '嘉義縣', marked: false },
    { name: '屏東縣', marked: false }
  ],
  "東部": [
    { name: '台東縣', marked: false },
    { name: '花蓮縣', marked: false },
    { name: '澎湖縣', marked: false },
    { name: '金門縣', marked: false },
    { name: '連江縣', marked: false }
  ]
}

const townData: { [key: string]: { name: string, marked: boolean }[] } = {
  "鄉鎮市區": [
    { name: '林口區', marked: true },
    { name: '新店區', marked: true },
    { name: '板橋區', marked: true },
    { name: '永和區', marked: true },
    { name: '中和區', marked: true },
    { name: '新莊區', marked: true },
    { name: '泰山區', marked: true },
    { name: '蘆洲區', marked: true },
    { name: '萬里區', marked: false },
    { name: '金山區', marked: false },
    { name: '汐止區', marked: false },
    { name: '深坑區', marked: false },
    { name: '石碇區', marked: false },
    { name: '瑞芳區', marked: false },
    { name: '平溪區', marked: false },
    { name: '雙溪區', marked: false },
    { name: '貢寮區', marked: false },
    { name: '坪林區', marked: false },
    { name: '烏來區', marked: false },
    { name: '土城區', marked: false },
    { name: '三峽區', marked: false },
    { name: '樹林區', marked: false },
    { name: '鶯歌區', marked: false },
    { name: '三重區', marked: false },
    { name: '五股區', marked: false },
    { name: '八里區', marked: false },
    { name: '淡水區', marked: false },
    { name: '三芝區', marked: false },
    { name: '石門區', marked: false }
  ]
}

const AprRegion: NextPage = () => {
  const [townGeojson, settownGeojson] = useState<any | null>(null)
  const [county, setcounty] = useState<string | null>(null)
  const [town, settown] = useState<string | undefined>(undefined)
  const [displayData, setdisplayData] = useState<IAprRegionGraphDisplayData | null>(null)
  const [countyData, setcountyData] = useState<ICountyData | null>(null)
  const [townData, settownData] = useState<ITownData | null>(null)

  const handleFetchTownGeography = async () => {
    const { statusCode, responseContent } = await api.prod.getVillageGeographyByTown(
      county!,
      town!
    )
    if (statusCode === 200) {
      settownGeojson(responseContent)
    }
  }

  const handleSearch = async () => {
    const { statusCode, responseContent } = await api.prod.getTownInfo(county!, town!)
    if (statusCode === 200) {
      setdisplayData(responseContent)
      await handleFetchTownGeography()
    }
  }

  const reFetchTownData = async (county: string) => {
    const { statusCode, responseContent2 } = await api.prod.listTownsByCounty(county)
    if (statusCode === 200) {
      settownData(responseContent2)
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
    <>
      <Head>
        <title>VPMC | 實價登錄資訊平台</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/yuantai.ico" />
      </Head>
      <div className={style.main}>

        <div className={classNames({
          [style.panel]: true,
          'animate__animated': true,
          'animate__backInLeft': true
        })}>

          <div className={style.filterGroup}>

            <CountySelector
              countyData={countyData!}
              selectedCounty={county}
              onCountyChange={(county) => {
                setcounty(county)
                reFetchTownData(county)
              }}
            />

            <TownSelector
              townData={townData!}
              selectedTown={town}
              onTownChange={(town) => {
                settown(town)
              }}
            />

            <div className={style.searchBtn}
              onClick={() => {
                handleSearch()
              }}
            >
              <Image src={'/aprRegion/search.png'} width='30px' height='30px' />
              <p>查詢</p>
            </div>
          </div>

          <div className={style.graphGroup}>
            {
              displayData
                ? <TabsPanel
                  displayData={displayData}
                ></TabsPanel>
                : <></>
            }
          </div>

        </div>

        <div className={style.content}>
          <div className={style.mapContainer}>
            <RegionMapContainer
              townGeojson={townGeojson}
              basemap='gray'
            />
          </div>
        </div>

      </div>
    </>
  )
}

export default WithNavFooterProtected(AprRegion)
