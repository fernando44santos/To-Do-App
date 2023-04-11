
// Retira os espaços
function correcao (rec){
    return rec.trim()
}

// Deixa todas as letras minusculas
function correcaoTLwC(rec){
    return rec.toLowerCase()
}
// Valida o email no formato padrão
const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};
// Regex para evitar senhas fracas, min de 8, entre eles mai/min, num e simb
const isValidPassword = password => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/
    return regex.test(password)
};

// Função com base da URL
function apiBaseUrl(){
    return "https://todo-api.ctd.academy/v1"
  }


//   mostrando os erros na tela


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
// -------------------------------------------