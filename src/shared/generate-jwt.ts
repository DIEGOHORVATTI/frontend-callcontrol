export const generateJwt = (body: Record<string, unknown>) => {
  const header = {
    alg: 'HS256',
    typ: 'JWT',
  }

  const secret = 'secret'

  const encodedHeader = btoa(JSON.stringify(header))
  const encodedPayload = btoa(JSON.stringify(body))

  const signature = btoa(`${encodedHeader}.${encodedPayload}.${secret}`)
  const token = `${encodedHeader}.${encodedPayload}.${signature}`

  return token
}
