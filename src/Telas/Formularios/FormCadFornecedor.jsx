import { Button, Col, Form, Row } from "react-bootstrap";
import { useState } from "react";

export default function FormularioCadFornecedor(props) {

    const [fornecedor, setFornecedor] = useState(props.fornecedorSelect);
    const [validado, setValidado] = useState(false);

    function updateFornecedor(evento) {
        const nome = evento.target.name;
        const valor = evento.target.value;
        setFornecedor({ ...fornecedor, [nome]: valor });
    }

    function cadastrar(evento) {
        const formulario = evento.currentTarget;
        evento.preventDefault();
        evento.stopPropagation();

        if (formulario.checkValidity()) {
            setValidado(false);

            if (!props.modoEditor) {
                // Adiciona novo fornecedor
                props.listaFornecedores.push(fornecedor);
                props.setMostrarTabela(true);
            } else {
                // Edita fornecedor existente
                     //edita cliente
            const indice = props.listaFornecedores.findIndex((forn) =>{ return forn.cnpj === fornecedor.cnpj});
            props.listaFornecedores[indice] = fornecedor;
            props.setModoEditor(false);
            props.setFornecedorSelect({
                cpf:'',
                nomeCompleto:'',
                endereco:'',
                cidade:'',    
                estado:'',
                cep:'',
            });
            props.setMostrarTabela(true);
          }
        
        } else {
            setValidado(true);
        }
    }

    return (
        <Form validated={validado} className="border p-2" noValidate onSubmit={cadastrar}>
            <Row className="mb-3">
                <Form.Group as={Col} md="6" >
                    <Form.Label>Nome do Fornecedor:</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Nome do fornecedor"
                        name="nome"
                        value={fornecedor.nome}
                        onChange={updateFornecedor}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe o nome do fornecedor!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="6">
                    <Form.Label>CNPJ:</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="CNPJ do fornecedor"
                        name="cnpj"
                        value={fornecedor.cnpj}
                        onChange={updateFornecedor}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe o CNPJ do fornecedor!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="6">
                    <Form.Label>Endereço:</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Endereço do fornecedor"
                        name="endereco"
                        value={fornecedor.endereco}
                        onChange={updateFornecedor}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe o endereço do fornecedor!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="6">
                    <Form.Label>Telefone:</Form.Label>
                    <Form.Control
                        required
                        type="tel"
                        placeholder="Telefone do fornecedor"
                        name="telefone"
                        value={fornecedor.telefone}
                        onChange={updateFornecedor}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe o telefone do fornecedor!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                        required
                        type="email"
                        placeholder="Email do fornecedor"
                        name="email"
                        value={fornecedor.email}
                        onChange={updateFornecedor}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe o email do fornecedor!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Button style={{ backgroundColor: "#4CAF50", borderColor: "#4CAF50", color: "#FFF", fontWeight: "bold" }} type="submit">
                {props.modoEditor ? "Editar" : "Cadastrar"}
            </Button>
            <Button className="ms-2" variant="secondary" type="button" onClick={() => { props.setMostrarTabela(true); }}>
                Voltar
            </Button>
        </Form>
    );
}
