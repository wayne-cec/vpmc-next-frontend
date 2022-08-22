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
