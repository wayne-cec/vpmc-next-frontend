import Header from '../../../components/Admin/Header'
import WithSideBarProtected from '../../../layout/admin-layout/WithSideBarProtected'
import { Box, Paper } from '@mui/material'
import { useDispatch } from 'react-redux'
import { onToggle } from '../../../store/slice/sideBar'
import { IUserManageProps } from '../../../pages/admin/user'
import { useTheme } from '@mui/material'
import { useState } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'
import UserCard from '../../../components/Admin/UserContainer/UserCardContainer/UserCard'
import UserProfile from '../../../components/Admin/UserContainer/UserProfile'
import UserCardContainer from '../../../components/Admin/UserContainer/UserCardContainer'
import UserCardHeader from '../../../components/Admin/UserContainer/UserCardContainer/UserCardHeader'

const UserContainer = ({
  userInfo
}: IUserManageProps) => {
  const dispatch = useDispatch()
  const theme = useTheme()
  const isBreakPointHit = useMediaQuery(theme.breakpoints.up('md'))
  const [selectedUserId, setselectedUserId] = useState<string | undefined>(undefined)
  const [isRoleEditing, setisRoleEditing] = useState<boolean>(false)

  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header
        title="使用者管理"
        onDrawerToggle={() => {
          dispatch(onToggle(true))
        }}
      />
      <Box sx={{
        flex: 1, py: 6, px: 4, bgcolor: '#eaeff1', height: '1%',
        display: 'flex', flexDirection: { md: 'row', sm: 'column-reverse', xs: 'column-reverse' }
      }}>
        <UserCardContainer>
          <UserCardHeader />
          {
            userInfo.map((user, index) => {
              return <UserCard
                key={index}
                userInfo={user}
                id={selectedUserId}
                onClick={(id) => {
                  setselectedUserId(id)
                  setisRoleEditing(false)
                }}
              />
            })
          }
        </UserCardContainer>
        <UserProfile
          userInfo={userInfo.filter(u => u.userId === selectedUserId).at(0)}
          isRoleEditing={isRoleEditing}
          onRoleEdit={(value) => {
            setisRoleEditing(value)
          }}
        />
      </Box>
    </Box>
  )
}

export default WithSideBarProtected(UserContainer)
