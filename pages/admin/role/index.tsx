import React from 'react'
import RoleContainer from '../../../containers/Admin/RoleContainer'
import { ThemeProvider } from '@mui/material'
import theme from '../../../styles/theme'
import { GetServerSideProps, NextPage } from 'next'
import api from '../../../api'
import { IRole } from '../../../api/prod'

export interface IRoleManageProps {
  roles: IRole[]
}

export const getServerSideProps: GetServerSideProps<IRoleManageProps, {}> = async () => {
  const { responseContent } = await api.prod.listAllRole()
  return {
    props: {
      roles: responseContent
    }
  }
}

const Role: NextPage<IRoleManageProps> = (props) => {
  return <ThemeProvider theme={theme}>
    <RoleContainer {...props} />
  </ThemeProvider>
}

export default Role
