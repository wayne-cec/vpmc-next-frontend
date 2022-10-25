import Header from '../../../components/Admin/Header'
import WithSideBarProtected from '../../../Layout/admin-layout/WithSideBarProtected'
import MUIDataTable, { MUIDataTableColumnDef } from 'mui-datatables'
import { Box } from '@mui/material'
import { useDispatch } from 'react-redux'
import { onToggle } from '../../../store/slice/sideBar'
import { IUserLogsProcessed } from '../../../api/prod'

const columns: MUIDataTableColumnDef[] = [
  { name: 'email', label: '使用者' },
  { name: 'entry', label: '登入方式' },
  { name: 'isSuccessed', label: '狀態' },
  { name: 'loginTime', label: '時間', options: { sortDirection: 'asc' } }
]

const UserLogsContainer = ({ logs }: { logs: IUserLogsProcessed[] }) => {
  const dispatch = useDispatch()
  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Header
        title="使用者日誌"
        onDrawerToggle={() => {
          dispatch(onToggle(true))
        }}
      />
      <Box sx={{ flex: 1, py: 6, px: 4, bgcolor: '#eaeff1' }}>
        <MUIDataTable
          title={'登入紀錄'}
          data={logs}
          columns={columns}
          options={{
            responsive: 'vertical',
            filterType: 'dropdown',
            rowsPerPageOptions: [5]
          }}
        />
      </Box>
    </Box>
  )
}

export default WithSideBarProtected(UserLogsContainer)
