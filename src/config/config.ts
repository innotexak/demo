import dotenv from 'dotenv'

dotenv.config()
export const isDev = process.env.NODE_ENV !== 'production'

const requiredEnvs = [
  'MONGO_URL',
  'PORT',
  'SECRET_KEY',
  'BASE_AUTH_URL',
  'FRONT_END_DOMAIN',
  'HOST_EMAIL',
  'SMTP_HOST',
  'SMTP_PORT',
  'SMTP_USERNAME',
  'SMTP_PASSWORD',
] as const

interface Envs {
  [key: string]: string
}

const envs: Envs = requiredEnvs.reduce((acc: Envs, key: string) => {
  acc[key] = process.env[key] as string
  return acc
}, {})

const missingEnvs: string[] = requiredEnvs.filter((key) => !envs[key])

if (missingEnvs.length > 0) {
  console.error('ENV Error, the following ENV variables are not set:')
  console.table(missingEnvs)
  throw new Error('Fix Env and rebuild')
}

export const {
  MONGO_URL,
  PORT,
  SECRET_KEY,
  FRONT_END_DOMAIN,
  BASE_AUTH_URL,
  HOST_EMAIL,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USERNAME,
  SMTP_PASSWORD,
  bvnApiKey,
  ninApiKey,
  passportApiKey,
  drivingLicenceApiKey,
} = process.env
