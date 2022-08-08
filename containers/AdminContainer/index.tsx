import style from './index.module.scss'
import WithSideBarProtected from '../../layout/admin-layout/WithSideBarProtected'

const AdminContainer = () => {

  return (
    <div className={style.AdminContainer}>
      aaa
    </div>
  )
}

export default WithSideBarProtected(AdminContainer)
