import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useProductContext} from '../hook/useProductContext';
import * as formik from 'formik';
import * as yup from 'yup';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export function CreateProductModal() {
  const {showProductModal, toggleProductModal,handleSubmitProductForm, typeProductForm} = useProductContext();
  const { Formik } = formik;

  const schema = yup.object().shape({
    name: yup.string().required('Preencher campo').typeError('Escrever texto').min(3, 'Três letras no mínimo'),
    price: yup.number().required('Preencher campo').typeError('Escreva número').nonNullable().positive(),
    emoji: yup.string().required('Preencher campo').typeError('Escrever texto'),
 
  });

  return (
    <>
      <Modal show={showProductModal} onHide={toggleProductModal}>
        <Modal.Header closeButton>
          <Modal.Title as="h5">
            {typeProductForm === 'create'? 'New' : 'Update'} Product
          </Modal.Title>
        </Modal.Header>
      <Formik
        validationSchema={schema}
        onSubmit={handleSubmitProductForm}
        initialValues={{
          name: "",
          price: "",
          emoji: ""
        }}
        enableReinitialize = {true}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Modal.Body>
              <Form.Group controlId="formProductName">
                <Form.Label>Name:</Form.Label>
                <InputGroup hasValidation>
                <Form.Control
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  isValid={touched.name && !errors.name}
                  isInvalid={!!errors.name}
                  
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group controlId="formProductPrice">
                <Form.Label>Price:</Form.Label>
                <InputGroup hasValidation>
                <Form.Control
                  type="number"
                  name="price"
                  value={values.price}
                  onChange={handleChange}
                  isValid={touched.price && !errors.price}
                  isInvalid={!!errors.price}
                  
                />
                <Form.Control.Feedback type="invalid">
                  {errors.price}
                </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group controlId="formProductEmoji">
                <Form.Label>Emoji:</Form.Label>
                <InputGroup hasValidation>
                <Form.Control
                  type="text"
                  name="emoji"
                  value={values.emoji}
                  onChange={handleChange}
                  isValid={touched.emoji && !errors.emoji}
                  isInvalid={!!errors.emoji}
                  
                />
                <Form.Control.Feedback type="invalid">
                  {errors.emoji}
                </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={toggleProductModal}>
                    Close
              </Button>
              <Button type="submit">
                {typeProductForm === 'create'? 'Create' : 'Update'}
              </Button>
            </Modal.Footer>
          </Form>)}
        </Formik>
      </Modal>
    </>
  );
}