import React, { useState, useEffect } from 'react'
import style from './index.module.scss'
import Image from 'next/image'
import Router from 'next/router'
import { getAge } from '../../lib/calculateAge'
import { ICommitee } from '../MapContainer/AprV2Map'
import { square } from '../MapContainer/AprV2Map'
import { parseCommitee } from '../../lib/parseCommitee'
import { useDispatch } from 'react-redux'
import { initCurrentCommitee } from '../../store/slice/commitee'

export enum buildingType {
  apartmentComplex = 0, // 住宅大樓(11層含以上有電梯)
  officeBuilding = 1,   // 辦公商業大樓
  other = 2,            // 其他
  flat = 3,             // 公寓(5樓含以下無電梯)
  apartment = 4,        // 華廈(10層含以下有電梯)
  suite = 5,              // 套房(1房1廳1衛)
  townhouse = 6,        // 透天厝
  store = 7,            // 店面(店鋪)
  factoryOffice = 8,     // 廠辦
  warehouse = 9,        // 倉庫
  factory = 10,         // 工廠
  farmhouse = 11        // 農舍
}

export const buildingTypeDecode: { [key: number]: string } = {
  0: '住宅大樓',
  1: '辦公商業大樓',
  2: '其他',
  3: '公寓',
  4: '華廈',
  5: '套房',
  6: '透天厝',
  7: '店面',
  8: '廠辦',
  9: '倉庫',
  10: '工廠',
  11: '農舍',
}

// export interface ICommiteeCard {
//   id: string
//   unitPrice: number
//   commiteeName: string
//   buildingType: string
//   address: string
//   completionDate: string
//   aprCount: string
// }

const CommiteeCard = (props: ICommitee) => {
  const dispatch = useDispatch()
  const [uniPrice, setuniPrice] = useState<number | undefined>(undefined)

  const handleCommiteeCardClick = () => {
    dispatch(
      initCurrentCommitee(props)
    )
    Router.push(`/aprV2/commiteeInfo/${props.id}`)
  }

  useEffect(() => {
    // if (props.value?.avg_unit_price) {
    //   // console.log(props.value.avg_unit_price)
    //   try {
    //     // const unitP = Math.round(Number(props.value.avg_unit_price) * square / 1000) / 10
    //     // setuniPrice(unitP)
    //   } catch {
    //     setuniPrice(undefined)
    //   }
    // }
  }, [])


  return (
    <>
      <div className={style.commiteeCard}
        onClick={() => { handleCommiteeCardClick() }}
      >
        <div className={style.commiteeImageWrap}>
          <Image
            className={style.commiteeImage}
            src={'/commitee.jpg'}
            width='300px'
            height='160px'
          // layout='responsive'
          />
        </div>

        <div className={style.contentContainer}>
          {
            props.value?.avg_unit_price
              ? <p className={style.priceTitle}>
                <span className={style.unitPrice}>
                  {props.value.calculatedUnitPrice}
                </span>
                <span className={style.unit}>
                  萬/坪
                </span>
                (成交均價)
              </p>
              : <></>
          }
          <p className={style.commiteeName}>
            {parseCommitee(props.organization)}
          </p>
          <p className={style.commiteeInfo}>

            {
              props.value?.avg_unit_price ?
                <>
                  <span className={style.divider}>
                    {
                      buildingTypeDecode[Number(props.value?.building_type)]
                    }
                  </span>

                  <span className={style.divider}>
                    {getAge(props.value?.completion_date!)}年
                  </span>

                  <span>
                    近期交易{props.value?.apr_count}戶
                  </span>
                </> : <span>近期無交易紀錄</span>
            }
          </p>
          <p className={style.address}>
            {props.address}
          </p>
        </div>
      </div>
    </>
  )
}

export default CommiteeCard