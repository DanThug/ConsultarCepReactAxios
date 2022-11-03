import { BiSearch } from 'react-icons/bi';
import './Main.css';

const Main = props => {
    return (
        <main>
            <div className='container'>
                <div className={ `inputContainer ${ props.shake }` }>
                    <input
                        type='text'
                        maxLength='8'
                        value={ props.value }
                        onChange={ props.toggle }
                        onKeyUp={ props.update }
                        placeholder='Digite o cep...' />
                </div>

                <div className={ `buttonContainer ${ props.button }` }>
                    <button onClick={ props.checkInput }>
                        <BiSearch size={ 25 }  color='white' />
                    </button>
                </div>
            </div>
        </main>
    );
};

export default Main;