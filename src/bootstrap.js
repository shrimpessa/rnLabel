import { DB } from './db'

export async function bootstrap() {
  try {
    await DB.init()
    console.log('DB started...')
  } catch (e) {
    console.log('DB error:', e)
  }
}
