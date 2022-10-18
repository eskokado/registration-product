import { getAllProducts, deleteProduct } from "../../scripts/api.js"

const divShowCase = document.getElementById("showCase")
const divError = document.getElementById("error")
const divMsg = document.getElementById("message")

const renderCardsProdutos = async (products = []) => {
  const result = await getAllProducts()
  if (!result) {
    divError.classList.add("enabled-error")
    setTimeout(() => { divError.classList.remove("enabled-error")}, 3000)      
  }
  if (result.length === 0) {
    divMsg.classList.add("enabled-msg")
    setTimeout(() => { divMsg.classList.remove("enabled-msg")}, 3000)      
    divShowCase.innerHTML = ""
  }
  result.forEach((product) => {
    const cardProduct = renderCard(product)
    divShowCase.insertAdjacentHTML("beforeend", cardProduct)
  })
}

/*
{
  "id": "a45976f0-4e0c-4cae-b4fa-2f5d3ae9d2d0",
  "nome_do_produto": "Cadeira Gamersss",
  "descricao_do_produto": "Cadeira Gamer com led RGB",
  "preco": 1999.99,
  "quantidade_em_estoque": 20,
  "imagem": "https://images.tcdn.com.br/img/img_prod/740836/cadeira_gamer_concordia_gm3_rgb_com_controle_e_powerbank_10803_1_20a776245ed6e9b1bd655072771901e6.png"
}
*/

const renderCard = (product) => {
  const result = `
    <li class="card" data-product-id="${product.id}">
      <img width="300" height="150" src="${product.imagem}" alt="${product.nome_do_produto}">
      <div class="description">
        <h3>${product.nome_do_produto}</h3>
        <p>${product.descricao_do_produto}</p>
        <div class="estoque">
          <span><strong>Preço:</strong> R$ ${product.preco}</span>
          <span><strong>Estoque:</strong> ${product.quantidade_em_estoque}</span>
        </div>
        <div class="btnsCrud">
          <button data-edit-id="${product.id}">Editar</button>
          <button data-delete-id="${product.id}">Excluir</button>
        </div>
      </div>
    </li>
  `
  return result
}

const addListenerButtons = () => {
  const btnNewProduct = document.querySelector(".btnAddProduct button")
  btnNewProduct.addEventListener("click", (event) => {
    window.location.assign("/pages/createNewProduct")
  })

  const lis = document.querySelectorAll('li[data-product-id]')
  lis.forEach((li) => {
    const btnEdit = document.querySelector(`button[data-edit-id="${li.dataset.productId}"]`)
    const btnDelete = document.querySelector(`button[data-delete-id="${li.dataset.productId}"]`)
    btnEdit.addEventListener("click", async (event) => {
      window.location.assign(`/pages/editProduct/?productId=${event.target.dataset.editId}`)
    })
    
    btnDelete.addEventListener("click", async (event) => {
      const success = await deleteProduct(event.target.dataset.deleteId)
      if (success) {
        console.log("edit success")
        renderCardsProdutos()
      }
    })
  })
  // console.log(database)
}

async function Main() {
  await renderCardsProdutos()
  addListenerButtons()
}

Main()
