import { useEffect, useState } from 'react';
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
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [data, setData] = useState("");

  const handleSubmit = () => {
    const result = eval(data)
    setInput(`${result}`)
    setOutput(`${result}`)
    setData(`${result}`);
  }
  const handleClear = () => {
    setInput("0")
    setOutput("")
    setData("")
  }
  const handleNumbers = (value) => {
    if(!data.length){
      setInput(`${value}`);
      setData(`${value}`);
    } else if (value === 0 && (data === "0" || input === "0")) {
        setData(`{data}`);
      } else { 
        const lastChat = data.charAt(data.lenght - 1);
        const isLastChatOperator = 
        lastChat === "*" || operators.includes(lastChat);

        setInput(isLastChatOperator ? `${value}` : `${input}${value}`);
        setData(`${data}${value}`);
      }
    }
  
  const dotOperator = () => {

    const lastChat = data.charAt(data.length -1);
    if(!data.length){
      setInput("0.");
      setData(`0.`);
    } else {
      if(lastChat === "*" || operators.includes(lastChat)){
        setInput("0.");
        setData(`${data} 0.`);
      } else {
        setInput (
          lastChat === "." || input.includes(".") ? `${input}` : `${input}`
        );
        const formattedValue = 
        lastChat === "." || input.includes(".")
        ? `${data}`
        : `${data}`;
        setData(formattedValue)
      }
    }
  }
  const handleOperatos = (value) => {
    if(data.length){
      setInput(`${value}`);
      const beforeLastChat = data.charAt(data.lenght - 2);

      const beforeLastChatIsOperator = operators.includes(beforeLastChat) || beforeLastChat === "*";

      const lastChat = data.charAt(data.length - 1);

      const lastChatIsOperator = operators.includes(lastChat) || lastChat === "*";
    
      const validOP = value === "x" ? "*": value;
      if(
        (lastChatIsOperator && value !== "-") ||
        beforeLastChatIsOperator && lastChatIsOperator
      ){
        if(beforeLastChatIsOperator){
          const updatedValue = `${data.substring(
            0,
            data.length - 2
          )}${value}`;
          setData(updatedValue);
        } else {
          setData(`${data.substring(0, data.lenght - 1)}${validOP}`);
        }
        } else {
          setData(`${data}${validOP}`);
        }
      }
  }
  const handleOutput = () => {
    setOutput(data);
  }

  const handleInput = (value) => {
    const number = numbers.find((num) => num === value);
    const operator = operators.find((op) => op === value);

    switch(value){
      case "=":
        handleSubmit();
        break;
      case "AC":
        handleClear();
        break;
      case number:
        handleNumbers(value);
        break;
      case ".":
        dotOperator(value);
        break;
      case operator:
        handleOperatos(value);
        break;
        default:
          break;
    }

  }

  useEffect(() =>{
      handleOutput();
  }, [data])

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
