import React from 'react'
import style from './index.module.scss'
import Bulletin from './Bulletin'
import GeneralLaw from './GeneralLaw'
import TwTrend from './TwTrend'
import License from './License'
import Admin from './Admin'
import { useSelector } from 'react-redux'
import { selectUser, selectUserApps } from '../../store/slice/user'
import { isAppPermitted } from '../../store/slice/user'

export interface IUserGreet {
  username: string
  isAuthenticated: boolean
  onLogout: () => void
  onLogin: () => void
}

const UserGreet = (props: IUserGreet) => {
  const userInfo = useSelector(selectUser)
  const appInfo = useSelector(selectUserApps)
  return (
    <>
      <div className={style.userGreet}>
        {
          props.isAuthenticated && <div className={style.btnContainer}>
            {isAppPermitted('info:bulletin', appInfo) && <Bulletin />}
            {isAppPermitted('info:generalLaw', appInfo) && <GeneralLaw />}
            {isAppPermitted('info:twTrend', appInfo) && <TwTrend />}
            {isAppPermitted('info:licenseSta', appInfo) && <License />}
            {isAppPermitted('info:admin', appInfo) && <Admin />}
          </div>
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