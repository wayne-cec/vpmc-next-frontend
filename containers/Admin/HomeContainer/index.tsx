import Header from '../../../components/Admin/Header'
import WithSideBarProtected from '../../../layout/admin-layout/WithSideBarProtected'
import { Box, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { onToggle } from '../../../store/slice/sideBar'
import Image from 'next/image'

const HomeContainer = () => {
  const dispatch = useDispatch()
  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      {/* <Header
        title="個人資訊"
        onDrawerToggle={() => {
          dispatch(onToggle(true))
        }}
      /> */}
      <Box sx={{
        flex: 1, py: 6, px: 4, bgcolor: '#009BE5',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Image src={'/404.png'} width="256px" height="256px" />
        <Typography variant="h3" color="white" sx={{ userSelect: 'none', margin: '1rem 0' }}>
          頁面建設中
        </Typography>
      </Box>
    </Box>
  )
}

export default WithSideBarProtected(HomeContainer)
