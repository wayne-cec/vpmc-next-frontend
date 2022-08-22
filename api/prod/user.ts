
export interface IUserLogs {
  email: string
  entry: string
  isSuccessed: boolean
  loginTime: string
}

export interface IUserLogsProcessed {
  email: string
  entry: string
  isSuccessed: string
  loginTime: string
}

export interface IUserInfo {
  userId: string
  email: string
  phoneNumber: string
  createdDate: string
  isActive: boolean
  lastLoginTime: string
  roles: {
    name: string
    code: string
  }[]
  thumbnails: string[]
}

export const listLoginLogs = async () => {
  const response = await fetch(process.env.API_DOMAIN_PROD + '/api/User/loginLogs')
  const statusCode = response.status
  const responseContent = await response.json() as IUserLogs[]
  return { statusCode, responseContent }
}

export const listUsers = async () => {
  const response = await fetch(process.env.API_DOMAIN_PROD + '/api/User/list')
  const statusCode = response.status
  const responseContent = await response.json() as IUserInfo[]
  return { statusCode, responseContent }
}

export const assignRole = async (token: string, userId: string, roles: string) => {
  const myHeaders = new Headers()
  myHeaders.append("authorization", token)
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded")

  const urlencoded = new URLSearchParams()
  urlencoded.append("userId", userId)
  urlencoded.append("roleCodeArray", roles)

  const response = await fetch(process.env.API_DOMAIN_PROD + '/api/User/assignRole', {
    method: 'PUT',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
  })
  const statusCode = response.status
  return { statusCode }
}
