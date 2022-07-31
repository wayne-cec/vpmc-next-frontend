import React, { useState } from 'react'
import style from './index.module.scss'
import dynamic from 'next/dynamic'
import {
  Grid
} from '@mui/material'
import moment from 'moment'
import { Data } from '../../../containers/MarketCompareContainer/ResultPanel/ResultTable'
import classNames from 'classnames'
import { parseCommitee } from '../../../lib/parseCommitee'
import { getAge } from '../../../lib/calculateAge'
import calculateArea from '../../../lib/calculateArea'
import { parkSpaceSet } from '../../../lib/marketComapreConst'
import { useSelector } from 'react-redux'
import { selectUser } from '../../../store/slice/user'

const DocumentMapContainer = dynamic(
  () => import('../../../components/MapContainer/DocumentMap'),
  { ssr: false }
)

const square = 3.305785

export interface IMarketCompareDocument {
  pid: string
  aprData: Data[]
  mapScreenshotUrl: string | undefined
  screenshotFlag: { value: boolean }
  onScreenShotTaken: (dataUrl: string) => void
}

const MarketCompareDocument = ({
  pid,
  aprData,
  mapScreenshotUrl,
  screenshotFlag,
  onScreenShotTaken
}: IMarketCompareDocument) => {
  const userInfo = useSelector(selectUser)

  return (
    <div className={style.MarketCompareDocument} id={pid}>

      <div className={style.Head}>
        <div className={style.Title}>
          <span>市場比較案例篩選</span>
        </div>
        <div className={style.DocInfo}>
          <Grid container spacing={1}>
            <Grid item xs={3}>
              <span>日期</span>
            </Grid>
            <Grid item xs={9}>
              <span>{moment(new Date()).format('YYYY-MM-DD HH:mm:ss A')}</span>
            </Grid>
            <Grid item xs={3}>
              <span>作者</span>
            </Grid>
            <Grid item xs={9}>
              <span>{userInfo.userProfile?.username}</span>
            </Grid>
          </Grid>
        </div>
      </div>

      <div className={style.Body}>
        <table>
          <thead>
            <tr>
              <th>
                交易日期
              </th>
              <th>
                門牌道路
              </th>
              <th>
                社區名稱
              </th>
              <th>
                屋齡
              </th>
              <th>
                樓層
              </th>
              <th>
                土地
              </th>
              <th>
                建物
              </th>
              <th>
                主建比
              </th>
              <th>
                單價(萬/坪)
              </th>
              <th>
                車位價格
              </th>
              <th>
                總價(萬)
              </th>
            </tr>
          </thead>
          <tbody>
            {
              aprData.map((row, index) => {
                return <tr key={index}>
                  <td>
                    <span>{moment(new Date(row.transactiontime)).format('YYYY-MM-DD')}</span>
                  </td>
                  <td>
                    <span>
                      {'暫無資料'}
                    </span>
                  </td>
                  <td>
                    <span
                      className={classNames({
                        [style.organization]: true,
                        [style.disable]: row.organization === '無管委會'
                      })}
                    >{parseCommitee(row.organization)}
                    </span>
                  </td>
                  <td>
                    <span className={classNames({
                      [style.age]: true,
                      [style.green]: getAge(row.completiontime) <= 5,
                      [style.yellow]: getAge(row.completiontime) > 5 && getAge(row.completiontime) <= 20,
                      [style.red]: getAge(row.completiontime) > 20
                    })}>
                      {getAge(row.completiontime)}年
                    </span>
                  </td>
                  <td>
                    <span>{row.transferFloor}/{row.floor}樓</span>
                  </td>
                  <td>
                    <span>
                      {calculateArea(row.landTransferArea)}坪
                    </span>
                  </td>
                  <td>
                    <span>
                      {calculateArea(row.buildingTransferArea - row.parkingSpaceTransferArea)}坪
                    </span>
                  </td>
                  <td>
                    <span>
                      {
                        Math.round(row.buildingArea / row.buildingTransferArea * 1000) / 10
                      }%
                    </span>
                  </td>
                  <td>
                    <span className={style.unitPrice}>
                      {Math.round((row.unitPrice * square) / 1000) / 10}
                    </span>
                    <span className={style.unit}>萬</span>
                  </td>
                  <td>
                    {
                      row.parkingSpacePrice === 0
                        ? '無車位'
                        : <>
                          <p>{`${Math.round(row.parkingSpacePrice / 10000)}萬`}</p>
                          <div>
                            <span className={style.parkCount}>{row.parkAmount}</span>
                            {parkSpaceSet[row.parkingSpaceType]}
                          </div>
                        </>
                    }
                  </td>
                  <td>
                    <p className={style.totalPrice}>
                      {Math.round(row.price / 10000)}
                      <span className={style.smtext}>萬</span>
                    </p>
                  </td>
                </tr>
              })
            }
          </tbody>
        </table>

        <div className={style.MapContainer}>
          {
            mapScreenshotUrl
              ? <img src={mapScreenshotUrl} />
              : <DocumentMapContainer
                aprData={aprData}
                screenshotFlag={screenshotFlag}
                onScreenShotTaken={onScreenShotTaken}
              />
          }
        </div>
      </div>

      <div className={style.Foot}>
        <span>Copyright © 2022 VPMC 版權所有</span>
        <span>中華誠信資產管理</span>
      </div>

    </div>
  )
}

export default MarketCompareDocument
