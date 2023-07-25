import { useState } from "react";
import { ProductContext } from "./ProductContext";
import { deleteProduct, updateProduct} from '../services/api';

export default function ProductProvider({ children }) {

  const emptyProduct = {
    name:"",
    price:"",
    emoji:'',
  }
  
  function handleCreateProductModal(){
    setSelectedProduct(emptyProduct);
    toggleProductModal();
    setTypeProductForm('create');
  } 

  function handleUpdateProductModal(product){
    setSelectedProduct(product);
    setTypeProductForm('update');
    toggleProductModal();
  }

  const createProduct=  async (product)=> {
    let newProduct= {};
    await fetch('http://localhost:3001/foods/', {
      method:'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        emoji: product.emoji,
        name: product.name,
        price: product.price     
        
      })}).then(res=>res.json()).then(data=> {
        newProduct = data;
        console.log('new product tta ok!' + newProduct.name);
        setProducts([...products, ...newProduct]);
        }
      ).catch(e=>{});    
        
}   
  const handleSubmitProductForm = (product) => {
    if (typeProductForm === 'create') {
      createProduct(product);
     
      console.log('createproduct ok! ' + products);
    } else {
      updateProduct(selectedProduct, product);
    }
    toggleProductModal();
  };

  function handleLoadDeleteProductModal(product){
    setSelectedProduct(product);
    toggleDeleteProductModal();
  }

  function handleDeleteProduct(){
    deleteProduct(selectedProduct);
    const newProducts = products.filter(product=> product.id !== selectedProduct.id);
    setProducts(newProducts);
    toggleDeleteProductModal();
  }

  async function getAllProducts(){
    let todosProdutos;

    await fetch('http://localhost:3001/foods/')
 .then(res=>res.json()).then(data=> {
        todosProdutos = data;
        setProducts(todosProdutos);
      }
      ).catch((e)=> {});
    }
  
  const [showDeleteProductModal, setShowDeleteProductModal]= useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const[products, setProducts] = useState([]);
  const [typeProductForm, setTypeProductForm] = useState('create');
  const [selectedProduct, setSelectedProduct] = useState(emptyProduct);
  const toggleProductModal = ()=>{setShowProductModal(!showProductModal);};
  const toggleDeleteProductModal = ()=>{setShowDeleteProductModal(!showDeleteProductModal);};

  return (
    <ProductContext.Provider value={{products, showProductModal, toggleProductModal, getAllProducts, 
      handleCreateProductModal, handleSubmitProductForm, typeProductForm,setShowDeleteProductModal,
      showDeleteProductModal, handleDeleteProduct, handleLoadDeleteProductModal,toggleDeleteProductModal,
      handleUpdateProductModal, selectedProduct}}>
      {children} 
    </ProductContext.Provider>
  )
}