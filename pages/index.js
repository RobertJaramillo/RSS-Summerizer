import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react';


const Home = () => {
  const [userInput, setUserInput] = useState('')
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const PromptStylePrefix = ' midJourney '
  const PromptStylePostfix= '  highly detailed, unreal engine cinematic smooth, in the style of detective pikachu, hannah yata charlie immer, neon purple light, low angle, uhd 8k, sharp focus'


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
  
    setApiOutput(`${PromptStylePrefix}${output.text}${PromptStylePostfix}`);
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
        <textarea
          className="Subject-box"
          placeholder="start typing here"
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
