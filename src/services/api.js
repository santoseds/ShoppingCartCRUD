export const createProduct=  async (product)=> {
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
            }
          ).catch(e=>'Ocorreu erro ao criar com api create!');    
            
}   

export const updateProduct = async (produc, formProduct)=>{
  let updated ={};
  await fetch(`http://localhost:3001/foods/${produc.id}`, {
    method:'PUT',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      emoji: formProduct.emoji,
      name: formProduct.name,
      price: formProduct.price
    })
  }).then(res => res.json()).then(data=> {
      updated = data;
      console.log('este é o updated: ' + updated.name)}
    ).catch(e=>'erro no updateProduct').finally(()=>'Finally está no console!');
}

export const deleteProduct= async (product)=>{
  let urlf = `http://localhost:3001/foods/${product.id}`;
  await fetch(urlf, {
          method:'DELETE',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            id: product.id
          })
  }).then(res => res.json()).then(data=> console.log(data)).catch(e=>'erro no deleteProduct');
}