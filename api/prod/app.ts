import { IApp } from "./role"

export const listAllApps = async () => {
  const response = await fetch(process.env.API_DOMAIN_PROD + '/api/App/list', {
    method: 'GET',
    redirect: 'follow'
  })
  const statusCode = response.status
  const responseContent = await response.json() as IApp[]
  return { statusCode, responseContent }
}
