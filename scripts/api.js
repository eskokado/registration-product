const url = "http://localhost:3333/"

const getAllProducts = async () => {
  try {
    const request = await fetch(`${url}products`)
    if (request.status != 404) {
      const response = await request.json()
      return response
    }
    return false
  } catch (error) {
    return false
  }

}

const getProduct = async (productId) => {
  try {
    const request = await fetch(`${url}products/${productId}`)
    if (request.status != 404) {
      const response = await request.json()
      return response
    }
    return false
  } catch {
    return false
  }
}

const deleteProduct = async (id) => {
  try {
    const options = {
      method: 'DELETE' // Indicamos o método
    }
    const request = await fetch(`${url}products/${id}`, options)
    if (request.status === 404) {
      return false
    }
    return true
  } catch (error) {
    return false
  }
} 

const updateProduct = async (product) => {
  const object = {
    nome_do_produto: product.nome_do_produto,
    descricao_do_produto: product.descricao_do_produto,
    preco: Number.parseFloat(product.preco),
    quantidade_em_estoque: Number.parseInt(product.quantidade_em_estoque),
    imagem: product.imagem
  }
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(object)
  }
  try {
    const request = await fetch(`${url}products/${product.id}`, options)
    const response = await request.json()
    return true
  } catch (err) {
    return false
  }
}


const createProduct = async (product) => {
  const object = {
    nome_do_produto: product.nome_do_produto,
    descricao_do_produto: product.descricao_do_produto,
    preco: Number.parseFloat(product.preco),
    quantidade_em_estoque: Number.parseInt(product.quantidade_em_estoque),
    imagem: "https://images.tcdn.com.br/img/img_prod/740836/cadeira_gamer_concordia_gm3_rgb_com_controle_e_powerbank_10803_1_20a776245ed6e9b1bd655072771901e6.png"
  }
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(object)
  }
  try {
    const request = await fetch(`${url}products/`, options)
    const response = await request.json()
    return true
  } catch (err) {
    return false
  }
}


export { getAllProducts, getProduct, updateProduct, createProduct, deleteProduct }