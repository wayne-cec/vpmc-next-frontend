import React from 'react'
import FunctionsContainer from '../../../containers/Admin/FunctionsContainer'
import { ThemeProvider } from '@mui/material'
import theme from '../../../styles/theme'

const Functions = () => {
  return <ThemeProvider theme={theme}>
    <FunctionsContainer />
  </ThemeProvider>
}

export default Functions
