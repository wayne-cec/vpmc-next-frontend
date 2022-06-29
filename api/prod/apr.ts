
export const getCommiteeByAprId = async (id: string) => {
  const response = await fetch(process.env.API_DOMAIN_PROD + `/api/Apr/getCommiteeByAprId?id=${id}`, {
    method: 'GET',
    redirect: 'follow'
  })
  const statusCode = response.status
  const responseContent = await response.json() as {
    organization: string
    licenseYear: string
    licenseCode: string
  }
  return { statusCode, responseContent }
}
