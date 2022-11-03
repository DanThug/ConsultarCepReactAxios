import './Footer.css';

const Footer = props => {
    return (
        <footer>
            <div className={`alertMessage ${ props.alert }`}>
                <span>Falha ao consultar o CEP informado!</span>
            </div>
            <div className={`addressContainer ${ props.address }`}>
                <span>{ props.data.logradouro }</span>
                <span>{ props.data.bairro }</span>
                <span>{ props.data.localidade }</span>
                <span>{ props.data.estado }</span>
            </div>
      </footer>
    );
};

export default Footer;