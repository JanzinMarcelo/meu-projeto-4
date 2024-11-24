import { Container } from "react-bootstrap";
import Cabecalho from "./Cabecalho";
import Menu from "./Menu";

export default function Pagina(props){
    return (
        <Container>
            <Cabecalho texto="Gerenciamento de Cadastros" />
            <Menu />
            {
                props.children
            }
        </Container>
    );
}