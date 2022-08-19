
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

export const listLoginLogs = async () => {
  const response = await fetch(process.env.API_DOMAIN_PROD + '/api/User/loginLogs')
  const statusCode = response.status
  const responseContent = await response.json() as IUserLogs[]
  return { statusCode, responseContent }
}
