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
    ).catch(e=>{}).finally(()=>{});
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
  }).then(res => res.json()).then(data=> {}).catch(e=>{});
}