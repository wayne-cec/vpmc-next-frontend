import * as React from 'react'
import Divider from '@mui/material/Divider'
import Drawer, { DrawerProps } from '@mui/material/Drawer'
import ListItemButton from '@mui/material/ListItemButton'
import TouchAppIcon from '@mui/icons-material/TouchApp'
import SecurityIcon from '@mui/icons-material/Security'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import VpnKeyIcon from '@mui/icons-material/VpnKey'
import PeopleIcon from '@mui/icons-material/People'
import HomeIcon from '@mui/icons-material/Home'
import ListItem from '@mui/material/ListItem'
import List from '@mui/material/List'
import Box from '@mui/material/Box'
import Router from 'next/router'
import LogoutIcon from '@mui/icons-material/Logout'
import { drawerWidth } from '../../layout/admin-layout/WithSideBarProtected'
import { useSelector, useDispatch } from 'react-redux'
import { selectSideBarConfig } from '../../store/slice/sideBar'
import { onPageChange, onToggle } from '../../store/slice/sideBar'
import { AdminPageType } from '../../store/slice/sideBar'
import { setUserToken } from '../../store/slice/user'
import { Button } from '@mui/material'

const categories: {
  id: string
  children: { id: AdminPageType; alias: string; icon: React.ReactNode }[]
}[] = [
    {
      id: '使用者與權限設定',
      children: [
        { id: 'userLogs', icon: <VpnKeyIcon />, alias: '使用者日誌' },
        { id: 'user', icon: <PeopleIcon />, alias: '使用者管理' },
        { id: 'role', icon: <SecurityIcon />, alias: '角色權限管理' }
      ]
    },
    {
      id: '應用程式設定',
      children: [
        { id: 'functions', icon: <TouchAppIcon />, alias: '功能列表' }
      ]
    }
  ]

const item = {
  py: '2px',
  px: 3,
  color: 'rgba(255, 255, 255, 0.7)',
  '&:hover, &:focus': {
    bgcolor: 'rgba(255, 255, 255, 0.08)',
  },
}

const itemCategory = {
  boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
  py: 1.5,
  px: 3,
}

export default function SideBar (props: DrawerProps) {
  const dispatch = useDispatch()
  const { page } = useSelector(selectSideBarConfig)
  const { ...other } = props

  const switchRoute = (childId: AdminPageType) => {
    dispatch(onPageChange(childId))
    Router.push(`/admin/${childId}`)
    dispatch(onToggle(false))
  }

  return (
    <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { sm: 0 } }}>
      <Drawer variant="permanent" {...other}>
        <List disablePadding>
          <ListItem sx={{ ...item, ...itemCategory, fontSize: 22, color: '#fff' }}>
            VPMC後台管理系統
          </ListItem>
          <ListItem sx={{ ...item, ...itemCategory }}>
            <ListItemButton
              selected={page === 'home'}
              onClick={() => {
                switchRoute('home')
              }}
            >
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText>個人資訊</ListItemText>
            </ListItemButton>
          </ListItem>
          {categories.map(({ id, children }) => (
            <Box key={id} sx={{ bgcolor: '#101F33' }}>
              <ListItem sx={{ py: 2, px: 3 }}>
                <ListItemText sx={{ color: '#fff' }}>{id}</ListItemText>
              </ListItem>
              {children.map(({ id: childId, icon, alias }) => (
                <ListItem disablePadding key={childId}>
                  <ListItemButton
                    selected={page === childId}
                    sx={item}
                    onClick={() => {
                      switchRoute(childId)
                    }}
                  >
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText>{alias}</ListItemText>
                  </ListItemButton>
                </ListItem>
              ))}
              <Divider sx={{ mt: 2 }} />
            </Box>
          ))}
        </List>

        <List disablePadding>
          <Box sx={{ bgcolor: '#101F33' }}>
            <ListItem sx={{
              ...item, ...itemCategory, fontSize: 22, color: '#fff',
              display: 'flex', justifyContent: 'space-around'
            }}>
              <Button variant='outlined' onClick={() => {
                Router.push('/')
              }}>
                前端平台
              </Button>
              <Button variant='contained' onClick={() => {
                dispatch(
                  setUserToken('')
                )
                Router.push('/login')
              }} startIcon={<LogoutIcon />}>
                登出
              </Button>
            </ListItem>
            <Divider sx={{ mt: 2 }} />
          </Box>
        </List>

      </Drawer>
    </Box>
  )
}
