import sha256 from 'fast-sha256'
import util from 'tweetnacl-util'
import { IUserProfile, IUserRole } from '../../store/slice/user'

export const authenticate = async (email: string, password: string) => {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  const raw = JSON.stringify({
    'email': email,
    'password': util.encodeBase64(sha256(password as any))
  })
  const response = await fetch(process.env.API_DOMAIN_PROD + '/api/Auth/authenticate', {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  })
  const statusCode = response.status
  const responseContent = await response.json() as { token: string }
  return { statusCode, responseContent }
}

export const validateToken = async (token: string) => {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  const raw = JSON.stringify({
    "token": token
  })
  const response = await fetch(process.env.API_DOMAIN_PROD + "/api/Auth/validate", {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  })
  const statusCode = response.status
  const responseContent = await response.json() as IUserProfile
  console.log(responseContent)
  return { statusCode, responseContent }
}

export const listRoles = async (token: string) => {
  const myHeaders = new Headers()
  myHeaders.append('authorization', token)
  const response = await fetch(process.env.API_DOMAIN_PROD + "/api/Auth/listRoles", {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  })
  const statusCode2 = response.status
  const responseContent2 = await response.json() as IUserRole[]
  return { statusCode2, responseContent2 }
}
