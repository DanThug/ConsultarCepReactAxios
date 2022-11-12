import { BiSearch } from 'react-icons/bi';
import './Main.css';

const Main = props => {
    return (
        <main>
            <div className='container'>
                <div className={ `inputContainer ${ props.inputShakeClass }` }>
                    <input
                        type='text'
                        maxLength='8'
                        onInput={ e => props.showOrHideButton(props.getOnlyNumbers(e.target.value)) }
                        onChange={ e => props.setInputValue(props.getOnlyNumbers(e.target.value)) }
                        value={ props.inputValue }
                        placeholder='Digite o cep...' />
                </div>

                <div className={ `buttonContainer ${ props.btnContainerClass }` }>
                    <button onClick={ props.checkInputLength }>
                        <BiSearch name='SearchButton' size={ 25 }  color='white' />
                    </button>
                </div>
            </div>
        </main>
    );
};

export default Main;