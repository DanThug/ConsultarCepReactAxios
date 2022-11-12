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

  const getOnlyNumbers = value => value.replace(/\D/g, '');

  const showOrHideButton = value => {
    const classToSet = value.length > 0 ? 'activeButton' : '';

    return setBtnContainerClass(classToSet);
  };

  const checkInputLength = () => {
    const hasEightDigits = inputValue.length >= 8;

    if (hasEightDigits) {
      return getAddressData();
    }

    return shakeInputAnimation();
  };

  const shakeInputAnimation = () => {
    setInputShakeClass('shakeInput');

    setTimeout(() => {
      setInputShakeClass('');
    }, 2000);
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
    
    setBtnContainerClass('');
    setAddressContainerClass('activeAddress');
    setAlertMessageClass('');
    setAddressData(response);
    return;
  };
  
  const setAddressData = data => {
    setData(data);
    setInputValue('');
  };
  
  return (
    <div className='App'>
      <Header cep={ data.cep } />

      <Main
        getOnlyNumbers={ getOnlyNumbers }
        showOrHideButton={ showOrHideButton }
        setInputValue={ setInputValue }
        inputShakeClass={ inputShakeClass }
        btnContainerClass={ btnContainerClass }
        inputValue={ inputValue }
        checkInputLength={ checkInputLength } />

      <Footer
        data={ data }
        alert={ alertMessageClass }
        address={ addressContainerClass } />
    </div>
  )
}

export default App
