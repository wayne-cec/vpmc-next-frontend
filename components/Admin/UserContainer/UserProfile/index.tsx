import { IUserInfo } from '../../../../api/prod'
import style from './index.module.scss'
import { Avatar, Grid } from '@mui/material'

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
      <div className={style.InfoConatiner}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <p>電子郵件</p>
          </Grid>
          <Grid item xs={6}>

            <p>{userInfo?.email}</p>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default UserProfile
