import {Configuration, OpenAIApi } from 'openai'; 
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
}); 

const openai = new OpenAIApi(configuration)


const basePromptPrefix = 'Give a detailed description of a ' 
const basePromptPostfix = ' surronded by a delapidated stemapunk ruins of a long forgotten city.  It must be a complete sentences'

//TO DO: Prompt can be expanded pretty well this is a base implementation.  


const generateAction = async (req,  res) => {

    //Run the first prompt 
    console.log('API: ${basePromptPrefix}${req.body.userInput}')

    const baseCompletion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `${basePromptPrefix}${req.body.userInput}${basePromptPostfix}`,
        temperature: 0.9,
        max_tokens: 200,
      });

    const basePromptOutput = baseCompletion.data.choices.pop();  

    res.status(200).json({ output: basePromptOutput});

}

export default generateAction; 