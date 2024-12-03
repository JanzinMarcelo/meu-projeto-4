import { Button, Col, Form, Row } from "react-bootstrap";
import { useState } from "react";
import { cadastrarFuncionario, alterarFuncionario } from "../../services/servicoFuncionario";

export default function FormularioCadFuncionario(props) {
    const [funcionario, setFuncionario] = useState(props.funcionarioSelecionado);

    const [validado, setValidado] = useState(false);

    function atualizarFuncionario(evento) {
        const nome = evento.target.name;
        const valor = evento.target.value;
        setFuncionario({ ...funcionario, [nome]: valor });
    }

    function cadastrar(evento) {
        const formulario = evento.currentTarget; //aquele que disparou o evento
        if (formulario.checkValidity()) {
            setValidado(false);
            if (!props.modoEdicao) {
                //adicionar um funcionário na lista
                cadastrarFuncionario(funcionario).then((resposta) => {
                    if (resposta.status) {
                        props.listaFuncionarios.push(funcionario);
                        props.setExibirTabela(true);
                    }
                    else
                    {
                        alert(resposta.mensagem);
                    }
                }).catch((erro) => {
                    alert("Não foi possível se comunicar com o backend:" + erro.message);
                });
            }
            else{
                alterarFuncionario(funcionario).then((resposta) => {
                    if (resposta.status){
                        //atualizar o funcionário na lista
                        const indice = props.listaFuncionarios.findIndex((func) => { return func.cpf == funcionario.cpf });
                        props.listaFuncionarios[indice] = funcionario;
                        props.setModoEdicao(false);
                        props.setFuncionarioSelecionado({
                            cpf: "",
                            nome: "",
                            endereco: "",
                            cidade: "",
                            estado: "",
                            cep: "",
                        });
                        props.setExibirTabela(true);
                    }
                    else{
                        alert(resposta.mensagem);
                    }
                }).catch((erro) => {
                    alert("Não foi possível se comunicar com o backend:" + erro.message);
                });
            }
        }
        else {
            setValidado(true);
        }
        evento.preventDefault();
        evento.stopPropagation();
    }

    return (
        <Form validated={validado} className="border p-2" noValidate onSubmit={cadastrar}>
            <Row className="mb-3">
                <Form.Group as={Col} md="4">
                    <Form.Label>CPF:</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="CPF"
                        value={funcionario.cpf}
                        id="cpf"
                        name="cpf"
                        onChange={atualizarFuncionario}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe o CPF!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col}>
                    <Form.Label>Nome Completo:</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Nome Completo"
                        id="nome"
                        name="nome"
                        onChange={atualizarFuncionario}
                        value={funcionario.nome}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe o nome completo!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col}>
                    <Form.Label>Endereço:</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Endereço"
                        value={funcionario.endereco}
                        id="endereco"
                        name="endereco"
                        onChange={atualizarFuncionario}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe o endereço!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="6">
                    <Form.Label>Cidade:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Cidade"
                        value={funcionario.cidade}
                        required
                        id="cidade"
                        name="cidade"
                        onChange={atualizarFuncionario} />
                    <Form.Control.Feedback type="invalid">
                        Por favor, informe a cidade.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3">
                    <Form.Label>Estado:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="State"
                        required
                        value={funcionario.estado}
                        id="estado"
                        name="estado"
                        onChange={atualizarFuncionario} />
                    <Form.Control.Feedback type="invalid">
                        Por favor, informe o estado.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3">
                    <Form.Label>Cep:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Cep"
                        value={funcionario.cep}
                        id="cep"
                        name="cep"
                        onChange={atualizarFuncionario}
                        required />
                    <Form.Control.Feedback type="invalid">
                        Por favor, informe o CEP!
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Button type="submit">{ props.modoEdicao ? "Atualizar" : "Cadastrar" }</Button> <Button variant="secondary" type="button" onClick={() => {
                props.setExibirTabela(true);
            }}>Voltar</Button>
        </Form>
    );
}
