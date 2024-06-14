import React, { useState } from 'react';
import axios from 'axios';

const ChatGPT = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(''); // Clear previous errors
    try {
      const res = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: input }],
        max_tokens: 150,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
        }
      });
      setResponse(res.data.choices[0].message.content);
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      setError(error.response ? error.response.data.error.message : 'Error fetching response');
    }
  };

  return (
    <div>
      <h1>ChatGPT Extension</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
          required
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {response && <p>Response: {response}</p>}
    </div>
  );
};

export default ChatGPT;
