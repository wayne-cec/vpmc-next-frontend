import { getAge } from '../../../lib/calculateAge'
import { buildingTypeDecode } from '../../../components/CommiteeCard'
import { urbanUsageSet } from '../../../lib/marketComapreConst'
import { AssetDetailResponse } from '../../../store/services/types/apr'
import { parseCommitee } from '../../../lib/parseCommitee'
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

function createLandData (
  address: string,
  landUse: string,
  landTransferArea: number,
  rightDenumerate: number,
  rightNumerate: number,
  parcelNumber: string,
  transferStatus: string
) {
  return {
    address, landUse, landTransferArea, rightDenumerate,
    rightNumerate, parcelNumber, transferStatus
  };
}

const rowsLand = [
  createLandData('市府段二小段', '都市：商', 1.09, 23040, 336, '05660000', '持分移轉'),
  createLandData('市府段二小段', '都市：商', 0.01, 23040, 336, '05660000', '持分移轉'),
  createLandData('市府段二小段', '都市：商', 1.95, 23040, 336, '05660000', '持分移轉'),
  createLandData('市府段二小段', '都市：商', 0.82, 23040, 336, '05660000', '持分移轉')
]

function createParkData (
  parkSpaceType: string,
  parkingSpacePrice: number,
  parkingSpaceTransferArea: number,
  locateLevel: string
) {
  return {
    parkSpaceType, parkingSpacePrice, parkingSpaceTransferArea, locateLevel
  };
}

const rowsPark = [
  createParkData('坡道平面', 1500000, 36.35, '地下三樓'),
  createParkData('坡道平面', 1500000, 36.35, '地下三樓'),
  createParkData('坡道平面', 1500000, 36.35, '地下三樓'),
  createParkData('坡道平面', 1500000, 36.35, '地下四樓'),
  createParkData('坡道平面', 1500000, 36.35, '地下四樓'),
  createParkData('坡道平面', 1500000, 36.35, '地下四樓'),
  createParkData('坡道平面', 1500000, 36.35, '地下四樓')
];

const AprDetailContent = (props: IDetailAprInfo) => {
  const [tabValue, settabValue] = useState<string>('1')

  const renderLandTable = () => {
    return (
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead sx={{ bgcolor: '#dddddd' }}>
            <TableRow>
              <TableCell>土地位置</TableCell>
              <TableCell>使用分區或編定</TableCell>
              <TableCell align="right">土地移轉面積</TableCell>
              <TableCell align="right">權利人持分分母</TableCell>
              <TableCell align="right">權利人持分分子</TableCell>
              <TableCell>地號</TableCell>
              <TableCell>移轉情形</TableCell>
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
                  <TableCell>{row.landUse}</TableCell>
                  <TableCell align="right">{row.landTransferArea}</TableCell>
                  <TableCell align="right">{row.rightDenumerate}</TableCell>
                  <TableCell align="right">{row.rightNumerate}</TableCell>
                  <TableCell>{row.parcelNumber}</TableCell>
                  <TableCell>{row.transferStatus}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }

  const renderBuildTable = () => {
    return (
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead sx={{ bgcolor: '#dddddd' }}>
            <TableRow>
              <TableCell>建物移轉面積</TableCell>
              <TableCell>主要用途</TableCell>
              <TableCell>主要建材</TableCell>
              <TableCell>建物分層</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" rowSpan={3}>
                {'38.87坪'}
              </TableCell>
              <TableCell component="th" scope="row">
                {'商業用'}
              </TableCell>
              <TableCell component="th" scope="row">
                {'鋼筋混凝土'}
              </TableCell>
              <TableCell component="th" scope="row">
                {'一層，騎樓'}
              </TableCell>
            </TableRow>

            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" rowSpan={3}>
                {'38.87坪'}
              </TableCell>
              <TableCell component="th" scope="row">
                {'商業用'}
              </TableCell>
              <TableCell component="th" scope="row">
                {'鋼筋混凝土'}
              </TableCell>
              <TableCell component="th" scope="row">
                {'一層，騎樓'}
              </TableCell>
            </TableRow>

            {/* {props.assetsDetail &&
              props.assetsDetail.lands.map((row, index) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.address}
                  </TableCell>
                  <TableCell>{row.landUse}</TableCell>
                  <TableCell align="right">{row.landTransferArea}</TableCell>
                  <TableCell align="right">{row.rightDenumerate}</TableCell>
                  <TableCell align="right">{row.rightNumerate}</TableCell>
                  <TableCell>{row.parcelNumber}</TableCell>
                  <TableCell>{row.transferStatus}</TableCell>
                </TableRow>
              ))} */}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }

  const renderParkTable = () => {
    return (
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead sx={{ bgcolor: '#dddddd' }}>
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
                    {row.parkingSpaceType}
                  </TableCell>
                  <TableCell>{row.parkingSpacePrice}</TableCell>
                  <TableCell align="right">{row.parkingSpaceTransferArea}</TableCell>
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
          props.organization !== '無管委會' && <span className={style.chip}>
            {parseCommitee(props.organization)}
          </span>
        }
      </div>
      <div className={style.priceContainer}>

        {/* 單價 */}
        <div className={style.priceChip}>
          <p>
            <span className={style.unitPrice}>{Math.round((props.unitPrice * square) / 1000) / 10}</span>
            <span className={style.unitPriceUnit}>萬/坪</span>
          </p>
          <p className={style.caption}>
            已扣除車位
          </p>
        </div>

        {/* 坪數 */}
        <div className={style.priceChip}>
          <p>
            <span className={style.transferBuildingArea}>{calculateArea(props.buildingTransferArea)}</span>
            <span className={style.transferBuildingAreaUnit}>坪</span>
          </p>
          <p className={style.caption}>
            含車位{calculateArea(props.parkingSpaceTransferArea)}坪
          </p>
        </div>

        {/* 總價 */}
        <div className={style.priceChip}>
          <p>
            <span className={style.transferBuildingArea}>{Math.round(props.price / 10000 * 10) / 10}</span>
            <span className={style.transferBuildingAreaUnit}>萬</span>
          </p>
          <p className={style.caption}>
            含車位{Math.round(props.parkingSpacePrice / 10000 * 10) / 10}萬
          </p>
        </div>

      </div>
      <div className={style.detailContainer}>

        <Grid container spacing={0}>
          <Grid item xs={2} className={style.gridContainer}>
            <span className={style.title}>格局:</span>
          </Grid>
          <Grid item xs={5} sx={{ display: 'flex', alignItems: 'center' }}>
            <span>{props.roomNumber}房{props.hallNumber}廳{props.bathNumber}衛</span>
          </Grid>

          <Grid item xs={2} className={style.gridContainer}>
            <span className={style.title}>屋齡:</span>
          </Grid>
          <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center' }}>
            <span>{getAge(props.completiontime)}年</span>
          </Grid>

          <Grid item xs={2} className={style.gridContainer}>
            <span className={style.title}>標的:</span>
          </Grid>
          <Grid item xs={5} sx={{ display: 'flex', alignItems: 'center' }}>
            <span>{props.buildingAmount}建物{props.landAmount}土地{props.parkAmount}車位</span>
          </Grid>

          <Grid item xs={2} className={style.gridContainer}>
            <span className={style.title}>樓層:</span>
          </Grid>
          <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center' }}>
            <span>{props.transferFloor}/{props.floor}樓</span>
          </Grid>

          <Grid item xs={2} className={style.gridContainer}>
            <span className={style.title}>型態:</span>
          </Grid>
          <Grid item xs={5} sx={{ display: 'flex', alignItems: 'center' }}>
            <span>{buildingTypeDecode[props.buildingType]}</span>
          </Grid>

          <Grid item xs={2} className={style.gridContainer}>
            <span className={style.title}>分區:</span>
          </Grid>
          <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center' }}>
            <span>{urbanUsageSet[props.urbanLandUse]}</span>
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
