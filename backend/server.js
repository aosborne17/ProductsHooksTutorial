import express from 'express'
import cors from 'cors'
import products from './data/ProductsData.js'
import {errorHandler} from './middlewares/errorHandler.js'

const app = express()

app.use(cors())

app.use(express.json())

const port = 5000

app.get('/products', (req, res) => {
  res.json(products)
})

app.get('/products/:name', (req, res) => {
  const name = req.params.name
  const product = products.find(product => {
    return product.name.includes(name)
  })

  if (product) {
    res.send(product)
  } else {
    throw new Error('Product Not found')
  }
})

app.use(errorHandler)

app.listen(port, () => {
  console.log(`your app is running on port ${port}`)
})
