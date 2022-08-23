import { AppCode, RoleCode } from "../../store/slice/user"

export interface IRole {
  id: string
  name: string
  code: RoleCode
  updatedTime: string
}

export interface IApp {
  id: string
  name: string
  code: AppCode
  updatedTime: string
}

export interface IRoleWithApp extends IRole {
  apps: IApp[]
}

export const listAllRole = async () => {
  const response = await fetch(process.env.API_DOMAIN_PROD + '/api/Role/list', {
    method: 'GET',
    redirect: 'follow'
  })
  const statusCode = response.status
  const responseContent = await response.json() as IRole[]
  return { statusCode, responseContent }
}

export const listAppByRole = async (roleCode: RoleCode) => {
  const response = await fetch(process.env.API_DOMAIN_PROD + `/api/Role/listAppByRole?roleCode=${roleCode}`, {
    method: 'GET',
    redirect: 'follow'
  })
  const statusCode = response.status
  const responseContent = await response.json() as IRoleWithApp
  return { statusCode, responseContent }
}

export const assignApp = async (token: string, roleCode: RoleCode, appCodeArray: string) => {
  const myHeaders = new Headers()
  myHeaders.append("authorization", token)
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded")
  const urlencoded = new URLSearchParams()
  urlencoded.append("code", roleCode)
  urlencoded.append("appCodeArray", appCodeArray)
  const response = await fetch(process.env.API_DOMAIN_PROD + "/api/Role/assignApp", {
    method: 'PUT',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
  })
  const statusCode = response.status
  // const responseContent = await response.json() as IRoleWithApp
  return { statusCode }
}
