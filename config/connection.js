require('dotenv').config()
const { Pool } = require('pg')
 
const pool = new Pool({
  user: process.env.USER || 'postgres',
  password: process.env.PASSWORD || 'postgres',
  host: 'localhost',
  database: 'class_db',
  port: 5432,
  max: 20,
  idleTimeoutMillis: 500,
  connectionTimeoutMillis: 500,
})

module.exports = pool;