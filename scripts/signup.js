const form = document.getElementById('forms')
const signUp = document.getElementById('sign-up')
const firstname = document.getElementById('inputName')
const lastName = document.getElementById('inputLastName')
const email = document.getElementById('inputEmail')
const password = document.getElementById('inputPassword')
const password02 = document.getElementById('inputPassword02')

form.addEventListener('submit', e => {
    e.preventDefault()
    CreatLogin()


})

signUp.setAttribute("disabled", true)
signUp.innerText = "Bloqueado"

let emailValidacao = false
let senhaValidacao = false
let nameValidation = false
let lastNameValidation = false
let senha02Validation = false
let loginApiValidacao = true


// Validações

firstname.addEventListener('keyup', function () {
    let nameValue = firstname.value.trim()

    if (nameValue === '' || nameValue === 'null') {
        showValidationError(firstname, 'O campo não pode ficar vazio')
        console.log('nome em branco')
        nameValidation = false
    }
    else {
        showValidationSuccess(firstname)
        nameValidation = true
    }
    validacaoLogin()
})

lastName.addEventListener('keyup', function () {
    let lastNvalue = lastName.value.trim()

    if (lastNvalue === '' || lastNvalue === 'null') {
        showValidationError(lastName, 'O campo não pode ficar vazio')
        lastNameValidation = false
        console.log('sobrenome em branco')
    }
    else {
        showValidationSuccess(lastName)
        lastNameValidation = true
    }

    validacaoLogin()
})


email.addEventListener('keyup', function () {
    let emailValue = email.value.trim()

    if (emailValue === '' || emailValue === 'null') {
        showValidationError(email, 'O campo não pode ficar vazio')
        console.log('email em branco')
        emailValidacao = false
    }
    else if (!isValidEmail(emailValue)) {
        showValidationError(email, 'Insira um endereço de email valido')
        console.log('erro email invalido')
        emailValidacao = false
    }
    else {
        showValidationSuccess(email)
        emailValidacao = true

    }
    validacaoLogin()
})

password.addEventListener('keyup', function () {
    let passwordValue = password.value.trim()

    if (passwordValue === '' || passwordValue === 'null') {
        showValidationError(password, 'O campo não pode ficar vazio')
        console.log('senha vazio')
        senhaValidacao = false
    }
    else if (!isValidPassword(passwordValue)) {
        showValidationError(password, 'Senha fraca, a senha deve conter: Aa1@')
        console.log('senha invalida')
        senhaValidacao = false
    }
    else {
        showValidationSuccess(password)
        senhaValidacao = true

    }
    validacaoLogin()
})

password02.addEventListener('keyup', function () {
    let password02Value = password02.value.trim()
    let passwordValue = password.value.trim()

    if (password02Value === '' || password02Value === 'null') {
        showValidationError(password02, 'O campo não pode ficar vazio')
        console.log('senha02 vazio')
        senha02Validation = false
    }

    else if (password02Value !== passwordValue) {
        showValidationError(password02, 'As senhas não coincidem')
        senha02Validation = false
        console.log('As senhas não coincidem')
    }
    else {
        showValidationSuccess(password02)
        senha02Validation = true
    }
    validacaoLogin()
})
//----------------------------------------------------------------------------------


// Criando usuario

async function CreatLogin() {



    let nameValueCorrection = correcao(firstname.value)
    let lastNameValueCorrection = correcao(lastName.value)
    let emailValueCorrection = correcao(email.value)
    emailValueCorrection = correcaoTLwC(emailValueCorrection)
    let passwordCorrection = correcao(password.value)


    let CreateLogin = {
        firstName: nameValueCorrection,
        lastName: lastNameValueCorrection,
        email: emailValueCorrection,
        password: passwordCorrection
    }
    console.log(CreateLogin)
    // Convetendo objeto CreateLogin em Json
    const infoLoginJson = JSON.stringify(CreateLogin)

    // Confingurando a requisição na API
    let SettRequest = {
        method: 'POST',
        body: infoLoginJson,
        headers: {
            'Content-type': 'application/json',
        },
    }

    try {
        const info = await fetch(`${apiBaseUrl()}/users`, SettRequest);
        let KeyJwt = await info.json();
        // console.log(info);
        // alert(KeyJwt.jwt)
        // clear(KeyJwt.jwt)
        if(info.status == 400){
            alert("Usuario já se encontra registrado")
        }
        else{
            alert("Conta criada, já é possivel realizar o login")
        }

    }
    catch (erro) {
        // alert(`Não foi possivel criar a conta: ${erro}`);
        // console.log("batata")
        alert('erro no servidor')
    }
}



function validacaoLogin() {
    
    if (!emailValidacao || !senhaValidacao || !loginApiValidacao || !nameValidation || !lastNameValidation || !senha02Validation ) {
      signUp.setAttribute("disabled", true)
      signUp.innerText = "Bloqueado"
      return false;
  
    } else {
      signUp.removeAttribute("disabled")
      signUp.innerText = "Criar conta"
      console.log("desabled true")
      return true;
    }
  }

// function clear(rec) {

//     if(rec != ""){
//     firstname = ""
//     lastName = ""
//     email = ""
//     password = ""
//     password02 = ""
// }
// else{

    
// }

// }
