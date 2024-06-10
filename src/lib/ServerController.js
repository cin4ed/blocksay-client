import database from './database'

export default class ServerController {
  static add(chat) {
    return new Promise((resolve, reject) => {
      const db = database.connect()

      db.run('INSERT INTO chats (name, ip) VALUES (?, ?)', [chat.name, chat.ip], (err) => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }

        db.close()
      })
    })
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      const db = database.connect()

      db.all('SELECT * FROM chats', (err, rows) => {
        if (err) {
          reject(err)
        } else {
          resolve(rows)
        }

        db.close()
      })
    })
  }
}
