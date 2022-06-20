import React, { useState, useEffect, createContext, useContext } from 'react'
import Header from '../../containers/Header'
import Footer from '../../containers/Footer'
import classNames from 'classnames'
import style from './index.module.scss'
import 'animate.css'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser, setUserProfile } from '../../store/slice/user'
import api from '../../api'
import Router from 'next/router'

export const AuthContext = createContext<{ isAuthenticated: boolean }>({ isAuthenticated: false })
export const useAuth = () => {
  return useContext(AuthContext)
}

export interface ILayoutProps {
  children: React.ReactNode
}

export const WithNavFooter = function <P extends { [k: string]: any }> (Component: React.ComponentType<P>) {
  const wrappedComponent = (props: P) => {
    const dispatch = useDispatch()
    const userInfo = useSelector(selectUser)
    const [isAuthenticated, setisAuthenticated] = useState<boolean>(false)
    useEffect(() => {
      const validateToken = async () => {
        if (userInfo.token === '') {
          setisAuthenticated(false)
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
          <Footer />
        </AuthContext.Provider>
      </>
    )
  }
  return wrappedComponent
}

export const WithNavFooterProtected = function <P extends { [k: string]: any }> (Component: React.ComponentType<P>) {
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
          <Header />
          <div className="content-container">
            <Component {...props} />
          </div>
          <Footer />
        </AuthContext.Provider>
      </>
    )
  }
  return wrappedComponent
}

export const WithNothingLayout = function <P extends { [k: string]: any }> (Component: React.ComponentType<P>) {
  const wrappedComponent = (props: P) => {
    return <Component {...props} />
  }
  return wrappedComponent
}
