// Alterar variáveis e funções para "funcionário"

const urlBase = "http://localhost:4001/funcionarios";

export async function consultarFuncionarios(){
    const resposta = await fetch(urlBase, {method: "GET"});
    const listaFuncionarios = await resposta.json();
    return listaFuncionarios;
}

export async function cadastrarFuncionario(funcionario){
    const resultado = await fetch(urlBase, {
                                            method: "POST",
                                            headers: {
                                                "Content-Type": "application/json"
                                            },
                                            body: JSON.stringify(funcionario)
    });
    const resposta = await resultado.json();
    return resposta;
}

export async function alterarFuncionario(funcionario){
    const resultado = await fetch(urlBase + "/" + funcionario.cpf, { 
                                             method: "PATCH",
                                             headers: {
                                                 "Content-Type": "application/json"
                                             },
                                             body: JSON.stringify(funcionario)
    });
    const resposta = await resultado.json();
    return resposta;
}

export async function excluirFuncionario(cpf){
    const resultado = await fetch(urlBase + "/" + cpf, { method: "DELETE"});
    const resposta = await resultado.json();
    return resposta;
}
