import { Container } from "react-bootstrap";
import Pagina from "../templates/Pagina";
import FormularioCadFornecedor from "./Formularios/FormCadFornecedor";
import TabelaFornecedores from "./Tabelas/TabelaFornecedores";
import { useState } from "react";
import { listaFornecedores } from "../dadosMocados/listaFornecedores";

export default function TelaCadastroFornecedor(props) {
    const [mostrarTabela, setMostrarTabela] = useState(true);
    const [fornecedores, setFornecedores] = useState(listaFornecedores);
    const [modoEditor, setModoEditor] = useState(false);
    const [fornecedorSelect, setFornecedorSelect] = useState({
        cnpj: '',
        nome: '',
        endereco: '',
        telefone: '',
        email: '',
    });

    return (
        <Pagina>
            <Container mt-3>
                <h2 className="text-center">Tela de Cadastro de Fornecedores</h2>
                {
                    mostrarTabela ? <TabelaFornecedores 
                                        setMostrarTabela={setMostrarTabela}
                                        listaFornecedores={fornecedores}
                                        setListaFornecedores={setFornecedores}
                                        setFornecedorSelect={setFornecedorSelect}
                                        setModoEditor={setModoEditor} />
                                  : <FormularioCadFornecedor 
                                        setMostrarTabela={setMostrarTabela}
                                        listaFornecedores={fornecedores}
                                        modoEditor={modoEditor}
                                        setModoEditor={setModoEditor}
                                        fornecedorSelect={fornecedorSelect}
                                        setFornecedorSelect={setFornecedorSelect} />
                }
            </Container>
        </Pagina>
    );
}
