import Header from '../../../components/Admin/Header'
import WithSideBarProtected from '../../../layout/admin-layout/WithSideBarProtected'
import MUIDataTable from 'mui-datatables'
import api from '../../../api'
import { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { useDispatch } from 'react-redux'
import { onToggle } from '../../../store/slice/sideBar'
import { IUserLogs, IUserLogsProcessed } from '../../../api/prod'
import moment from 'moment'

const columns = [
  { name: 'email' },
  { name: 'entry' },
  { name: 'isSuccessed' },
  { name: 'loginTime' }
]

const processRawLog = (rawLogs: IUserLogs[]) => {
  const output: IUserLogsProcessed[] = []
  rawLogs.forEach((log) => {
    output.push({
      email: log.email,
      entry: log.entry,
      isSuccessed: log.isSuccessed ? '成功' : '失敗',
      loginTime: moment(new Date(log.loginTime)).add(8, 'hour').format('YYYY-MM-DD HH:mm:ss')
    })
  })
  return output
}

const UserLogsContainer = () => {
  const dispatch = useDispatch()
  const [logs, setlogs] = useState<IUserLogsProcessed[]>([])

  const fetchLogsData = async () => {
    const { statusCode, responseContent } = await api.prod.listLoginLogs()
    if (statusCode === 200) {
      setlogs(processRawLog(responseContent))
    }
  }

  useEffect(() => {
    fetchLogsData()
  }, [])

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
            filterType: 'dropdown',
            responsive: 'vertical',
            rowsPerPageOptions: [10]
          }}
        />
      </Box>
    </Box>
  )
}

export default WithSideBarProtected(UserLogsContainer)
