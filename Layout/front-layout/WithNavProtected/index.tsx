import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser, setUserProfile } from '../../../store/slice/user'
import { AuthContext } from '../../AuthContext'
import Header from '../../../components/Header'
import api from '../../../api'
import Router from 'next/router'

const WithNavProtected = function <P extends { [k: string]: any }> (Component: React.ComponentType<P>) {
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
        console.log(responseContent)
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
          <Header />
          <div className="content-container">
            <Component {...props} />
          </div>
        </AuthContext.Provider>
      </>
    )
  }
  return wrappedComponent
}

export default WithNavProtected
