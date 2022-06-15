import type { NextPage } from 'next'
import style from './index.module.scss'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import classNames from 'classnames'
import Image from 'next/image'
import CoordinateSelector from '../../../components/CoordinateSelector'
import { useState } from 'react'
import {
  TextField, Select,
  MenuItem, InputLabel, FormControl,
  Checkbox, makeStyles, Grid
} from '@mui/material'
import {
  assetTypeSet, transactionTimeSet, buildingTransactionAreaSet,
  landTransactionAreaSet, ageSet, parkSpaceSet, urbanUsageSet
} from '../../../lib/marketComapreConst'
import api from '../../../api'

const MarketMapContainer = dynamic(
  () => import('../../../components/MapContainer/MarketCompareMap'),
  { ssr: false }
)

const AprRegion: NextPage = () => {
  const [longitude, setlongitude] = useState<number | null>(null)
  const [latitude, setlatitude] = useState<number | null>(null)
  const [locatedCounty, setlocatedCounty] = useState<string | null>(null)
  const [locatedTown, setlocatedTown] = useState<string | null>(null)
  const [isSelectorActive, setisCoordinateSelectorActive] = useState<boolean>(false)

  const [isTransactionTimeFiltered, setisTransactionTimeFiltered] = useState<boolean>(false)
  const [isBuildingAreaFiltered, setisBuildingAreaFiltered] = useState<boolean>(false)
  const [isLandAreaFiltered, setisLandAreaFiltered] = useState<boolean>(false)
  const [isAgeFiltered, setisAgeFiltered] = useState<boolean>(false)
  const [isParkSpaceFiltered, setisParkSpaceFiltered] = useState<boolean>(false)
  const [isUrbanUsageFiltered, setisUrbanUsageFiltered] = useState<boolean>(false)

  const [assetTypeCode, setassetTypeCode] = useState<number | null>(0)
  const [bufferRadius, setbufferRadius] = useState<number | null>(300)
  const [transactionTime, settransactionTime] = useState<number | null>(null)
  const [buildingTransferArea, setbuildingTransferArea] = useState<number | null>(null)
  const [landTransferArea, setlandTransferArea] = useState<number | null>(null)
  const [age, setage] = useState<number | null>(null)
  const [parkSpaceType, setparkSpaceType] = useState<number | null>(null)
  const [urbanLandUse, seturbanLandUse] = useState<number | null>(null)

  const handleCoordinateSelect = async (longitude: number, latitude: number) => {
    setlongitude(longitude)
    setlatitude(latitude)
    setisCoordinateSelectorActive(false)
    const { statusCode, responseContent } = await api.prod.getCountyTownNameByCoordinate(longitude, latitude)
    if (statusCode === 200) {
      setlocatedCounty(responseContent.countyname)
      setlocatedTown(responseContent.townname)
    } else {
      setlocatedCounty(null)
      setlocatedTown(null)
    }
  }

  return (
    <>
      <Head>
        <title>VPMC | 實價登錄資訊平台</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/yuantai.ico" />
      </Head>
      <div className={style.main}>

        <div className={style.panel}>

          <div className={style.filterGroup}>

            <div className={classNames({
              [style.filterSection]: true,
              [style.divide]: true
            })}>
              <CoordinateSelector
                longitude={longitude}
                latitude={latitude}
                locatedCounty={locatedCounty}
                locatedTown={locatedTown}
                active={isSelectorActive}
                onClick={() => {
                  setisCoordinateSelectorActive(prev => !prev)
                }}
              />
            </div>

            <div className={classNames({
              [style.filterSection]: true,
              [style.divide]: true
            })}>

              {/* <FormControl size='small' fullWidth> */}

              <Grid container spacing={2}>

                <Grid item xs={8}>
                  <FormControl size='small' fullWidth>
                    <InputLabel id="asset-type">資產類型*</InputLabel>
                    <Select
                      labelId="asset-type"
                      label="資產類型"
                      id="asset-type-select"
                      value={assetTypeCode}
                      onChange={(event) => { setassetTypeCode(Number(event.target.value)) }}
                      size='small'
                      fullWidth
                    >
                      {
                        Object.keys(assetTypeSet).map((assetCode, index) => {
                          return <MenuItem
                            key={index}
                            value={assetCode}
                          >{assetTypeSet[Number(assetCode)]}</MenuItem>
                        })
                      }
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    type='number'
                    label="勘估標的距離(m)"
                    size='small'
                    InputProps={{ inputProps: { min: 0 } }}
                    value={bufferRadius}
                    onChange={(event) => { setbufferRadius(Number(event.target.value)) }}
                  ></TextField>
                </Grid>

                {/* 交易時間 */}
                <Grid item xs={2}>
                  <Checkbox
                    checked={isTransactionTimeFiltered}
                    onClick={() => {
                      setisTransactionTimeFiltered(prev => !prev)
                      settransactionTime(0)
                    }}
                  />
                </Grid>
                <Grid item xs={10}>
                  <FormControl size='small' fullWidth>
                    <InputLabel id="transaction-time">交易時間</InputLabel>
                    <Select
                      labelId="transaction-time"
                      label="交易時間"
                      id="transaction-time-select"
                      size='small'
                      value={isTransactionTimeFiltered ? transactionTime : null}
                      disabled={!isTransactionTimeFiltered}
                      autoFocus={isTransactionTimeFiltered}
                      onChange={(event) => {
                        settransactionTime(Number(event.target.value))
                      }}
                      fullWidth
                    >
                      {
                        Object.keys(transactionTimeSet).map((assetCode, index) => {
                          return <MenuItem
                            key={index}
                            value={assetCode}
                          >{transactionTimeSet[Number(assetCode)]}</MenuItem>
                        })
                      }
                    </Select>
                  </FormControl>
                </Grid>

                {/* 建坪面積 */}
                <Grid item xs={2}>
                  <Checkbox
                    checked={isBuildingAreaFiltered}
                    onClick={() => {
                      setisBuildingAreaFiltered(prev => !prev)
                      setbuildingTransferArea(0)
                    }}
                  />
                </Grid>
                <Grid item xs={10}>
                  <FormControl size='small' fullWidth>
                    <InputLabel id="building-transfer-area">建坪面積</InputLabel>
                    <Select
                      labelId="building-transfer-area"
                      label="建坪面積"
                      id="building-transfer-area-select"
                      size='small'
                      value={isBuildingAreaFiltered ? buildingTransferArea : null}
                      onChange={(event) => {
                        setbuildingTransferArea(Number(event.target.value))
                      }}
                      disabled={!isBuildingAreaFiltered}
                      autoFocus={isBuildingAreaFiltered}
                      fullWidth
                    >
                      {
                        Object.keys(buildingTransactionAreaSet).map((assetCode, index) => {
                          return <MenuItem
                            key={index}
                            value={assetCode}
                          >{buildingTransactionAreaSet[Number(assetCode)]}</MenuItem>
                        })
                      }
                    </Select>
                  </FormControl>

                </Grid>

                {/* 地坪面積 */}
                <Grid item xs={2}>
                  <Checkbox
                    checked={isLandAreaFiltered}
                    onClick={() => {
                      setisLandAreaFiltered(prev => !prev)
                      setlandTransferArea(0)
                    }}
                  />
                </Grid>
                <Grid item xs={10}>
                  <FormControl size='small' fullWidth>
                    <InputLabel id="land-transfer-area">地坪面積</InputLabel>
                    <Select
                      labelId="land-transfer-area"
                      label="地坪面積"
                      id="land-transfer-area-select"
                      size='small'
                      fullWidth
                      value={isLandAreaFiltered ? landTransferArea : null}
                      onChange={(event) => {
                        setlandTransferArea(Number(event.target.value))
                      }}
                      autoFocus={isLandAreaFiltered}
                      disabled={!isLandAreaFiltered}
                    >
                      {
                        Object.keys(landTransactionAreaSet).map((assetCode, index) => {
                          return <MenuItem
                            key={index}
                            value={assetCode}
                          >{landTransactionAreaSet[Number(assetCode)]}</MenuItem>
                        })
                      }
                    </Select>
                  </FormControl>

                </Grid>

                {/* 屋齡 */}
                <Grid item xs={2}>
                  <Checkbox
                    checked={isAgeFiltered}
                    onClick={() => {
                      setisAgeFiltered(prev => !prev)
                      setage(0)
                    }}
                  />
                </Grid>
                <Grid item xs={10}>
                  <FormControl size='small' fullWidth>
                    <InputLabel id="age">屋齡</InputLabel>
                    <Select
                      labelId="age"
                      label="屋齡"
                      id="age-select"
                      size='small'
                      value={isAgeFiltered ? age : null}
                      onChange={(event) => {
                        setage(Number(event.target.value))
                      }}
                      disabled={!isAgeFiltered}
                      autoFocus={isAgeFiltered}
                      fullWidth
                    >
                      {
                        Object.keys(ageSet).map((assetCode, index) => {
                          return <MenuItem
                            key={index}
                            value={assetCode}
                          >{ageSet[Number(assetCode)]}</MenuItem>
                        })
                      }
                    </Select>
                  </FormControl>

                </Grid>

                {/* 車位類型 */}
                <Grid item xs={2}>
                  <Checkbox
                    checked={isParkSpaceFiltered}
                    onClick={() => {
                      setisParkSpaceFiltered(prev => !prev)
                      setparkSpaceType(0)
                    }}
                  />
                </Grid>
                <Grid item xs={10}>
                  <FormControl size='small' fullWidth>
                    <InputLabel id="park-space">車位類型</InputLabel>
                    <Select
                      labelId="park-space"
                      label="屋齡"
                      id="park-space-select"
                      size='small'
                      fullWidth
                      value={isParkSpaceFiltered ? parkSpaceType : null}
                      onChange={(event) => {
                        setparkSpaceType(Number(event.target.value))
                      }}
                      autoFocus={isParkSpaceFiltered}
                      disabled={!isParkSpaceFiltered}
                    >
                      {
                        Object.keys(parkSpaceSet).map((assetCode, index) => {
                          return <MenuItem
                            key={index}
                            value={assetCode}
                          >{parkSpaceSet[Number(assetCode)]}</MenuItem>
                        })
                      }
                    </Select>
                  </FormControl>

                </Grid>

                {/* 使用分區 */}
                <Grid item xs={2}>
                  <Checkbox
                    checked={isUrbanUsageFiltered}
                    onClick={() => {
                      setisUrbanUsageFiltered(prev => !prev)
                      seturbanLandUse(0)
                    }}
                  />
                </Grid>
                <Grid item xs={10}>
                  <FormControl size='small' fullWidth>
                    <InputLabel id="land-use">使用分區</InputLabel>
                    <Select
                      labelId="land-use"
                      label="使用分區"
                      id="land-use-select"
                      size='small'
                      fullWidth
                      value={isUrbanUsageFiltered ? urbanLandUse : null}
                      onChange={(event) => {
                        seturbanLandUse(Number(event.target.value))
                      }}
                      autoFocus={isUrbanUsageFiltered}
                      disabled={!isUrbanUsageFiltered}
                    >
                      {
                        Object.keys(urbanUsageSet).map((assetCode, index) => {
                          return <MenuItem
                            key={index}
                            value={assetCode}
                          >{urbanUsageSet[Number(assetCode)]}</MenuItem>
                        })
                      }
                    </Select>
                  </FormControl>

                </Grid>

              </Grid>

              {/* </FormControl> */}





            </div>

            <div className={style.searchBtn}
            >
              <Image src={'/aprRegion/search.png'} width='30px' height='30px' />
              <p>查詢</p>
            </div>

          </div>

          <div className={style.graphGroup}>
          </div>

        </div>

        <div className={style.content}>
          <div className={style.mapContainer}>
            <MarketMapContainer
              active={isSelectorActive}
              onCoordinateSelect={handleCoordinateSelect}
            />
          </div>
        </div>

      </div>
    </>
  )
}

export default AprRegion
