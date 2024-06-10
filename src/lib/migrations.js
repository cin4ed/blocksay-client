import database from './database'

const migrations = [
  {
    table: 'chats',
    sql: `CREATE TABLE IF NOT EXISTS chats (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      ip TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`
  },
  {
    table: 'messages',
    sql: `CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      chat_id INTEGER NOT NULL,
      user_id INTEGER NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(chat_id) REFERENCES chats(id)
    )`
  },
  {
    table: 'users',
    sql: `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      password TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`
  }
]

export default {
  run: () => {
    const db = database.connect()
    migrations.forEach((migration) => {
      db.run(migration.sql, (err) => {
        if (err) {
          console.log('DATABASE: Error creating table: ' + err.message)
        } else {
          console.log(`DATABASE: Table ${migration.table} created successfully.`)
        }
      })
    })
    db.close()
  }
}
