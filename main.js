const form = document.querySelector("form")
const amount = document.getElementById("amount")
const currency = document.getElementById("currency")
const footer = document.querySelector("main footer")
const description = document.getElementById("description")
const result = document.getElementById("result")

const USD = 4.87
const EUR = 5.32
const GBP = 6.08

// Modificando para receber somente numeros
amount.addEventListener("input", () => {
    
    const hasCharactersRegex =  /\D+/g
    amount.value = amount.value.replace(hasCharactersRegex, "")
})

// Capturando o evento de submit do formulario
form.onsubmit = (event) => {
    event.preventDefault()

    switch(currency.value){
        case "USD":
            convertCurrency(amount.value, USD, "US$")
            break

        case "EUR":
            convertCurrency(amount.value, EUR, "€")
            break

        case "GBP":
            convertCurrency(amount.value, GBP, "£")
            break
    }
}

function convertCurrency(amount, price, symbol) {
    try {
        // exibindo a cotacao da moeda selecionada
        description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`

        let total = amount * price

        if (isNaN(total)){
            return alert("Por favor, digite o valor corretamente para converter")
        }
        total = formatCurrencyBRL(total).replace("R$", "")
        result.textContent =  `${total} Reais`

        //Aplica a classe que exibe o footer com o resultado
        footer.classList.add("show-result")

    } catch(error) {
        // remove a classe do footer removendo ele da tela 
        footer.classList.remove("show-result")
        console.log(error)
        alert("Não foi possivel converter. Tente novamente mais tarde. ")

    }
}
 
function formatCurrencyBRL(value) {
    return Number(value).toLocaleString("pt-BR",{
        style: "currency",
        currency: "BRL",
    })
}
