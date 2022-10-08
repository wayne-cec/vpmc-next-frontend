import { getAge } from '../../../lib/calculateAge'
import { buildingTypeDecode } from '../../../components/CommiteeCard'
import { urbanUsageSet } from '../../../lib/marketComapreConst'
import { AssetDetailResponse } from '../../../store/services/types/apr'
import { parseCommitee } from '../../../lib/parseCommitee'
import { parkSpaceSet } from '../../../lib/marketComapreConst'
import calculateArea from '../../../lib/calculateArea'
import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'
import style from './index.module.scss'
import TabList from '@mui/lab/TabList'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import moment from 'moment'
import React, { useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Divider from '@mui/material/Divider'
import classNames from 'classnames'

const square = 3.305785

export interface IDetailAprInfo {
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
  organization: string
  address: string
  assetsDetail: AssetDetailResponse | undefined
}

export enum landTransferStatusType {
  partial = 0,
  entire = 1,
  none = 3
}

export const landTransferStatusTypeMap: { [key: number]: string } = {
  0: '持分移轉',
  1: '全筆移轉',
  3: '無資料'
}

const AprDetailContent = (props: IDetailAprInfo) => {
  const [tabValue, settabValue] = useState<string>('1')
  const areaWithoutPark = props.buildingTransferArea - props.parkingSpaceTransferArea

  const renderLandTable = () => {
    return (
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead sx={{ bgcolor: '#E8EFFD' }}>
            <TableRow>
              <TableCell>土地位置</TableCell>
              <TableCell>地號</TableCell>
              <TableCell align="right">土地移轉面積</TableCell>
              <TableCell>使用分區或編定</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.assetsDetail &&
              props.assetsDetail.lands.map((row, index) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.address}
                  </TableCell>
                  <TableCell>{row.parcelNumber}</TableCell>
                  <TableCell align="right">
                    <div>
                      <span>{calculateArea(row.landTransferArea)}坪</span>
                      <span className='ml-1'>{landTransferStatusTypeMap[row.transferStatus]}</span>
                    </div>
                    <div>
                      <span>({row.rightNumerate}/{row.rightDenumerate})</span>
                    </div>
                  </TableCell>
                  <TableCell>{row.landUse}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }

  const renderBuildFirstRow = () => {
    if (!props.assetsDetail) return
    const firstBuild = props.assetsDetail.builds.filter(b => !b.usage.includes('共有')).at(0)
    if (!firstBuild) return
    const mainBuildRatio = Math.round(props.buildingArea / areaWithoutPark * 100)
    const subBuildRatio = Math.round(props.subBuildingArea / areaWithoutPark * 100)
    const belconyRatio = Math.round(props.belconyArea / areaWithoutPark * 100)
    return (
      <>
        <TableRow
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell component="th" scope="row" rowSpan={4}>
            {`${calculateArea(firstBuild.buildingTransferArea)}坪`}
          </TableCell>
        </TableRow>
        <TableRow
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell component="th" scope="row" colSpan={4}>
            {'主建物'}
          </TableCell>
          <TableCell component="th" scope="row" colSpan={1}>
            {`${calculateArea(props.buildingArea)}坪`}
          </TableCell>
          <TableCell component="th" scope="row" colSpan={2}>
            {`${mainBuildRatio}%`}
          </TableCell>
          {/* <TableCell component="th" scope="row" rowSpan={3}>
            {firstBuild.material}
          </TableCell>
          <TableCell component="th" scope="row" rowSpan={3}>
            {firstBuild.buildingLayer}
          </TableCell>
          <TableCell component="th" scope="row" rowSpan={3}
            sx={{ width: '275px' }}
          >
            {firstBuild.usage}
          </TableCell> */}
        </TableRow>
        <TableRow
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell component="th" scope="row" colSpan={4}>
            {'附屬建物'}
          </TableCell>
          <TableCell component="th" scope="row" colSpan={1}>
            {`${calculateArea(props.subBuildingArea)}坪`}
          </TableCell>
          <TableCell component="th" scope="row" colSpan={2}>
            {`${subBuildRatio}%`}
          </TableCell>
        </TableRow>
        <TableRow
        // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell component="th" scope="row" colSpan={4}>
            {'陽台'}
          </TableCell>
          <TableCell component="th" scope="row" colSpan={1}>
            {`${calculateArea(props.belconyArea)}坪`}
          </TableCell>
          <TableCell component="th" scope="row" colSpan={2}>
            {`${belconyRatio}%`}
          </TableCell>
        </TableRow>
      </>
    )
  }

  const renderBuildTable = () => {
    if (!props.assetsDetail) return
    const subBuilds = props.assetsDetail.builds
    return (
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead sx={{ bgcolor: '#E8EFFD' }}>
            <TableRow>
              <TableCell colSpan={6} align='center'>建物移轉面積</TableCell>
              <TableCell sx={{ width: '385px' }}>比例</TableCell>
              {/* <TableCell>主要建材</TableCell>
              <TableCell>建物分層</TableCell>
              <TableCell>主要用途</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {renderBuildFirstRow()}
          </TableBody>

          <TableHead sx={{ bgcolor: '#E8EFFD' }}>
            <TableRow>
              <TableCell colSpan={3} align='center'>建物移轉面積</TableCell>
              <TableCell>比例</TableCell>
              <TableCell>主要建材</TableCell>
              <TableCell>建物分層</TableCell>
              <TableCell>主要用途</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subBuilds.map((row) => (
              // const belconyRatio = Math.round(props.belconyArea / areaWithoutPark * 100)
              <>
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align='center' colSpan={3}>{`${calculateArea(row.buildingTransferArea)}坪`}</TableCell>

                  <TableCell component="th" scope="row">
                    {`${Math.round(row.buildingTransferArea / areaWithoutPark * 100)}%`}
                  </TableCell>
                  <TableCell>{row.material}</TableCell>
                  <TableCell>{row.buildingLayer}</TableCell>
                  <TableCell sx={{ textOverflow: 'clip' }}>{row.usage}</TableCell>
                </TableRow>
              </>
            ))}
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align='center' colSpan={3}>備註</TableCell>
              <TableCell colSpan={3}></TableCell>
            </TableRow>
          </TableBody>

        </Table>
      </TableContainer>
    )
  }

  const renderParkTable = () => {
    return (
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead sx={{ bgcolor: '#E8EFFD' }}>
            <TableRow>
              <TableCell>車位類型</TableCell>
              <TableCell>價格</TableCell>
              <TableCell align="right">車位移轉面積</TableCell>
              <TableCell align="right">車位所在樓層</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.assetsDetail &&
              props.assetsDetail.parks.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {parkSpaceSet[row.parkingSpaceType]}
                  </TableCell>
                  <TableCell>{row.parkingSpacePrice / 10000}萬</TableCell>
                  <TableCell align="right">{calculateArea(row.parkingSpaceTransferArea)}坪</TableCell>
                  <TableCell align="right">{row.locateLevel}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }

  return (
    <div className={style.aprDetailContent}>
      <div className={style.chipContainer}>
        <span className={style.chip}>{moment(new Date(props.transactiontime)).format('YYYY-MM-DD')}</span>
        <span className={style.chip}>{props.transferFloor}樓</span>

        {/* {(props.organization !== '' ? props.organization : '無管委會')} */}
        {
          props.organization !== '無管委會'
            ? <span className={style.chip}>
              {parseCommitee(props.organization)}
            </span>
            : <span className={classNames({
              [style.chip]: true,
              [style.disabled]: true
            })}>無管委會</span>
        }
      </div>
      <div className={style.priceContainer}>

        {/* 單價 */}
        <div className={style.priceChip}>
          <p>
            <span className={style.unitPrice}>
              {Math.round((props.unitPrice * square) / 1000) / 10}
              {/* {props.unitPrice * square} */}
            </span>
            <span className={style.unitPriceUnit}>萬/坪</span>
          </p>
          <p className={style.caption}>
            已扣除車位
          </p>
        </div>

        {/* 坪數 */}
        <div className={style.priceChip}>
          <div className='w-full px-4'>
            <Grid container spacing={0} sx={{ alignItems: 'center' }}>
              <Grid xs={3}>房屋</Grid>
              <Grid xs={7}>
                <span className={style.transferBuildingArea}>
                  {calculateArea(props.buildingTransferArea - props.parkingSpaceTransferArea)}
                </span>
              </Grid>
              <Grid xs={2}>坪</Grid>
            </Grid>
          </div>
          <div className='w-full px-4'>
            <Grid container spacing={0} sx={{ alignItems: 'center' }}>
              <Grid xs={3}>車位</Grid>
              <Grid xs={7}>
                <span>{calculateArea(props.parkingSpaceTransferArea)}</span>
              </Grid>
              <Grid xs={2}>坪</Grid>
            </Grid>
          </div>
          <div className='w-full px-4'>
            <Grid container spacing={0} sx={{ alignItems: 'center' }}>
              <Grid xs={3}>總坪</Grid>
              <Grid xs={7}>
                <span>{calculateArea(props.buildingTransferArea)}</span>
              </Grid>
              <Grid xs={2}>坪</Grid>
            </Grid>
          </div>
        </div>

        {/* 總價 */}
        <div className={style.priceChip}>

          <div className='w-full px-4'>
            <Grid container spacing={0} sx={{ alignItems: 'center' }}>
              <Grid xs={3}>房價</Grid>
              <Grid xs={7}>
                <span className={style.transferBuildingArea}>
                  {Math.floor(Math.round(props.priceWithoutParking / 10000 * 10) / 10)}
                </span>
              </Grid>
              <Grid xs={2}>萬</Grid>
            </Grid>
          </div>

          <div className='w-full px-4'>
            <Grid container spacing={0} sx={{ alignItems: 'center' }}>
              <Grid xs={3}>車位</Grid>
              <Grid xs={7}>
                <span>
                  {Math.floor(Math.round(props.parkingSpacePrice / 10000 * 10) / 10)}
                </span>
              </Grid>
              <Grid xs={2}>萬</Grid>
            </Grid>
          </div>

          <div className='w-full px-4'>
            <Grid container spacing={0} sx={{ alignItems: 'center' }}>
              <Grid xs={3}>總價</Grid>
              <Grid xs={7}>
                <span>
                  {Math.floor(Math.round(props.price / 10000 * 10) / 10)}
                </span>
              </Grid>
              <Grid xs={2}>萬</Grid>
            </Grid>
          </div>
        </div>

      </div>
      <div className={style.detailContainer}>
        <Grid container spacing={0}>
          <Grid item xs={2} className={style.gridContainer}>
            <span className={style.title}>格局:</span>
          </Grid>
          <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }}>
            <span>{props.roomNumber}房{props.hallNumber}廳{props.bathNumber}衛</span>
          </Grid>

          <Grid item xs={2} className={style.gridContainer}>
            <span className={style.title}>建築完成日:</span>
          </Grid>
          <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }}>
            <span>{moment(props.completiontime).format('YYYY-MM-DD')}</span>
          </Grid>

          <Grid item xs={2} className={style.gridContainer}>
            <span className={style.title}>標的:</span>
          </Grid>
          <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }}>
            <span>{props.buildingAmount}建物{props.landAmount}土地{props.parkAmount}車位</span>
          </Grid>

          <Grid item xs={2} className={style.gridContainer}>
            <span className={style.title}>交易屋齡:</span>
          </Grid>
          <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }}>
            <span>
              {
                Math.round(moment
                  .duration(moment(props.transactiontime, 'YYYY/MM/DD')
                    .diff(moment(props.completiontime, 'YYYY/MM/DD'))
                  ).asYears()
                )
                // getAge(props.completiontime)
              }
              年
            </span>
          </Grid>

          <Grid item xs={2} className={style.gridContainer}>
            <span className={style.title}>樓層:</span>
          </Grid>
          <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }}>
            <span>{props.transferFloor}/{props.floor}樓</span>
          </Grid>

          <Grid item xs={2} className={style.gridContainer}>
            <span className={style.title}>型態:</span>
          </Grid>
          <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }}>
            <span>{buildingTypeDecode[props.buildingType]}</span>
          </Grid>

          <Grid item xs={2} className={style.gridContainer}>
            <span className={style.title}>分區:</span>
          </Grid>
          <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }}>
            <span>{urbanUsageSet[props.urbanLandUse]}</span>
          </Grid>

          <Grid item xs={2} className={style.gridContainer}>
            <span className={style.title}>建材:</span>
          </Grid>
          <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }}>
            <span>{props.assetsDetail?.builds[0].material}</span>
          </Grid>

        </Grid>
      </div>
      <Divider sx={{ marginTop: '1rem' }} />
      <div className={style.AreaDetailContainer}>
        <TabContext value={tabValue}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={(e, value) => {
              settabValue(value)
            }}
            >
              <Tab label="土地" value="1" />
              <Tab label="建物" value="2" />
              <Tab label="停車位" value="3" />
            </TabList>
          </Box>

          <TabPanel value="1" sx={{ padding: '0px' }}>
            {props.assetsDetail && renderLandTable()}
          </TabPanel>
          <TabPanel value="2" sx={{ padding: '0px' }}>
            {props.assetsDetail && renderBuildTable()}
          </TabPanel>
          <TabPanel value="3" sx={{ padding: '0px' }}>
            {props.assetsDetail && renderParkTable()}
          </TabPanel>

        </TabContext>

        {/* <div className={style.heading}>
          <span>土地移轉面積</span>
          <span>{calculateArea(props.landTransferArea)}坪</span>
        </div>
        <div className={style.headingSub}>
          <span>主建物面積</span>
          <span>{calculateArea(props.buildingArea)}坪</span>
        </div>
        <div className={style.subInfoContainer}>
          <div className={style.subInfo}>
            <span>附屬建物面積</span>
            <span>{calculateArea(props.subBuildingArea)}坪</span>
          </div>
          <div className={style.subInfo}>
            <span>陽台面積</span>
            <span>{calculateArea(props.belconyArea)}坪</span>
          </div>
        </div> */}
      </div>

    </div>
  )
}

export default AprDetailContent
