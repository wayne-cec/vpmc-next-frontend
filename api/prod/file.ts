
export type BulletinFileType = 'ReportSample' | 'GeneralLaw' | 'Bulletin'

export const getStaticBulletinFiles = async (type: BulletinFileType) => {
  const response = await fetch(process.env.API_DOMAIN_PROD + `/api/File/get${type}FileInfo`, {
    method: 'GET',
    redirect: 'follow'
  })
  const statusCode = response.status
  const responseContent = await response.json() as { serverPath: string, alias: string }[]
  return { statusCode, responseContent }
}
