
export interface IRole {
  name: string
  code: string
}

export const listAllRole = async (token: string) => {
  const myHeaders = new Headers()
  myHeaders.append("authorization", token)
  const response = await fetch("http://localhost:9085/api/Role/list", {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  })
  const statusCode = response.status
  const responseContent = await response.json() as IRole[]
  return { statusCode, responseContent }
}
