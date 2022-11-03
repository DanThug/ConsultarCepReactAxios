import { useState } from 'react';
import api from './services/api';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
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
      setAddressData('');
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
      <Header children={ data.cep } />

      <Main
        shake={ inputShakeClass }
        button={ btnContainerClass }
        update={ updateValue }
        value={ inputValue }
        toggle={ toggleButtonClass }
        checkInput={ checkInputLength } />

      <Footer
        data={ data }
        alert={ alertMessageClass }
        address={ addressContainerClass } />
    </div>
  )
}

export default App
