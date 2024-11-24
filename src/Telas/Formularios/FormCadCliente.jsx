import { Button, Col, Form, Row} from "react-bootstrap";
import { useState } from "react";

export default function FormularioCadCliente(props) {

    const [cliente, setCliente] = useState(props.clienteSelect);

    const [validado, setValidado] = useState(false);

    function updateCliente(evento){
        const nome = evento.target.name;
        const valor = evento.target.value;
        setCliente({...cliente, [nome]: valor});

    }
    function cadastrar(evento){
        const formulario = evento.currentTarget; 
        if (formulario.checkValidity()){
            setValidado(false);
        if (!props.modoEditor) {
            //add cliente
            props.listaClientes.push(cliente);
            props.setMostrarTabela(true);
          }
          else {
            //edita cliente
            const indice = props.listaClientes.findIndex((cli) =>{ return cli.cpf === cliente.cpf});
            props.listaClientes[indice] = cliente;
            props.setModoEditor(false);
            props.setClienteSelect({
                cpf:'',
                nomeCompleto:'',
                endereco:'',
                cidade:'',    
                estado:'',
                cep:'',
            });
            props.setMostrarTabela(true);
          }
            
        }
        else{
            setValidado(true);
        }
        evento.preventDefault();
        evento.stopPropagation();
    }

    return (
        <Form validated={validado} className="border p-2" noValidate onSubmit={cadastrar}>
            <Row className="mb-3">
                <Form.Group as={Col} md="4" >
                    <Form.Label>CPF:</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="CPF"
                        id="cpf"
                        name="cpf"
                        value = {cliente.cpf}
                        onChange={updateCliente}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe o CPF!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} >
                    <Form.Label>Nome Completo:</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Nome Completo"
                        id="nomeCompleto"
                        name="nomeCompleto"
                        value = {cliente.nomeCompleto}
                        onChange={updateCliente}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe o nome completo!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} >
                    <Form.Label>Endereço:</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Endereço"
                        id="endereco"
                        name="endereco"
                        value = {cliente.endereco}
                        onChange={updateCliente}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe o endereço!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="6" >
                    <Form.Label>Cidade:</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="Cidade"
                    id="cidade"
                    name="cidade"
                    value = {cliente.cidade}
                    onChange={updateCliente}
                    />
                    <Form.Control.Feedback type="invalid">
                        Por favor, informe a cidade.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" >
                    <Form.Label>Estado:</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="Estado"
                    id="estado"
                    name="estado"
                    value = {cliente.estado}  
                    onChange={updateCliente}
                    />
                    <Form.Control.Feedback type="invalid">
                        Por favor, informe o estado.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" >
                    <Form.Label>Cep:</Form.Label>
                    <Form.Control type="text" placeholder="Cep" 
                    id="cep" 
                    name="cep"
                    value = {cliente.cep}
                    onChange={updateCliente}/>
                    <Form.Control.Feedback type="invalid">
                        Por favor, informe o CEP!
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Button style={{ backgroundColor: "#4CAF50", borderColor: "#4CAF50", color: "#FFF", fontWeight: "bold" }} type="submit">{props.modoEditor ? "Editar" : "Cadastrar"}</Button>
            <Button className="ms-2" variant="secondary" type = "button" onClick={ ()=>{props.setMostrarTabela(true);}}>Voltar</Button> 
        </Form>
    );
}