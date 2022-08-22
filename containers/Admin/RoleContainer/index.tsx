import Header from '../../../components/Admin/Header'
import WithSideBarProtected from '../../../layout/admin-layout/WithSideBarProtected'
import { Box } from '@mui/material'
import { useDispatch } from 'react-redux'
import { onToggle } from '../../../store/slice/sideBar'

const RoleContainer = () => {
  const dispatch = useDispatch()
  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Header
        title="角色權限管理"
        onDrawerToggle={() => {
          dispatch(onToggle(true))
        }}
      />
      <Box sx={{ flex: 1, py: 6, px: 4, bgcolor: '#eaeff1' }}>
      </Box>
    </Box>
  )
}

export default WithSideBarProtected(RoleContainer)
