import { BiError } from 'react-icons/bi';
import './Footer.css';

const Footer = props => {
    return (
        <footer>
            <div className={`alertMessage ${ props.alert }`}>
                <span>Falha ao consultar o CEP informado!</span>
                <BiError name='Error' size={ 18 } color='white' />
            </div>
            <div className={`addressContainer ${ props.address }`}>
                <span>{ props.data.logradouro }</span>
                <span>{ props.data.bairro }</span>
                <span>{ props.data.localidade } - { props.data.uf }</span>
            </div>
      </footer>
    );
};

export default Footer;