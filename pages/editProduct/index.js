import { getProduct, updateProduct } from "../../scripts/api.js"
import { inputFromObject, objectToInput } from "../../scripts/shared.js"

const Main = async () => {
  const divError = document.getElementById("error")
  const divMsg = document.getElementById("message")  

  const btnVoltar = document.querySelector('.btnOld button')
  btnVoltar.addEventListener("click", (event) => {
    window.location.assign("/pages/home")
  })

  const queryString = window.location.search; 
  const params = new URLSearchParams(queryString);
  const productId = params.get("productId");

  const found = await getProduct(productId)
  if (found) {
    inputFromObject(found)
  } else {
    divError.classList.add("enabled-error")
    setTimeout(() => { divError.classList.remove("enabled-error")}, 3000)      
  }
  
  const form = document.querySelector(`form`)
  form.addEventListener("submit", async (event) => {
    event.preventDefault()
    const productUpdated = objectToInput(found)
    const result = await updateProduct(productUpdated)
    if (result) {
      divMsg.classList.add("enabled-msg")
      setTimeout(() => { divMsg.classList.remove("enabled-msg")}, 3000)        
    } else {
      divError.classList.add("enabled-error")
      setTimeout(() => { divError.classList.remove("enabled-error")}, 3000)        
    }
  })
}

Main()