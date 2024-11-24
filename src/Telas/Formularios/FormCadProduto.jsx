import { Button, Col, Form, Row} from "react-bootstrap";
import { useState } from "react";

export default function FormularioCadProduto(props) {

    const [produto, setProduto] = useState(props.produtoSelect);

    const [validado, setValidado] = useState(false);

    function updateProduto(evento){
        const nome = evento.target.name;
        const valor = evento.target.value;
        setProduto({...produto, [nome]: valor});
    }

    function cadastrar(evento){
        const formulario = evento.currentTarget; 
        if (formulario.checkValidity()){
            setValidado(false);
            if (!props.modoEditor) {
                //add produto
                props.listaProdutos.push(produto);
                props.setMostrarTabela(true);
            } else {
                //edita produto
                const indice = props.listaProdutos.findIndex((prod) => { 
                    return prod.codigoProduto === produto.codigoProduto;
                });
                props.listaProdutos[indice] = produto;
                props.setModoEditor(false);
                props.setProdutoSelect({
                    codigoProduto: '',
                    nomeProduto: '',
                    quantidadeEstoque: '',
                    precoCusto: '',
                    precoVenda: '',
                    categoria: '',
                });
                props.setMostrarTabela(true);
            }
        } else {
            setValidado(true);
        }
        evento.preventDefault();
        evento.stopPropagation();
    }

    return (
        <Form validated={validado} className="border p-2" noValidate onSubmit={cadastrar}>
            <Row className="mb-3">
                <Form.Group as={Col} md="4" >
                    <Form.Label>Código do Produto:</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Código do Produto"
                        id="codigoProduto"
                        name="codigoProduto"
                        value={produto.codigoProduto}
                        onChange={updateProduto}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe o código do produto!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} >
                    <Form.Label>Nome do Produto:</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Nome do Produto"
                        id="nomeProduto"
                        name="nomeProduto"
                        value={produto.nomeProduto}
                        onChange={updateProduto}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe o nome do produto!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} >
                    <Form.Label>Quantidade em Estoque:</Form.Label>
                    <Form.Control
                        required
                        type="number"
                        placeholder="Quantidade em Estoque"
                        id="quantidadeEstoque"
                        name="quantidadeEstoque"
                        value={produto.quantidadeEstoque}
                        onChange={updateProduto}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe a quantidade em estoque!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="6" >
                    <Form.Label>Preço de Custo:</Form.Label>
                    <Form.Control 
                    type="number" 
                    placeholder="Preço de Custo"
                    id="precoCusto"
                    name="precoCusto"
                    value={produto.precoCusto}
                    onChange={updateProduto}
                    />
                    <Form.Control.Feedback type="invalid">
                        Por favor, informe o preço de custo.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6" >
                    <Form.Label>Preço de Venda:</Form.Label>
                    <Form.Control 
                    type="number" 
                    placeholder="Preço de Venda"
                    id="precoVenda"
                    name="precoVenda"
                    value={produto.precoVenda}  
                    onChange={updateProduto}
                    />
                    <Form.Control.Feedback type="invalid">
                        Por favor, informe o preço de venda.
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} >
                    <Form.Label>Categoria:</Form.Label>
                    <Form.Control type="text" placeholder="Categoria" 
                    id="categoria" 
                    name="categoria"
                    value={produto.categoria}
                    onChange={updateProduto}/>
                    <Form.Control.Feedback type="invalid">
                        Por favor, informe a categoria!
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Button style={{ backgroundColor: "#4CAF50", borderColor: "#4CAF50", color: "#FFF", fontWeight: "bold" }} type="submit">{props.modoEditor ? "Editar" : "Cadastrar"}</Button>
            <Button className="ms-2" variant="secondary" type="button" onClick={() => { props.setMostrarTabela(true); }}>Voltar</Button> 
        </Form>
    );
}
