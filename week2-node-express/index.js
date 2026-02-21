const express = require('express')
const path = require('path')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3000

// custom request logger middleware (bonus)
app.use((req, res, next) => {
  const now = new Date().toISOString()
  console.log(`${now} - ${req.method} ${req.url}`)
  next()
})

// JSON parsing with error handling by middleware below
app.use(express.json())

// Catch JSON parse errors
app.use((err, req, res, next) => {
  if (err && err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.warn('Invalid JSON:', err.message)
    return res.status(400).json({ error: 'Invalid JSON', message: err.message })
  }
  next(err)
})

// Serve static HTML at /
app.use(express.static(path.join(__dirname, 'public')))

// GET / -> simple API text (also accessible via static page index.html)
app.get('/', (req, res) => {
  // if Accept includes html, static index.html will have been served; keep here for plain text clients
  if (req.headers.accept && req.headers.accept.includes('text/html')) {
    return res.sendFile(path.join(__dirname, 'public', 'index.html'))
  }
  res.type('text').send('My Week 2 API!')
})

// POST /user -> accept {name, email} and respond
app.post('/user', (req, res) => {
  const { name, email } = req.body || {}
  if (!name || !email) {
    return res.status(400).json({ error: 'Missing required fields', required: ['name', 'email'] })
  }
  // respond plain text as required
  res.type('text').send(`Hello, ${name}!`)
})

// GET /user/:id -> User [id] profile
app.get('/user/:id', (req, res) => {
  const { id } = req.params
  res.type('text').send(`User ${id} profile`)
})

// fallback error handler
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ error: 'Internal Server Error' })
})

app.listen(PORT, () => {
  console.log(`week2-node-express listening on port ${PORT}`)
})
