require('dotenv').config()
const { Pool, Client } = require('pg')


const pool = new Pool({
  connectionString: process.env.DB_LINK,
  ssl: {
    rejectUnauthorized: false
  },
})


pool.connect()
  .then(() => {
    console.log('connected');
  })
  .catch((err) => {
    console.log(err, 'failed');
  })

module.exports = {
  db: pool,
}