import React from 'react';
import Product from './components/Product/Product';
import ProductProvider from './context/ProductProvider';

function App() {
  return (
    <ProductProvider>
      <div className="App">
        <Product></Product>
      </div>
    </ProductProvider>
  );
}

export default App;
