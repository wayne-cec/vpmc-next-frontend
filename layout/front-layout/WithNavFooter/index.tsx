import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser, setUserProfile, setUserRoles } from '../../../store/slice/user'
import { AuthContext } from '../../AuthContext'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import api from '../../../api'

const WithNavFooter = function <P extends { [k: string]: any }> (Component: React.ComponentType<P>) {
  const wrappedComponent = (props: P) => {
    const dispatch = useDispatch()
    const userInfo = useSelector(selectUser)
    const [isAuthenticated, setisAuthenticated] = useState<boolean>(false)
    useEffect(() => {
      const validateAndUpdateInfo = async () => {
        if (userInfo.token === '') {
          setisAuthenticated(false)
          return
        }
        const { statusCode, responseContent } = await api.prod.validateToken(userInfo.token)
        // console.log(responseContent)
        if (statusCode === 200) {
          dispatch(
            setUserProfile(responseContent)
          )
          setisAuthenticated(true)
          const { statusCode2, responseContent2 } = await api.prod.listRoles(userInfo.token)
          if (statusCode2 === 200) {
            dispatch(
              setUserRoles(responseContent2)
            )
          }
        } else {
          setisAuthenticated(false)
        }
      }
      validateAndUpdateInfo()
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

export default WithNavFooter
