import React from 'react'
import style from './index.module.scss'
import Bulletin from './Bulletin'
import GeneralLaw from './GeneralLaw'
import TwTrend from './TwTrend'
import License from './License'

export interface IUserGreet {
  username: string
}

const UserGreet = (props: IUserGreet) => {

  return (
    <>
      <div className={style.userGreet}>
        <div className={style.btnContainer}>
          <Bulletin />
          <GeneralLaw />
          <TwTrend />
          <License />
        </div>
        <span>您好! {props.username}</span>
      </div>
    </>
  )
}

export default UserGreet