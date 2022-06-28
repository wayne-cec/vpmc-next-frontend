import React from 'react'
import style from './index.module.scss'
import Image from 'next/image'
import classNames from 'classnames'
import { usePendingStatus } from '../..'
// import { LoadingButton } from '@mui/lab'
// import FindInPageIcon from '@mui/icons-material/FindInPage'

export interface IAction {
  onCustomizeParamBtnClick: () => void
  handleFormSubmit: () => void
}

const Action = (props: IAction) => {
  const { pending } = usePendingStatus()
  return (
    <div className={style.action}>
      <div className={style.settingBtn}
        onClick={props.onCustomizeParamBtnClick}
      >
        <Image src={'/aprRegion/setting.png'} width='30px' height='30px' />
        <p>自定義參數</p>
      </div>

      <div className={classNames({
        [style.searchBtn]: true,
        [style.loading]: pending
      })}
        onClick={() => {
          if (!pending) {
            props.handleFormSubmit()
          }
        }}
      >
        {
          pending
            ? <div className={style.loader}></div>
            : <Image src={'/aprRegion/search.png'} width='30px' height='30px' />
        }

        <p>查詢</p>
      </div>
    </div>
  )
}

export default Action
