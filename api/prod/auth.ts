import sha256 from 'fast-sha256'
import util from 'tweetnacl-util'

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
