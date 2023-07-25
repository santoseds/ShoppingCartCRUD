import React from 'react';
import { useProductContext } from '../hook/useProductContext';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function DeleteProductModal({removeAll}) {
    const {showDeleteProductModal, 
    handleDeleteProduct, toggleDeleteProductModal, selectedProduct}= useProductContext();
    
  const Delete =(selectedProduct)=>{
    handleDeleteProduct();
    removeAll(selectedProduct);
  };
  
  return (
    <>
    <Modal show={showDeleteProductModal} onHide={toggleDeleteProductModal}>
    <Modal.Header closeButton>
      <Modal.Title as="h5">
        Delete Product
      </Modal.Title>
    </Modal.Header>

  <Modal.Body>
    <p>Delete Product?</p>
  </Modal.Body>

  <Modal.Footer>
    <Button variant="secondary" onClick={toggleDeleteProductModal}>Close</Button>
    <Button variant="primary" onClick= {()=>Delete(selectedProduct)}>Delete</Button>
  </Modal.Footer>
</Modal>
        </>
  )
}

export default DeleteProductModal;