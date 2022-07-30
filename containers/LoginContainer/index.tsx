import type { NextPage } from 'next'
import style from './index.module.scss'
import classNames from 'classnames'
import VpnKeyIcon from '@mui/icons-material/VpnKey'
import Router from 'next/router'
import api from '../../api'
import Image from 'next/image'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUserToken } from '../../store/slice/user'
import {
  Button, Container, Box,
  Avatar, Typography, TextField
} from '@mui/material'

const LoginContainer = () => {
  const dispatch = useDispatch()
  const [email, setemail] = useState<string>('')
  const [password, setpassword] = useState<string>('')
  const [slideIn, setslideIn] = useState<boolean>(true)
  const [slideOut, setslideOut] = useState<boolean>(false)
  const [bounce, setbounce] = useState<boolean>(false)
  const [errorMsg, seterrorMsg] = useState<string>('')

  const handleLogin = async () => {
    setbounce(false)
    const { statusCode, responseContent } = await api.prod.authenticate(email, password)
    if (statusCode === 200) {
      console.log(responseContent)
      dispatch(
        setUserToken(responseContent.token)
      )
      setslideOut(true)
      seterrorMsg('')
      setTimeout(() => {
        Router.back()
      }, 1000)
    } else if (statusCode === 401) {
      setslideIn(false)
      setbounce(true)
      seterrorMsg('帳號或密碼錯誤')
    } else {
      setslideIn(false)
      setbounce(true)
      seterrorMsg('伺服器錯誤，請聯繫開發人員')
    }
  }

  return (
    <div className={style.login}>

      <div className={style.Title}>
        <div className='pr-4 flex justify-center items-center'>
          <Image src={'/logo.jpg'} width="97.2px" height="59.4px"
            onClick={() => { Router.push('/') }}
          ></Image>
        </div>
        <span>| 實價登錄資訊平台</span>
      </div>

      <div className={classNames({
        [style.loginForm]: true,
        'animate__animated': true,
        'animate__backInLeft': slideIn,
        'animate__backOutRight': slideOut,
        'animate__shakeX': bounce
      })}>
        <Container maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'green' }}>
              <VpnKeyIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              使用者登入
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="電子郵件"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(event) => {
                  setemail(event.target.value)
                }}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="密碼"
                type="password"
                id="password"
                value={password}
                onChange={(event) => {
                  setpassword(event.target.value)
                }}
                autoComplete="current-password"
              />
              <Button
                variant='contained'
                className='loginBtn'
                sx={{ mt: 3, mb: 2 }}
                onClick={handleLogin}
                fullWidth
              >
                登入
              </Button>
            </Box>
            <Typography variant='subtitle1' color={'red'} >
              {errorMsg}
            </Typography>
          </Box>
        </Container>
      </div>

      <div className={style.Copyright}>
        <div>Copyright © 2022 VPMC 版權所有</div>
        <div>
          <a target="_blank" href="https://www.ccisappraisers.com/vpmc-home/" rel="noopener noreferrer">中華誠信資產管理</a>
        </div>
      </div>

    </div>
  )
}

export default LoginContainer
