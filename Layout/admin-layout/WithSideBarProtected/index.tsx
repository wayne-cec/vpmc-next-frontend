import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser, setUserProfile, setUserRoles } from '../../../store/slice/user'
import { AuthContext } from '../../AuthContext'
import { onToggle, selectSideBarConfig } from '../../../store/slice/sideBar'
import { useTheme } from '@mui/material'
import Router from 'next/router'
import api from '../../../api'
import SideBar from '../../../components/SideBar'
import useMediaQuery from '@mui/material/useMediaQuery'
import { CssBaseline, Box } from '@mui/material'

export const drawerWidth = 256

const RwdSideBar = ({
  toggled,
  isBreakPointHit,
}: {
  toggled: boolean
  isBreakPointHit: boolean
}) => {
  const dispatch = useDispatch()
  return (
    <>
      {isBreakPointHit ? (
        <SideBar
          PaperProps={{ style: { width: drawerWidth } }}
          sx={{ display: { sm: 'flex', flexDirection: 'column', justifyContent: 'space-between', xs: 'none' } }}
        />
      ) : (
        <SideBar
          PaperProps={{ style: { width: drawerWidth } }}
          variant="temporary"
          open={toggled}
          onClose={() => {
            dispatch(onToggle(false))
          }}
        />
      )}
    </>
  )
}

const WithSideBarProtected = function <P extends { [k: string]: any }> (Component: React.ComponentType<P>) {
  const wrappedComponent = (props: P) => {
    const theme = useTheme()
    const dispatch = useDispatch()
    const userInfo = useSelector(selectUser)
    const { toggled } = useSelector(selectSideBarConfig)
    const isBreakPointHit = useMediaQuery(theme.breakpoints.up('md'))
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
          const { statusCode2, responseContent2 } = await api.prod.listRoles(userInfo.token)
          if (statusCode2 === 200) {
            dispatch(
              setUserRoles(responseContent2)
            )
          }
        } else {
          setisAuthenticated(false)
          Router.push('/unauthorized')
        }
      }
      validateToken()
    }, [userInfo.token])
    return (
      <AuthContext.Provider value={{ isAuthenticated: isAuthenticated }}>
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
          <CssBaseline />
          <RwdSideBar toggled={toggled} isBreakPointHit={isBreakPointHit} />
          <Component {...props} />
        </Box>
      </AuthContext.Provider>
    )
  }
  return wrappedComponent
}

export default WithSideBarProtected
