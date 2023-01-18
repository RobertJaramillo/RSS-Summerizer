import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react';


const Home = () => {
  const [userInput, setUserInput] = useState('')
  
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  


  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
    
    console.log("Calling OpenAI...")
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });
  
    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text)
  
    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  }


  const onUserChangedText = (event) => {
    console.log(event.target.value);
    setUserInput(event.target.value);
  };
  
  return (
    <div className="root">
      <Head>
        <title>GPT-3 Writer | buildspace</title>
      </Head>
      <div className="container">
        
        <div className="header">
        
          <div className="header-title">
            <h1>Prompt Maker</h1>
            <r>The AI art prompt generator</r>   
          </div>
        
          <div className="header-subtitle">
            <h2>Enter the subject to create an AI prompt about</h2>
          </div>
        
        </div>

        <div className="prompt-container">
          
          <div className="header-subtitle">
            <h2>Specify the subject (Person, Place, or thing)</h2>
          </div>
          <textarea
            className="Subject-box"
            placeholder="What is the subject? i.e Person, Building, Car, etc..."
            value={userInput}
            onChange={onUserChangedText}
          />;

        <textarea
          className="Action-box"
          placeholder="What is the subject doing? Running,  Sitting,  Flying, Driving, etc..."
          value={userInput}
          onChange={onUserChangedText}
        />;

        <textarea
          className="Style-box"
          placeholder="What style of image do you want? i.e. Oil painting, High Res, etc..."
          value={userInput}
          onChange={onUserChangedText}
        />;


  
        {/* Button  */}
        <div className="prompt-buttons">
          <a
            className={isGenerating ? 'generate-button loading' : 'generate-button'}
            onClick={callGenerateEndpoint}
          > 
            <div className="generate">
              {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
           </div>
          </a>
        </div>

      {/* Output */}
      {apiOutput && (
      <div className="output">
        <div className="output-header-container">
          <div className="output-header">
            <h3>Output</h3>
          </div>
        </div>
        <div className="output-content">
          <p>{apiOutput}</p>
        </div>
      </div>
      )}

</div>





      </div>
      

      
      <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build with buildspace</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
