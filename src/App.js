import { useState } from 'react';
import calcData from './components/CalcData';
import './styles/App.scss';

const operators = ['AC', '/', 'x', '+', '-', '='];
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const Display = ({ input, output }) => (
    <div className='output'>
      <span className='result'>{output}</span>
      <span id='display' className='input'>{input}</span>
    </div>
  )

  const Key = ({ keyData: { id, value }, handleInput}) =>(
    <button id={id} onClick={() => handleInput(value)}>
      {value}
    </button>
  );

  const Keyboard = ({ handleInput }) => (
    <div className='keys'>
      {calcData.map((key) => (
        <Key key={key.id} keyData={key} handleInput={handleInput} />
      ))}
    </div>
  );

function App() {
  const [input, setInput] = useState("0");
  const [output, setOutput] = useState("");

  const handleInput = () =>{

  }

  return (
    <div className='container'>
    <div className='calculator'>
     <Display input={input} output={output} />
     <Keyboard handleInput={handleInput} />
    </div>
    </div>
  );
}

export default App;
