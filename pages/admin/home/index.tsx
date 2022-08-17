import React from 'react'
import AdminHomeContainer from '../../../containers/Admin/HomeContainer'
import { ThemeProvider } from '@mui/material'
import theme from '../../../styles/theme'

const Home = () => {
  return <ThemeProvider theme={theme}>
    <AdminHomeContainer />
  </ThemeProvider>
}

export default Home
