import React, { Children } from 'react'
import style from './index.module.scss'
import Image from 'next/image'

const CommiteeCard = () => {
  return (
    <>
      <div className={style.commiteeCard}>
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
          <p className={style.priceTitle}>
            <span className={style.unitPrice}>
              22.6
            </span>
            <span className={style.unit}>
              萬/坪
            </span>
            (成交均價)
          </p>
          <p className={style.commiteeName}>
            海洋都心
          </p>
          <p className={style.commiteeInfo}>
            <span className={style.divider}>住宅</span>
            <span className={style.divider}>4年</span>
            <span>1658戶</span>
          </p>
          <p className={style.address}>
            新北市淡水區新市五路三段348號
          </p>
        </div>
      </div>
    </>
  )
}

export default CommiteeCard