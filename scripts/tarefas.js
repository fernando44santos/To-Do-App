// https://todo-api.ctd.academy/#/

let notcompleted = document.querySelector(".tarefas-pendentes")
let tCompleted = document.querySelector(".tarefas-terminadas")
let buttonCreateTask = document.getElementById('create')
let pendingTask = document.getElementById('pTask')
let SignOut = document.getElementById('closeApp')


let jwt;
onload = () => {
    jwt = sessionStorage.getItem("jwt")


    if (!jwt) {
        alert("É necessario fazer login")
        window.location = 'index.html'
    }
    else {
        buscandoUsuarioNaAPI(jwt)
        tasksAPI()
    }
}

function buscandoUsuarioNaAPI(jwtsalvo) {
    let SettRequest = {
        headers: {
            'authorization': jwtsalvo
        },
    }
    fetch(`${apiBaseUrl()}/users/getMe`, SettRequest)
        .then((resposta) => {

            if (resposta.status == 201 || resposta.status == 200) {
                return resposta.json();
            } else {

                throw resposta;
            }

        }).then((dados) => {
            renderizaNomeUsuario(dados);
        }).catch(error => {
            console.log('Servidor não está respondendo');
        })
}

function renderizaNomeUsuario(usuario) {
    userName = document.getElementById('userName');
    userName.innerText = `${usuario.firstName} ${usuario.lastName}`;
}

// ERRO OBJETO NÃO INTERAVEL 'tasksList'
// function tasksAPI(){
//     let SettRequest = {
//         headers: {
//           'authorization' : jwt
//         },
//       }

//     //   fetch(`${apiBaseUrl()}/tasks`, SettRequest)
//     //   .then((resposta) =>{
//     //     dados = resposta.json()
//     //     tasks(dados)

//     //   console.log(dados)

//     //   })
// ERRO OBJETO NÃO INTERAVEL



buttonCreateTask.addEventListener('click', event => {

    event.preventDefault()

    let descritionTask = document.getElementById('novaTarefa')

    if (descritionTask.value != "") {
        console.log('Tarefa nao vazia')

        let bodyRequest = {
            "description": descritionTask.value,
            "completed": false
        }

        let SettRequest = {
            method: 'POST',
            body: JSON.stringify(bodyRequest),
            headers: {
                'Content-type': 'application/json',
                'authorization': jwt
            },
        }
        fetch(`${apiBaseUrl()}/tasks`, SettRequest)
            .then(chamada => {
                if (chamada.status == 201 || chamada.status == 200) {
                    return chamada.json();
                }
                throw response;
            }).then(dados => {
                console.log(dados);
                addNewTask(dados);
            });
        // Resetando campo que adiciona a tarefa
        descritionTask.value = "";
    } else {
        alert('Escreva a descrição da tarefa');
    }

})
function addNewTask(tarefa) {

    let NTaks = `
    <div class="not-done" onclick="tasksAPIfinished(${tarefa.id})"></div>
        <div class="descricao">
        <p class="nome">${tarefa.description}</p>
        <p class="timestamp">${tarefa.createdAt}</p>
    </div>
`;
    let newtask = document.createElement('li')
    newtask.id = `id-${tarefa.id}`
    newtask.innerHTML = NTaks
    newtask.classList.add("tarefa")
    notcompleted.appendChild(newtask)

}







async function tasksAPI() {
    let SettRequest = {
        headers: {
            'authorization': jwt
        },
    }
    let dado = await fetch(`${apiBaseUrl()}/tasks`, SettRequest)
    let dados = await dado.json();
    tasks(dados)
}

let tasksListAll = []




function tasks(tasksList) {

    tasksListAll = tasksList




    for (let tarefa of tasksList) {
        console.log(tasksListAll)
        if (!tarefa.completed) {
            //Tarefas Pendentes
            let NTaks = `
                <div class="not-done" onclick="tasksAPIfinished(${tarefa.id})"></div>
                    <div class="descricao">
                    <p class="nome">${tarefa.description}</p>
                    <p class="timestamp">${tarefa.createdAt}</p>
                </div>
            `;
            let newtask = document.createElement('li');
            newtask.setAttribute('id', `id-${tarefa.id}`)
            newtask.innerHTML = NTaks
            newtask.classList.add("tarefa");
            notcompleted.appendChild(newtask);
            // console.log("funcionando inco")
        }
        else {
            //Tarefas Completas

            let NTaksf = `
            
                    <div class="descricao")>
                    <p class="nome">${tarefa.description}</p>
                    
                    <div class="opcoes-tarefas-completas">
                        <button"><i id="tarefa_${tarefa.id}" class="fas fa-undo-alt change" onclick="tasksAPIfinishedFalse(${tarefa.id})" title="Voltar para tarefa pendente"></i></button>
                        <button><i id="tarefa_${tarefa.id}" class="far fa-trash-alt" onclick="del(${tarefa.id})"></i></button>
                    </div>
                </div>
            `;
            let newtaskf = document.createElement('li')
            newtaskf.id = `id-${tarefa.id}`
            newtaskf.classList.add("tarefa")
            newtaskf.innerHTML = NTaksf
            tCompleted.appendChild(newtaskf)
            
        }
    }
}


// Completando tarefa
// O evento que completa a tarefa esta sendo chamado com onclick

async function tasksAPIfinished(taskId) {



    let completed = {
        completed: true
    }
    const completedJson = JSON.stringify(completed)
    let SettRequest = {
        method: 'PUT',
        body: completedJson,
        headers: {
            'Content-type': 'application/json',
            'authorization': jwt
        },
    }

    let resposta = await fetch(`${apiBaseUrl()}/tasks/${taskId}`, SettRequest)
    let dados = await resposta.json();
    finished(dados)




}

function finished(tarefa) {
    console.log(tarefa.id)
    let taskf = document.getElementById(`id-${tarefa.id}`);
    taskf.remove();

    let newcompleted = `
            <div class="descricao">
                <p class="nome">${tarefa.description}</p>
                <div class="opcoes-tarefas-completas">
                    <button><i id="tarefa_${tarefa.id}" class="fas fa-undo-alt change" title="Voltar para tarefa pendente" onclick="tasksAPIfinishedFalse(${tarefa.id})"></i></button>
                    <button><i id="tarefa_${tarefa.id}" class="far fa-trash-alt" onclick="del(${tarefa.id})"> </i></button>
                </div>
            </div>
        `;
    let completedTask = document.createElement('li')
    completedTask.setAttribute('id', `id-${tarefa.id}`)
    completedTask.innerHTML = newcompleted
    completedTask.classList.add('tarefa')
    tCompleted.appendChild(completedTask)
}






// Retornando o status para não completa
async function tasksAPIfinishedFalse(taskId) {



    let completed = {
        completed: false
    }
    const completedJson = JSON.stringify(completed)
    let SettRequest = {
        method: 'PUT',
        body: completedJson,
        headers: {
            'Content-type': 'application/json',
            'authorization': jwt
        },
    }

    let dador = await fetch(`${apiBaseUrl()}/tasks/${taskId}`, SettRequest)
    let dados = await dador.json();

    finishedfalse(dados)


}

function finishedfalse(tarefa) {
    let taskf = document.getElementById(`id-${tarefa.id}`);
    taskf.remove();

    let NTaks = `
    <div class="not-done" onclick="tasksAPIfinished(${tarefa.id})"></div>
        <div class="descricao">
        <p class="nome">${tarefa.description}</p>
        <p class="timestamp">${tarefa.createdAt}</p>
    </div>
`;
    let newtask = document.createElement('li');
    newtask.id = `id-${tarefa.id}`
    newtask.innerHTML = NTaks
    newtask.classList.add("tarefa");
    notcompleted.appendChild(newtask);
    console.log("funcionando inco")
}
// ----------------------------------------------------------


// DELETANDO TASK
async function del(taskId) {

    let SettRequest = {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'authorization': jwt
        },
    }

    await fetch(`${apiBaseUrl()}/tasks/${taskId}`, SettRequest)

    let taskf = document.getElementById(`id-${taskId}`);
        taskf.remove();
        
        
}

// -------------------------------------------------------------


// deslogando

SignOut.addEventListener('click', async function signOut(taskId) {

    sessionStorage.clear()
    window.location = 'index.html'

})
// --------------------------------------------------------------