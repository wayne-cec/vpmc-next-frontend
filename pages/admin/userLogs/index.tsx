import React from 'react'
import UserLogsContainer from '../../../containers/Admin/UserLogsContainer'
import { ThemeProvider } from '@mui/material'
import theme from '../../../styles/theme'
import api from '../../../api'
import { IUserLogs, IUserLogsProcessed } from '../../../api/prod'
import moment from 'moment'
import { GetServerSideProps, NextPage } from 'next'

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

const fetchLogsData = async () => {
  const { statusCode, responseContent } = await api.prod.listLoginLogs()
  if (statusCode === 200) {
    return processRawLog(responseContent)
  }
  return []
}

interface IUserLogsContainerProps {
  logs: IUserLogsProcessed[]
}

export const getServerSideProps: GetServerSideProps<IUserLogsContainerProps, {}> = async () => {
  const logs = await fetchLogsData()
  return {
    props: {
      logs: logs
    }
  }
}

const UserLogs: NextPage<IUserLogsContainerProps> = ({
  logs
}) => {
  return <ThemeProvider theme={theme}>
    <UserLogsContainer logs={logs} />
  </ThemeProvider>
}

export default UserLogs
