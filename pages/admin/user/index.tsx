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
  const newData = responseContent.map((user) => {
    user.thumbnails = [`/avatar/fakeAvatar-3.png`]
    return user
  })
  return {
    props: {
      userInfo: newData
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
