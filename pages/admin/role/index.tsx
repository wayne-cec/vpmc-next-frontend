import React from 'react'
import RoleContainer from '../../../containers/Admin/RoleContainer'
import { ThemeProvider } from '@mui/material'
import theme from '../../../styles/theme'

const Role = () => {
  return <ThemeProvider theme={theme}>
    <RoleContainer />
  </ThemeProvider>
}

export default Role
