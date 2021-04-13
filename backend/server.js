const express = require('express')

const products = require('./data/products')

const app = express()

// Middlewares //
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes //
app.get('/api/products', (req, res, next) => res.json(products))
app.get('/api/products/:id', (req, res, next) => {
  const product = products.find((p) => p._id === req.params.id)
  res.json(product)
})

// connection //
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server is listening in ${process.env.NODE_ENV} on port: ${PORT}`)
})
