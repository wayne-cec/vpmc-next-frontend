import React, { useState, useEffect } from 'react'
import style from './index.module.scss'
import Image from 'next/image'

export interface IAction {
  onCustomizeParamBtnClick: () => void
  handleFormSubmit: () => void
}

const Action = (props: IAction) => {
  return (
    <div className={style.action}>
      <div className={style.settingBtn}
        onClick={props.onCustomizeParamBtnClick}
      >
        <Image src={'/aprRegion/setting.png'} width='30px' height='30px' />
        <p>自定義參數</p>
      </div>

      <div className={style.searchBtn}
        onClick={props.handleFormSubmit}
      >
        <Image src={'/aprRegion/search.png'} width='30px' height='30px' />
        <p>查詢</p>
      </div>
    </div>
  )
}

export default Action