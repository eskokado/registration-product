const inputFromObject = (product) => {
  const inputs = document.querySelectorAll(`input[name]`)
  inputs.forEach((input) => {
    if (input.name == "productId") input.value = product.id
    if (input.name == "name") input.value = product.nome_do_produto
    if (input.name == "description") input.value = product.descricao_do_produto
    if (input.name == "price") input.value = product.preco
    if (input.name == "stock") input.value = product.quantidade_em_estoque
  })
}

const objectToInput = (product = {}) => {
  const inputs = document.querySelectorAll(`input[name]`)
  inputs.forEach((input) => {
    if (input.name == "productId") product.id = input.value
    if (input.name == "name") product.nome_do_produto = input.value
    if (input.name == "description") product.descricao_do_produto = input.value
    if (input.name == "price") product.preco = input.value
    if (input.name == "stock") product.quantidade_em_estoque = input.value
  })
  return product
}

export { inputFromObject, objectToInput }