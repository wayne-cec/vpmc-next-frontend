import { IRoleWithApp } from '../../../../api/prod'
import style from './index.module.scss'
import PersonIcon from '@mui/icons-material/Person'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

interface IRoleHeader {
  roleInfo: IRoleWithApp
}

const RoleHeader = ({
  roleInfo
}: IRoleHeader) => {
  return (
    <div className={style.RoleHeader}>
      <div className={style.Header}>
        <AccountCircleIcon sx={{ width: '40px', height: '40px' }} />
        <p>{roleInfo.name}</p>
      </div>
      <div className={style.ChipContainer}>
        {
          roleInfo.apps.map((app, index) => {
            return <div
              key={index}
              className={style.Chip}
            >
              {app.name}
            </div>
          })
        }
      </div>
    </div>
  )
}

export default RoleHeader
