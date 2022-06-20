import type { NextPage } from 'next'
import style from './index.module.scss'
import {
  Button, Grid, Container, CssBaseline,
  Box, Avatar, Typography, TextField, FormControlLabel,
  Checkbox, Link
} from '@mui/material'
import classNames from 'classnames'
import { useState } from 'react'
import VpnKeyIcon from '@mui/icons-material/VpnKey'
import Router from 'next/router'

const Login: NextPage = () => {
  const [slideOut, setslideOut] = useState<boolean>(false)

  const handleLogin = async () => {
    setslideOut(true)
    setTimeout(() => {
      Router.push('/')
    }, 1000)
  }

  return (
    <div className={style.login}>

      <div className={classNames({
        [style.loginForm]: true,
        'animate__animated': true,
        'animate__backInLeft': true,
        'animate__backOutRight': slideOut
      })}>
        {/* <Grid spacing={2} container>
          <Grid xs={12}>
            <Button
              onClick={() => {
                setslideOut(true)
              }}
            >Login</Button>
          </Grid>
        </Grid> */}
        <Container maxWidth="xs">
          {/* <CssBaseline /> */}
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
              Sign in
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                variant='contained'
                className='loginBtn'
                sx={{ mt: 3, mb: 2 }}
                onClick={handleLogin}
                fullWidth
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </div>

    </div>
  )
}

export default Login
