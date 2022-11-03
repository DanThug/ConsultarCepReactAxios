import './Header.css';

const Header = ({ children }) => {
    return (
        <header>
            <div className='title'>
            <h1>{ children || 'Consultar CEP' }</h1>
            </div>
        </header> 
    );
};

export default Header;