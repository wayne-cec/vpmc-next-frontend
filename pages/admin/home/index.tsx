import React from 'react'
import HomeContainer from '../../../containers/Admin/HomeContainer'
import { ThemeProvider } from '@mui/material'
import theme from '../../../styles/theme'

const Home = () => {
  return <ThemeProvider theme={theme}>
    <HomeContainer />
  </ThemeProvider>
}

export default Home
