import './Header.css';

const Header = ({ cep }) => {
    return (
        <header>
            <div className='title'>
            <h1>{ cep || 'Consultar CEP' }</h1>
            </div>
        </header> 
    );
};

export default Header;