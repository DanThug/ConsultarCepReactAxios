import { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import api from './services/api';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [data, setData] = useState('');
  const [btnContainerClass, setBtnContainerClass] = useState('');
  const [alertMessageClass, setAlertMessageClass] = useState('');
  const [addressContainerClass, setAddressContainerClass] = useState('');
  const [inputShakeClass, setInputShakeClass] = useState('');

  const updateValue = e => {
    const newValue = getOnlyNumbers(e.target.value);
    setInputValue(newValue);
  };

  const getOnlyNumbers = value => value.replace(/\D/g, '');

  const checkInputLength = () => {
    const hasEightDigits = inputValue.length >= 8;

    if (hasEightDigits) {
      getAddressData();

      return;
    }

    shakeInputAnimation();
    return;
  };

  const shakeInputAnimation = () => {
    setInputShakeClass('shakeInput');

    setTimeout(() => {
      setInputShakeClass('');
    }, 2000);
  };

  const toggleButtonClass = () => {
    const isAboveZero = inputValue.length > 0 ? 'activeButton' : '';

    setBtnContainerClass(isAboveZero);
  };

  const fetchApi = async () => {
    try {
      const { data } = await api.get(`${inputValue}/json`);
      return data;
    } catch (error) {
      return error;
    }
  };

  const getAddressData = async () => {
    const response = await fetchApi();

    if (response.message || response.erro) {
      setAlertMessageClass('activeMessage');
      setAddressContainerClass('');
      return;
    }

    setAddressContainerClass('activeAddress');
    setAlertMessageClass('');
    setAddressData(response);
  };
  
  const setAddressData = data => {
    setData(data);
    setInputValue('');
  };
  
  return (
    <div className='App'>
      <header>
        <div className='title'>
          <h1>{ data.cep || 'Consultar CEP' }</h1>
        </div>
      </header>

      <main>
        <div className='container'>
          <div className={ `inputContainer ${ inputShakeClass }` }>
            <input
              type='text'
              maxLength='8'
              onChange={ updateValue }
              onKeyUp={ toggleButtonClass }
              value={ inputValue }
              placeholder='Digite o cep...' />
          </div>

          <div className={ `buttonContainer ${ btnContainerClass }` }>
            <button onClick={ checkInputLength }>
              <BiSearch size={ 25 }  color='white' />
            </button>
          </div>

          
        </div>
      </main>

      <footer>
        <div className={`alertMessage ${ alertMessageClass }`}>
          <span>Falha ao consultar o CEP informado!</span>
        </div>
        <div className={`addressContainer ${ addressContainerClass }`}>
          <span>{ data.logradouro }</span>
          <span>{ data.bairro }</span>
          <span>{ data.localidade }</span>
          <span>{ data.estado }</span>
        </div>
      </footer>
    </div>
  )
}

export default App
