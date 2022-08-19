import Header from '../../../components/Admin/Header'
import WithSideBarProtected from '../../../layout/admin-layout/WithSideBarProtected'
import { Box, Paper } from '@mui/material'
import { useDispatch } from 'react-redux'
import { onToggle } from '../../../store/slice/sideBar'
import { IUserManageProps } from '../../../pages/admin/user'
import { useTheme } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import style from './index.module.scss'

const UserContainer = ({
  userInfo
}: IUserManageProps) => {
  const dispatch = useDispatch()
  const theme = useTheme()
  const isBreakPointHit = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header
        title="使用者管理"
        onDrawerToggle={() => {
          dispatch(onToggle(true))
        }}
      />
      <Box sx={{
        flex: 1, py: 6, px: 4, bgcolor: '#eaeff1', height: '1%',
        display: 'flex', flexDirection: { md: 'row', sm: 'column-reverse' }
      }}>

        <Box sx={{
          flex: 0.7, px: { md: 4, sm: 0 }, overflowY: 'auto',
          height: '100%', direction: 'rtl'
        }}>
          {
            Array.apply(null, Array(20)).map((user, index) => {
              return <Box
                key={index}
                sx={{
                  width: '100%', height: '120px', mt: 2,
                  cursor: 'pointer', borderRadius: '8px', bgcolor: 'black'
                }}
              >
              </Box>
            })
          }

        </Box>

        <Paper sx={{ flex: 0.3, bgcolor: '#b7bbbd', borderRadius: '8px' }}>

        </Paper>

      </Box>
    </Box>
  )
}

export default WithSideBarProtected(UserContainer)
