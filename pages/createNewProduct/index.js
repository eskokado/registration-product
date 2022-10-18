import { createProduct } from "../../scripts/api.js" 
import { inputFromObject, objectToInput } from "../../scripts/shared.js"

const Main = async () => {
  const divError = document.getElementById("error")
  const divMsg = document.getElementById("message")  

  const btnVoltar = document.querySelector('.btnOld button')
  btnVoltar.addEventListener("click", (event) => {
    window.location.assign("/pages/home")
  })
  
  const form = document.querySelector(`form`)
  form.addEventListener("submit", async (event) => {
    event.preventDefault()
    const productCreated = objectToInput()
    const result = await createProduct(productCreated)
    console.log("create result", result)
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