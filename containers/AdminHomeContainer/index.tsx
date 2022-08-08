import Header from '../../components/Admin/Header'
import WithSideBarProtected from '../../layout/admin-layout/WithSideBarProtected'
import { Box, Typography, Link } from '@mui/material'
import { useDispatch } from 'react-redux'
import { onToggle } from '../../store/slice/sideBar'

function Copyright () {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      <Link color="inherit" href="https://mui.com/">
        NADI Crop.
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  )
}

const AdminHomeContainer = () => {
  const dispatch = useDispatch()
  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Header
        title="Home"
        onDrawerToggle={() => {
          dispatch(onToggle(true))
        }}
      />
      <Box component="main" sx={{ flex: 1, py: 6, px: 4, bgcolor: '#eaeff1' }}>
        {/* <Content /> */}
      </Box>
      <Box component="footer" sx={{ p: 2, bgcolor: '#eaeff1' }}>
        <Copyright />
      </Box>
    </Box>
  )
}

export default WithSideBarProtected(AdminHomeContainer)
