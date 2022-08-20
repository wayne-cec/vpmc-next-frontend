import { IUserInfo } from '../../../../api/prod'
import style from './index.module.scss'
import { Avatar, Grid, Chip, Button } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'
import moment from 'moment'
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone'
import LoginIcon from '@mui/icons-material/Login'
import AppRegistrationIcon from '@mui/icons-material/AppRegistration'
import SecurityIcon from '@mui/icons-material/Security'
import AddIcon from '@mui/icons-material/Add'

interface IUserProfile {
  userInfo: IUserInfo | undefined
}

const UserProfile = ({ userInfo }: IUserProfile) => {
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
        userInfo && <>
          <div className={style.InfoConatiner}>
            <Grid container spacing={2}>
              <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
                <EmailIcon />
                <p>電子郵件</p>
              </Grid>
              <Grid item xs={6}>
                <p>{userInfo.email}</p>
              </Grid>
              <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
                <PhoneIphoneIcon />
                <p>手機號碼</p>
              </Grid>
              <Grid item xs={6}>
                <p>{userInfo.phoneNumber}</p>
              </Grid>
              <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
                <LoginIcon />
                <p>上次登入時間</p>
              </Grid>
              <Grid item xs={6}>
                <p>{moment(new Date(userInfo.lastLoginTime)).add(8, 'hour').format('YYYY-MM-DD HH:mm:ss')}</p>
              </Grid>
              <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
                <AppRegistrationIcon />
                <p>加入時間</p>
              </Grid>
              <Grid item xs={6}>
                <p>{moment(new Date(userInfo.createdDate)).add(8, 'hour').format('YYYY-MM-DD HH:mm:ss')}</p>
              </Grid>
            </Grid>
          </div>

          <div className={style.RoleInfoConatiner}>
            <Grid container spacing={2}>
              <Grid item xs={6} sx={{ display: 'flex' }}>
                <SecurityIcon />
                <p>使用者權限</p>
              </Grid>
              <Grid item xs={6}>
                <Grid container spacing={2}>
                  {
                    userInfo.roles.map((role, index) => {
                      return <Grid item key={index}>
                        <Chip label={role.name} />
                      </Grid>
                    })
                  }
                  <Grid item>
                    <Button
                      variant='outlined'
                      startIcon={<AddIcon />}
                    ></Button>
                  </Grid>

                </Grid>
              </Grid>
            </Grid>
          </div>
        </>
      }
    </div>
  )
}

export default UserProfile
