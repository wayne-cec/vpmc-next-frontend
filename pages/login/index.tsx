import type { NextPage } from 'next'
import { WithNothingLayout } from '../../layout/BaseLayout'
import LoginContainer from '../../containers/LoginContainer'

const Login: NextPage = () => {
  return (
    <LoginContainer />
  )
}

export default WithNothingLayout(Login)
