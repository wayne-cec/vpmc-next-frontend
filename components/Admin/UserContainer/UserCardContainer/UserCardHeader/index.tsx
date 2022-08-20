import style from './index.module.scss'
import { Grid } from '@mui/material'

const UserCardHeader = () => {
  return (
    <div className={style.UserCardHeader}>
      <Grid container spacing={2} sx={{ direction: 'ltr' }}>

        <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p></p>
        </Grid>

        <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
          <p className={style.head}>使用者</p>
        </Grid>

        <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
          <p className={style.head}>手機號碼</p>
        </Grid>

        <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
          <p className={style.head}>上次登入時間</p>
        </Grid>

      </Grid>
    </div>
  )
}

export default UserCardHeader
