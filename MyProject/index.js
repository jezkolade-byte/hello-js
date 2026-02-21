const express = require('express')
const app = express()
const port = process.env.PORT || 3000

// parse JSON bodies
app.use(express.json())

// catch JSON parse errors from express.json and return a friendly message
app.use((err, req, res, next) => {
  if (err && err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.warn('Invalid JSON body:', err.message)
    return res.status(400).type('text').send('Invalid JSON: ' + err.message)
  }
  next(err)
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// POST / will log the received JSON/body and respond with plain text
app.post('/', (req, res) => {
  console.log('Received POST / with body:', req.body)

  const parts = []
  if (req.body && req.body.name) parts.push(`name : ${req.body.name}`)
  if (req.body && req.body.email) parts.push(`email : ${req.body.email}`)

  if (parts.length > 0) return res.type('text').send(parts.join('\n'))

  res.json({ received: req.body })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


