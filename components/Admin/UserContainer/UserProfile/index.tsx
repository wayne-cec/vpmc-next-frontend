import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'
import { Avatar, Grid, Chip, Button, IconButton, Tooltip } from '@mui/material'
import { selectUser } from '../../../../store/slice/user'
import { IRole } from '../../../../api/prod/role'
import { IUserInfo } from '../../../../api/prod'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import AppRegistrationIcon from '@mui/icons-material/AppRegistration'
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone'
import SecurityIcon from '@mui/icons-material/Security'
import LoginIcon from '@mui/icons-material/Login'
import EmailIcon from '@mui/icons-material/Email'
import EditIcon from '@mui/icons-material/Edit'
import style from './index.module.scss'
import api from '../../../../api'
import moment from 'moment'

interface IUserProfile {
  userInfo: IUserInfo | undefined
  isRoleEditing: boolean
  onRoleEdit: (value: boolean) => void
}

const UserProfile = ({
  userInfo, isRoleEditing, onRoleEdit
}: IUserProfile) => {
  const user = useSelector(selectUser)
  const [savable, setsavable] = useState<boolean>(false)
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

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination || !result.source) return
    if (result.destination.droppableId === result.source.droppableId) return

    console.log('drag')
    if (result.destination.droppableId === 'sourceRoles') { // 拉去 source panel
      const extractedRoles = targetRole.filter(r => r.code === result.draggableId)
      const excludedRoles = targetRole.filter(r => r.code !== result.draggableId)
      settargetRole(excludedRoles)
      setsourceRole(prev => prev.concat(extractedRoles))
    } else { // 拉去 target panel
      const extractedRoles = sourceRole.filter(r => r.code === result.draggableId)
      const excludedRoles = sourceRole.filter(r => r.code !== result.draggableId)
      setsourceRole(excludedRoles)
      settargetRole(prev => prev.concat(extractedRoles))
    }
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
    return <div className={style.RoleSettingContainer}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className={style.Panel}>
          <Droppable droppableId='sourceRoles'>
            {
              provided => (
                <div className={style.Source}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {
                    sourceRole.map((role, index) => {
                      return <Draggable draggableId={role.code} index={index} key={index}>
                        {
                          p => (
                            <Chip
                              key={role.code}
                              ref={p.innerRef}
                              {...p.draggableProps}
                              {...p.dragHandleProps}
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
                          )
                        }
                      </Draggable>
                    })
                  }
                  {provided.placeholder}
                </div>
              )
            }
          </Droppable>
          <Droppable droppableId='targetRoles'>
            {
              provided => (
                <div className={style.Target}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {
                    targetRole.map((role, index) => {
                      return <Draggable draggableId={role.code} index={index} key={index}>
                        {
                          p => (
                            <Chip
                              key={role.code}
                              ref={p.innerRef}
                              {...p.draggableProps}
                              {...p.dragHandleProps}
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
                          )
                        }
                      </Draggable>
                    })
                  }
                  {provided.placeholder}
                </div>
              )
            }
          </Droppable>
        </div>
      </DragDropContext>
      <div className={style.Action}>
        <Button color='error' variant='contained'
          sx={{ marginRight: '8px' }}
          onClick={() => { onRoleEdit(false) }}
        >
          取消
        </Button>
        <Button color='secondary' variant='contained'
          onClick={() => { onRoleEdit(false) }}
          disabled={!savable}
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
