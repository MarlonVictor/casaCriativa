// Botões

function onOff(){
    document
        .querySelector("#modal")
        .classList
        .toggle("hide")

    document
        .querySelector("body")
        .classList
        .toggle("hideScroll")

    document
        .querySelector("#modal")
        .classList
        .toggle("addScroll")
}

// Cadastro de Ideias

function checkFields(event) {

    const valuesToCheck = [
        "title",
        "category",
        "image",
        "description",
        "link"
    ]
    
    const isEmpty = valuesToCheck.find( function(value) {

        const checkIfIsString = typeof event.target[value].value === "string"
        const checkIfIsEmpty = !event.target[value].value.trim()

        if(checkIfIsString && checkIfIsEmpty) {
            return true
        }
    })

    if(isEmpty) {
        event.preventDefault()
        const msg = "Por favor, preencha todos os campos"
        alert(msg)
    }
}

// Cor do background aleatório

function randomBg() {
    const hexCodigo = 0xCCCCCC
    const hex = (Math.random()*hexCodigo<<0).toString(16)
    const conteudo = document.querySelector('#content')

    conteudo.style.backgroundColor = `#${hex}`
}


const body = document.querySelector('body')
body.addEventListener('load', () => randomBg())