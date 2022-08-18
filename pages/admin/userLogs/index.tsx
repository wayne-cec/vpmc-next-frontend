import React from 'react'
import UserLogsContainer from '../../../containers/Admin/UserLogsContainer'
import { ThemeProvider } from '@mui/material'
import theme from '../../../styles/theme'

const UserLogs = () => {
  return <ThemeProvider theme={theme}>
    <UserLogsContainer />
  </ThemeProvider>
}

export default UserLogs
