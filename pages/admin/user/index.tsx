import React from 'react'
import UserContainer from '../../../containers/Admin/UserContainer'
import { ThemeProvider } from '@mui/material'
import theme from '../../../styles/theme'

const User = () => {
  return <ThemeProvider theme={theme}>
    <UserContainer />
  </ThemeProvider>
}

export default User
