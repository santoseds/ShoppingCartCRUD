import React from 'react';
import { useReducer } from 'react';
import { Container } from 'react-bootstrap';
import {useProductContext} from '../hook/useProductContext';
import { CreateProductModal } from './CreateProductModal';
import { useEffect } from 'react';
import DeleteProductModal from './DeleteProductModal';

const currencyOptions = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
}

function getTotal(cart) {
  const estado = [...cart];
  const total = estado.reduce((totalCost, item) => totalCost + item.price, 0);
  return total.toLocaleString(undefined, currencyOptions);
}

function cartReducer(cart, action){
  switch(action.type){
    case 'removeall':
      let produIndex = cart.findIndex(item => item.name === action.produto.name);
      if(produIndex < 0) {
        return cart;
      }
      let updated = [...cart];

      do{
      updated.splice(produIndex, 1);
      produIndex = updated.findIndex(item =>item.name === action.produto.name);
      }while(produIndex>=0);
      return updated;
      
    case 'add':

      return [action.produto,...cart, ];
    case 'remove':
      let rem = [...cart];
      //rem.reverse();
      const produtoIndex = rem.findIndex(item => item.name === action.produto.name);
      if(produtoIndex < 0) {
        return cart;
      }
      const update = [...cart];
      //update.reverse();
      update.splice(produtoIndex, 1);
      return update;
    default:
      return cart;        
  } 
}

export default function Product() {
  const {products, getAllProducts, handleCreateProductModal,
    handleLoadDeleteProductModal, handleUpdateProductModal} = useProductContext();

  const [cart, setCart] = useReducer(cartReducer, []);

  function add(produto){
    setCart({produto, type: 'add' });
  }  
 
  function remove(produto){
    setCart({produto, type:'remove'});
  }
    
  function removeAll(produto){
    setCart({produto, type:'removeall'});    
  }

  useEffect(()=>{getAllProducts()}, [products]);

  return(
    <Container>
    <div className="wrapper">
    <button onClick={()=>handleCreateProductModal()}>+ Product</button>

      <div>
        Shopping Cart: {cart.length} total items.
      </div>
      <div>Total: {getTotal(cart)}</div>
      <div>
      {products.map((produto)=> (
        <div key ={produto.name}>
      <div className="product"><span role="img" aria-label={produto.name}>{produto.emoji}</span></div>
      <button onClick={()=>add(produto)}>Add 1</button> <button onClick={()=>remove(produto)}>Remove 1</button>
       <button onClick={()=>handleUpdateProductModal(produto)}>Edit</button>
       <button onClick={()=>removeAll(produto)}>Remove All</button>
       <button onClick={()=>handleLoadDeleteProductModal(produto)}>Delete Product</button> 
      </div>))}</div>
      
        <CreateProductModal/>
        <DeleteProductModal removeAll={removeAll}/>
      </div>
      </Container>    
  )
}