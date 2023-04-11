// const form = document.getElementById('forms')
const email = document.getElementById('inputEmail')
const password = document.getElementById('inputPassword')
const acessar = document.getElementById('login')


// form.addEventListener('submit', e => {
//     e.preventDefault()
//     login();
// })

// Variaveis que receberão email e senha no padrão
let correcaoLoginE
let correcaoLoginP

// Faz o botão acessar iniciar desabilitado
acessar.setAttribute('disabled', true)
acessar.innerText = "Bloqueado"

let emailValidacao = false
let senhaValidacao = false
let loginApiValidacao = true

let emailc = correcao(email.value)

const infoLogin = {
    emailInf : correcaoTLwC(emailc),
    passwordInf: correcao(password.value),
}


console.log(infoLogin.emailInf)
acessar.addEventListener('click',  function(event) {

    if(validacaoLogin()){

    event.preventDefault()

// colocando dados no padrão
// correcaoLoginE = correcao(email.value)
// correcaoLoginP = correcao(password.value)
// correcaoLoginE = correcaoTLwC(correcaoLoginE)






let infoLoginJson = JSON.stringify(infoLogin)

let SettRequest = {
    method: 'POST',
    body: infoLoginJson,
    headers: {
        'Content-type': 'application/json',
    },
}
fetch(`${apiBaseUrl()}/users/login`, SettRequest)
      .then((response) => {
        //  Verifica status de sucesso 
        console.log(response);
        console.log("eae eae eae")
        if (response.status == 201 || response.status == 200) {
          return response.json()
        }
        // Se o código for diferente de sucesso (201), lança um throw para que a execução caia no Catch() 
        throw response;
      }).then(function (resposta) {
        console.log(resposta);
        // Chama função ao obter sucesso no login
        loginsucess(resposta.jwt)
      })
      .catch(error => {
        // Chama função ao obter algum erro no login
        loginErro(error.status)
        console.log("eae eae eae")
      });

    function loginsucess(jwtRecebido){
        sessionStorage.setItem("jwt", jwtRecebido);
        window.location.href = "tarefas.html"
        console.log(jwtRecebido);
    }

    function loginErro(statusRecebido){
        let validantion = document.getElementById('statusValidacao')
        console.log("Ocorreu algum erro, verifique o e-mail e/ou senha")
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
        console.log(infoLogin)
    }
})
    function resetaValidacaoErro (){
        validantion.innerText = ''
        acessar.removeAttribute("disabled")
        acessar.innerText = "Acessar"
        loginApiValidacao = true
    }


email.addEventListener('keyup', function(){
   


    const emailValue = email.value.trim()
    

    if (emailValue === '' || emailValue === 'null'){
        showValidationError(email, 'O campo não pode esta vazio')
        emailValidacao = false
        console.log('erro')
    }
    else if(!isValidEmail(emailValue)){
        showValidationError(email, 'Insira um email valido')
        emailValidacao = false
        console.log('erro isemail?')
    }
    else{
        showValidationSuccess(email)
        emailValidacao = true
    }
    validacaoLogin()
   
})

password.addEventListener('keyup', function(){
    const passwordValue = password.value.trim()
    if (passwordValue === '' || passwordValue === 'null'){
        showValidationError(password, 'O campo não pode está vazio')
        emailValidacao = false
        console.log('senha erro')
       
    }
    else if(passwordValue.length < 8){
        showValidationError(password, 'A senha deve conter 8 ou mais caracteres')
        emailValidacao = false
        console.log('tamanho')
    }
    else{
        showValidationSuccess(password)
        emailValidacao = true
        console.log('tudo certo')
    }
    resetaValidacaoErro()
    validacaoLogin()
})





function validacaoLogin() {
    
    if (!emailValidacao || !senhaValidacao || !loginApiValidacao) {
      acessar.setAttribute("disabled", true)
      return false;
  
    } else {
      acessar.removeAttribute("disabled")
      acessar.innerText = "Acessar"
      console.log("desabled true")
      return true;
    }
  }





//   console.log(`É isso :${correcaoLoginE}`)
//   console.log(info)


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


