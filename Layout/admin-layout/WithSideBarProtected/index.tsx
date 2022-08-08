import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser, setUserProfile } from '../../../store/slice/user'
import { AuthContext } from '../../AuthContext'
import Router from 'next/router'
import api from '../../../api'
import SideBar from '../../../components/SideBar'

const WithSideBarProtected = function <P extends { [k: string]: any }> (Component: React.ComponentType<P>) {
  const wrappedComponent = (props: P) => {
    const dispatch = useDispatch()
    const userInfo = useSelector(selectUser)
    const [isAuthenticated, setisAuthenticated] = useState<boolean>(false)
    useEffect(() => {
      const validateToken = async () => {
        if (userInfo.token === '') {
          setisAuthenticated(false)
          Router.push('/unauthorized')
          return
        }
        const { statusCode, responseContent } = await api.prod.validateToken(userInfo.token)
        if (statusCode === 200) {
          dispatch(
            setUserProfile(responseContent)
          )
          setisAuthenticated(true)
        } else {
          setisAuthenticated(false)
          Router.push('/unauthorized')
        }
      }
      validateToken()
    }, [userInfo.token])
    return (
      <>
        <AuthContext.Provider value={{ isAuthenticated: isAuthenticated }}>
          <div className="admin-page">
            <SideBar />
            <Component {...props} />
          </div>
        </AuthContext.Provider>
      </>
    )
  }
  return wrappedComponent
}

export default WithSideBarProtected
