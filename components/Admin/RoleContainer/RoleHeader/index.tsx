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

        {/* <Typography></Typography> */}
        <p><AccountCircleIcon sx={{ width: '55px', height: '55px' }} />{roleInfo.name}</p>
      </div>
    </div>
  )
}

export default RoleHeader
