import { Alert, Container, Spinner } from "react-bootstrap";
import Pagina from "../templates/Pagina";
import FormularioCadFuncionario from "./Formularios/FormCadFuncionario";
import TabelaFuncionarios from "./Tabelas/TabelaFuncionario";
import { useState, useEffect } from "react";
import { consultarFuncionarios } from "../services/servicoFuncionario";

export default function TelaCadastroFuncionario(props) {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [funcionarios, setFuncionarios] = useState([]);
    const [modoEdicao, setModoEdicao] = useState(false);
    //valores possíveis para situação : ok, erro, processando
    const [situacao, setSituacao] = useState('ok');
    const [funcionarioSelecionado, setFuncionarioSelecionado] = useState({
        cpf: '',
        nome: '',
        endereco: '',
        cidade: '',
        estado: '',
        cep: '',
    });

    useEffect(() => {
        setSituacao('processando');
        consultarFuncionarios()
            .then((listaFuncionarios) => {
                setSituacao('ok');
                setFuncionarios(listaFuncionarios);
            })
            .catch((erro) => {
                console.error(erro.message)
                setSituacao('erro');
            });
    }, []);  //vazio indica que o useEffect sera executado sempre que o componente for carregado -> didMount

    if (situacao === 'erro') {
        return (
            <Pagina>
                <Container mt-3>
                    <h2 className="text-center">Tela de Cadastro de Funcionários</h2>
                    <div>
                        <Alert variant="danger">Erro ao carregar os funcionários.</Alert>
                    </div>
                </Container>
            </Pagina>
        )
    }
    else if (situacao === 'processando') {
        return (
            <Pagina>
                <Container mt-3>
                    <h2 className="text-center">Tela de Cadastro de Funcionários</h2>
                    <div className="d-flex">
                        <Spinner animation="border" />
                        <p>Recuperando os funcionários do backend...</p>
                    </div>
                </Container>
            </Pagina>
        );
    }
    else {
        return (
            <Pagina>
                <Container mt-3>
                    <h2 className="text-center">Tela de Cadastro de Funcionários</h2>
                    {
                        exibirTabela ? <TabelaFuncionarios
                            setExibirTabela={setExibirTabela}
                            listaFuncionarios={funcionarios}
                            setListaFuncionarios={setFuncionarios}
                            setFuncionarioSelecionado={setFuncionarioSelecionado}
                            setModoEdicao={setModoEdicao} />

                            : <FormularioCadFuncionario
                                setExibirTabela={setExibirTabela}
                                listaFuncionarios={funcionarios}
                                modoEdicao={modoEdicao}
                                setModoEdicao={setModoEdicao}
                                funcionarioSelecionado={funcionarioSelecionado}
                                setFuncionarioSelecionado={setFuncionarioSelecionado} />
                    }
                </Container>
            </Pagina>
        )
    }
}