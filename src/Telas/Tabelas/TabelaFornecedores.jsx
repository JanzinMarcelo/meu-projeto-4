import { Container, Table, Button } from "react-bootstrap";
export default function TabelaFornecedores(props) {

    function editarFornecedor(fornecedor) {
        props.setFornecedorSelect(fornecedor);
        props.setModoEditor(true);
        props.setMostrarTabela(false);
    }

    function sumirFornecedor(cnpj) {
        if (window.confirm("Deseja realmente excluir o fornecedor?")) {
            const listaNova = props?.listaFornecedores.filter((fornecedor) => {
                return fornecedor.cnpj !== cnpj;
            });
            props.setListaFornecedores(listaNova);
        }
    }

    return (
        <Container>
            <Button
                className="mt-3 mb-3"
                onClick={() => {
                    props.setMostrarTabela(false);
                    props.setModoEditor(false);
                    props.setFornecedorSelect({
                        cnpj: '',
                        nome: '',
                        endereco: '',
                        telefone: '',
                        email: ''
                    });
                }}
                style={{ backgroundColor: "#4CAF50", borderColor: "#4CAF50", color: "#FFF", fontWeight: "bold" }}
            >
                Cadastrar novo fornecedor
            </Button>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>CNPJ</th>
                        <th>Nome</th>
                        <th>Endereço</th>
                        <th>Telefone</th>
                        <th>Email</th>
                        <th>Editar</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props?.listaFornecedores.map((fornecedor) => {
                            return (
                                <tr key={fornecedor.cnpj}>
                                    <td>{fornecedor.cnpj}</td>
                                    <td>{fornecedor.nome}</td>
                                    <td>{fornecedor.endereco}</td>
                                    <td>{fornecedor.telefone}</td>
                                    <td>{fornecedor.email}</td>
                                    <td>
                                        <Button variant="danger" onClick={() => sumirFornecedor(fornecedor.cnpj)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                                            </svg>
                                        </Button>
                                        <Button variant="warning" onClick={() => editarFornecedor(fornecedor)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
                                            </svg>
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </Table>
        </Container>
    );
}
