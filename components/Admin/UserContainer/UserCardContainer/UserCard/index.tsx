import { Grid, Avatar, useTheme } from '@mui/material'
import style from './index.module.scss'
import { IUserInfo } from '../../../../../api/prod'
import className from 'classnames'
import moment from 'moment'

const getRandomArbitrary = (min: number, max: number) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

interface IUserCard {
  id: string | undefined
  userInfo: IUserInfo
  onClick: (id: string) => void
}

const UserCard = ({
  id, userInfo,
  onClick
}: IUserCard) => {
  const theme = useTheme()
  return (
    <div className={className({
      [style.UserCard]: true,
      [style.selected]: id === userInfo.userId
    })}
      onClick={() => {
        onClick(userInfo.userId)
      }}
    >
      <Grid container spacing={2} sx={{ direction: 'ltr' }}>

        <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Avatar
            alt={userInfo.email}
            src={userInfo.thumbnails.length === 0 ? `/avatar/fakeAvatar-0.png` : userInfo.thumbnails[0]}
            sx={{ width: 96, height: 96 }}
          />
        </Grid>

        <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
          <p>{userInfo.email}</p>
        </Grid>

        <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
          <p>{userInfo.phoneNumber}</p>
        </Grid>

        <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
          <p>{moment(new Date(userInfo.lastLoginTime)).add(8, 'hour').format('YYYY-MM-DD HH:mm:ss')}</p>
        </Grid>

      </Grid>
    </div>
  )
}

export default UserCard
