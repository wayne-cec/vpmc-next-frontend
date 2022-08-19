import React from 'react'
import UserContainer from '../../../containers/Admin/UserContainer'
import { ThemeProvider } from '@mui/material'
import theme from '../../../styles/theme'
import { GetServerSideProps, NextPage } from 'next'
import api from '../../../api'
import { IUserInfo } from '../../../api/prod/user'

export interface IUserManageProps {
  userInfo: IUserInfo[]
}

export const getServerSideProps: GetServerSideProps<IUserManageProps, {}> = async () => {
  const { responseContent } = await api.prod.listUsers()
  return {
    props: {
      userInfo: responseContent
    }
  }
}

const User: NextPage<IUserManageProps> = ({
  userInfo
}) => {
  return <ThemeProvider theme={theme}>
    <UserContainer userInfo={userInfo} />
  </ThemeProvider>
}

export default User
