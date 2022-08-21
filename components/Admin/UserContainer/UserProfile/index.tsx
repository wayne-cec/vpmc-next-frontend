import { IUserInfo } from '../../../../api/prod'
import style from './index.module.scss'
import { Avatar, Grid, Chip, Button, IconButton, Tooltip } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'
import moment from 'moment'
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone'
import LoginIcon from '@mui/icons-material/Login'
import AppRegistrationIcon from '@mui/icons-material/AppRegistration'
import SecurityIcon from '@mui/icons-material/Security'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import { useState } from 'react'
import api from '../../../../api'
import { useSelector } from 'react-redux'
import { selectUser } from '../../../../store/slice/user'
import { IRole } from '../../../../api/prod/role'

interface IUserProfile {
  userInfo: IUserInfo | undefined
  isRoleEditing: boolean
  onRoleEdit: (value: boolean) => void
}

const UserProfile = ({
  userInfo, isRoleEditing, onRoleEdit
}: IUserProfile) => {
  const user = useSelector(selectUser)
  const [sourceRole, setsourceRole] = useState<IRole[]>([])
  const [targetRole, settargetRole] = useState<IRole[]>([])

  const handleRoleEdit = async () => {
    onRoleEdit(true)
    const userRoles = userInfo?.roles?.map((role) => {
      return {
        name: role.name,
        code: role.code
      } as IRole
    })
    if (!userRoles) return
    settargetRole(userRoles)
    const { statusCode, responseContent } = await api.prod.listAllRole(user.token)
    if (statusCode === 200) {
      const unOwnedRoles = filterUserRole(responseContent, userRoles)
      setsourceRole(unOwnedRoles)
    }
  }

  const filterUserRole = (allRoles: IRole[], userRoles: IRole[]): IRole[] => {
    const userRoleCode = userRoles.map(r => r.code)
    const unOwnedRoles = allRoles.filter((r) => {
      if (!userRoleCode.includes(r.code))
        return r
    })
    return unOwnedRoles
  }

  const renderRoleState = () => {
    return <div className={style.RoleInfoConatiner}>
      <Grid container spacing={2}>
        <Grid item xs={6} sx={{ display: 'flex', alignItems: 'flex-start', color: 'gray' }}>
          <SecurityIcon />
          <p>使用者權限</p>
        </Grid>
        <Grid item xs={6}>
          <Grid container spacing={2} sx={{ display: 'flex', alignItems: 'center' }}>
            {
              userInfo?.roles.map((role, index) => {
                return <Grid item key={index}>
                  <Chip
                    label={role.name}
                    color={role.code === 'admin:root' ? 'secondary' : 'primary'}
                  />
                </Grid>
              })
            }
            <Grid item>
              <Tooltip title='編輯使用者權限'>
                <IconButton color="primary" onClick={handleRoleEdit}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  }

  const renderRoleSetting = () => {
    return <div
      className={style.RoleSettingContainer}
    >
      <div className={style.Panel}>
        <div className={style.Source}>
          {
            sourceRole.map((role, index) => {
              return <Chip
                key={index}
                label={role.name}
                color={role.code === 'admin:root' ? 'secondary' : 'primary'}
                sx={{
                  margin: '2px', cursor: 'pointer', userSelect: 'none',
                  transition: '0.3s',
                  '&:hover': {
                    opacity: 0.6
                  }
                }}
              />
            })
          }
        </div>
        <div className={style.Target}>
          {
            targetRole.map((role, index) => {
              return <Chip
                key={index}
                label={role.name}
                color={role.code === 'admin:root' ? 'secondary' : 'primary'}
                sx={{
                  margin: '2px', cursor: 'pointer', userSelect: 'none',
                  transition: '0.3s',
                  '&:hover': {
                    opacity: 0.6
                  }
                }}
              />
            })
          }
        </div>
      </div>
      <div className={style.Action}>
        <Button color='error' variant='contained'
          sx={{ marginRight: '8px' }}
          onClick={() => { onRoleEdit(false) }}
        >
          取消
        </Button>
        <Button color='secondary' variant='contained'
          onClick={() => { onRoleEdit(false) }}
        >
          儲存
        </Button>
      </div>
    </div>
  }

  return (
    <div className={style.UserProfile}>
      <div className={style.AvatarContainer}>
        <Avatar
          alt={userInfo?.email}
          src={userInfo?.thumbnails.length === 0 ? `/avatar/fakeAvatar-0.png` : userInfo?.thumbnails[0]}
          sx={{ width: 128, height: 128 }}
        />
      </div>
      {
        userInfo &&
        <div className={style.InfoConatiner}>
          <Grid container spacing={2}>
            <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center', color: 'gray' }}>
              <EmailIcon />
              <p>電子郵件</p>
            </Grid>
            <Grid item xs={6}>
              <p>{userInfo.email}</p>
            </Grid>
            <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center', color: 'gray' }}>
              <PhoneIphoneIcon />
              <p>手機號碼</p>
            </Grid>
            <Grid item xs={6}>
              <p>{userInfo.phoneNumber}</p>
            </Grid>
            <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center', color: 'gray' }}>
              <LoginIcon />
              <p>上次登入時間</p>
            </Grid>
            <Grid item xs={6}>
              <p>{moment(new Date(userInfo.lastLoginTime)).add(8, 'hour').format('YYYY-MM-DD HH:mm:ss')}</p>
            </Grid>
            <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center', color: 'gray' }}>
              <AppRegistrationIcon />
              <p>加入時間</p>
            </Grid>
            <Grid item xs={6}>
              <p>{moment(new Date(userInfo.createdDate)).add(8, 'hour').format('YYYY-MM-DD HH:mm:ss')}</p>
            </Grid>
          </Grid>
        </div>
      }
      {
        userInfo && !isRoleEditing && renderRoleState()
      }
      {
        userInfo && isRoleEditing && renderRoleSetting()
      }
    </div>
  )
}

export default UserProfile
