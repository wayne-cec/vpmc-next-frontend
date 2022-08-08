import * as React from 'react'
import Divider from '@mui/material/Divider'
import Drawer, { DrawerProps } from '@mui/material/Drawer'
import List from '@mui/material/List'
import Box from '@mui/material/Box'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import HomeIcon from '@mui/icons-material/Home'
import PeopleIcon from '@mui/icons-material/People'
import DnsRoundedIcon from '@mui/icons-material/DnsRounded'
import PermMediaOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActual'
import PublicIcon from '@mui/icons-material/Public'
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet'
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent'
import TimerIcon from '@mui/icons-material/Timer'
import SettingsIcon from '@mui/icons-material/Settings'
import PhonelinkSetupIcon from '@mui/icons-material/PhonelinkSetup'
import { drawerWidth } from '../../layout/admin-layout/WithSideBarProtected'
import { useSelector, useDispatch } from 'react-redux'
import { selectSideBarConfig } from '../../store/slice/sideBar'
import { onPageChange, onToggle } from '../../store/slice/sideBar'
import { AdminPageType } from '../../store/slice/sideBar'
import Router from 'next/router'

const categories: {
  id: string
  children: { id: AdminPageType; alias: string; icon: React.ReactNode }[]
}[] = [
    {
      id: 'Build',
      children: [
        { id: 'authentication', icon: <PeopleIcon />, alias: 'Authentication' },
        { id: 'database', icon: <DnsRoundedIcon />, alias: 'Database' },
        { id: 'storage', icon: <PermMediaOutlinedIcon />, alias: 'Storage' },
        { id: 'hosting', icon: <PublicIcon />, alias: 'Hosting' },
        { id: 'functions', icon: <SettingsEthernetIcon />, alias: 'Functions' },
        { id: 'ml', icon: <SettingsInputComponentIcon />, alias: 'Machine learning' },
      ],
    },
    {
      id: 'Quality',
      children: [
        { id: 'analytics', icon: <SettingsIcon />, alias: 'Analytics' },
        { id: 'performance', icon: <TimerIcon />, alias: 'Performance' },
        { id: 'testlab', icon: <PhonelinkSetupIcon />, alias: 'Test Lab' },
      ],
    },
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
            NADI Cloud
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
              <ListItemText>Home</ListItemText>
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
      </Drawer>
    </Box>
  )
}
