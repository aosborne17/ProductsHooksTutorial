import React, {useState} from 'react'
import './App.css'
import './css/styles.css'

import {
  ProductForm,
  ProductFormErrorBoundary,
  ProductInfo,
  ProductInfoErrorBoundary,
} from './components/products'

function App() {
  const [productName, setProductName] = useState('')

  const submitProductName = name => {
    setProductName(name)
  }

  function handleReset() {
    setProductName('')
  }

  return (
    <div className="app">
      <ProductFormErrorBoundary onReset={handleReset} resetKeys={[productName]}>
        <ProductForm
          productName={productName}
          submitProductName={submitProductName}
        />
      </ProductFormErrorBoundary>
      <ProductInfoErrorBoundary onReset={handleReset} resetKeys={[productName]}>
        <ProductInfo productName={productName} />
      </ProductInfoErrorBoundary>
    </div>
  )
}

export default App
