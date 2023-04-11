const form = document.getElementById('forms')
const email = document.getElementById('inputEmail')
const password = document.getElementById('inputPassword')
const acessar = document.getElementById('login')


// form.addEventListener('submit', e => {
//     e.preventDefault()
//     login();
// })

email.addEventListener('keyup', function(){
    validacao()
   
})

password.addEventListener('keyup', function(){
    validacao()
})



// function IsEmail(email){
//     var exclude=/[^@-.w]|^[_@.-]|[._-]{2}|[@.]{2}|(@)[^@]*1/;
//     var check=/@[w-]+./;
//     var checkend=/.[a-zA-Z]{2,3}$/;
//     if(((email.search(exclude) != -1)||(email.search(check)) == -1)||(email.search(checkend) == -1)){
//         return false;
//     }
//     else {
//         return true;
//     }
// }
const validacao = () => {
    const emailValue = email.value.trim()
    const passwordValue = password.value.trim()

    if (emailValue === '' || emailValue === 'null'){
        showValidationError(email, 'O campo não pode esta vazio')
        emailValidacao = false
        console.log('erro')
    }
    else if(!isValidEmail(emailValue)){
        showValidationError(email, 'Insira um email valido')
        emailValidacao = false
        console.log('erro isemail')
    }
    else{
        showValidationSuccess(email)
        emailValidacao = true
    }
   
    if (passwordValue === '' || passwordValue === 'null'){
        showValidationError(password, 'O campo não pode está vazio')
        senhaValidacao = false
        console.log('senha erro')
    }
    else if(passwordValue.length < 8){
        showValidationError(password, 'A senha deve conter 8 ou mais caracteres')
        console.log('tamanho')
        senhaValidacao = false

    }
    else{
        showValidationSuccess(password)
        senhaValidacao = true
        console.log('tudo certo')
    }

}


// Mostrando erros na tela

const showValidationError = (element, msgs) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.msg-erro');

    errorDisplay.innerText = msgs;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}


const showValidationSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.msg-erro');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error')
}

// Variaveis que receberão email e senha no padrão
let correcaoLoginE
let correcaoLoginP

// Faz o botão acessar iniciar desabilitado
acessar.setAttribute('disabled', true)

let emailValidacao = false
let senhaValidacao = false
let loginApiValidacao = true



const infoLogin = {
    email : "",
    password: ""
}

acessar.addEventListener('click', async function(event){
    if(validacaoLogin()){
        event.preventDefault()
// colocando dados no padrão
correcaoLoginE = correcao(email.value)
correcaoLoginP = correcao(password.value)
correcaoLoginE = correcaoTLwC(correcaoLoginE)

infoLogin.email = correcaoLoginE
infoLogin.password = correcaoLoginP

let infoLoginJson =JSON.stringify(infoLogin)

let SettRequest = {
    method: 'POST',
    body: infoLoginJson,
    headers: {
        'Content-type': 'application/json',
    },
}
try{
const answer = await fetch(`${BaseUrlApi()}/users/login`, SettRequest)


        if (answer.status != 201 && answer.status != 200){
            throw answer

            
        }
        else{
        const json = await answer.json()
        loginApiValidacao = true
        loginsucess(json.jwt)
        console.log(answer)
        }
    }
    catch(error){
        loginErro(error.status)
    }


    function loginsucess(jwtRecebido){
        sessionStorage.setItem("jwt", jwtRecebido);
        window.location.href = "tarefas.html"
        console.log(jwtRecebido);
    }

    function loginErro(statusRecebido){
        let validantion = document.getElementById('statusValidacao')
        password.value = ""
        if (statusRecebido == 400 || statusRecebido == 404){
            validantion.innerText = "Verifique o e-mail e/ou senha"
            loginApiValidacao = false

        } else {
            loginApiValidacao = true
        }
        validacaoLogin()
    }
      
    }
    else {
        event.preventDefault()
        alert("Ambos campos devem ser preenchidos")
    }

   
})

function resetaValidacaoErro (){
    validantion.innerText = ''
    acessar.removeAttribute("disabled")
    loginApiValidacao = true
}

function validacaoLogin() {
    //Se ambos algum dos campos não forem válido
    if (!emailValidacao || !senhaValidacao || !loginApiValidacao) {
      acessar.setAttribute("disabled", true);
      return false;
      //Se ambos forem válidos
    } else {
      acessar.removeAttribute("disabled");
      return true;
    }
  }

// Fazendo login API
//https://todo-api.ctd.academy/v1/users/login


// async function login (){
//     let infoLogin = {
//         email : email.value,
//         password: password.value
//     }
    
//     // Convetendo objeto infoLogin em Json
//     // const infoLoginJson = JSON.stringify(infoLogin)
    
//     // Confingurando a requisição na API

//     .then(){
//         const info = await fetch(`https://todo-api.ctd.academy/v1/users/login`, SettRequest);
//         let KeyJwt = await info.json();
//         console.log(KeyJwt.jwt);
//     }
//     catch(erro) {
//         console.log(erro);
//     }
// }