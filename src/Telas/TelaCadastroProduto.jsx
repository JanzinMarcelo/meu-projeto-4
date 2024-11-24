import { Container } from "react-bootstrap";
import Pagina from "../templates/Pagina";
import FormularioCadProduto from "./Formularios/FormCadProduto";
import TabelaProdutos from "./Tabelas/TabelaProdutos";
import { useState } from "react";
import { listaProdutos } from "../dadosMocados/listaProdutos";

export default function TelaCadastroProduto(props) {
    const [mostrarTabela, setMostrarTabela] = useState(true);
    const [produtos, setProdutos] = useState(listaProdutos);
    const [modoEditor, setModoEditor] = useState(false);
    const [produtoSelect, setProdutoSelect] = useState({
        codigo: '',
        nome: '',
        quantidade: 0,
        precoCompra: '',
        precoVenda: '',
        categoria: '',
    });

    return (
        <Pagina>
            <Container mt-3>
                <h2 className="text-center">Tela de Cadastro de Produtos</h2>
                {
                    mostrarTabela ? (
                        <TabelaProdutos 
                            setMostrarTabela={setMostrarTabela}
                            listaProdutos={produtos}
                            setListaProdutos={setProdutos}
                            setProdutoSelect={setProdutoSelect}
                            setModoEditor={setModoEditor}
                        />
                    ) : (
                        <FormularioCadProduto 
                            setMostrarTabela={setMostrarTabela}
                            listaProdutos={produtos}
                            modoEditor={modoEditor}
                            setModoEditor={setModoEditor}
                            produtoSelect={produtoSelect}
                            setProdutoSelect={setProdutoSelect}
                        />
                    )
                }
            </Container>
        </Pagina>
    );
}
