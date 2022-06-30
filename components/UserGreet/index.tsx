import React from 'react'
import style from './index.module.scss'
import Bulletin from './Bulletin'
import GeneralLaw from './GeneralLaw'
import TwTrend from './TwTrend'
import License from './License'
import NavButton from '../NavButton'

export interface IUserGreet {
  username: string
  isAuthenticated: boolean
  onLogout: () => void
  onLogin: () => void
}

const UserGreet = (props: IUserGreet) => {

  return (
    <>
      <div className={style.userGreet}>
        {
          props.isAuthenticated
            ? <div className={style.btnContainer}>
              <Bulletin />
              <GeneralLaw />
              <TwTrend />
              <License />
            </div>
            : null
        }

        <div className={style.userContainer}>
          {
            props.isAuthenticated
              ? <>
                <p>您好! {props.username}</p>
                <div className={style.logoutBtn}
                  onClick={props.onLogout}
                >
                  登出
                </div>
              </>
              : <div className={style.loginBtn}
                onClick={props.onLogin}
              >
                登入
              </div>
          }

          {/* <NavButton
            onClick={() => { }}
            style={{
              paddingTop: '1px',
              paddingBottom: '1px'
            }}
          >登出</NavButton> */}
        </div>
      </div>
    </>
  )
}

export default UserGreet