import sqlite3 from 'sqlite3'

export default {
  connect: () => {
    return new sqlite3.Database('./database.sqlite', (err) => {
      if (err) console.log('DATABASE: Error creating the database: ' + err.message)
      else console.log('DATABASE: Database created successfully.')
    })
  }
}
