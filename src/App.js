import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [windowPrevState, setWindowPrevState] = useState([]);
  const [windowCurrState, setWindowCurrState] = useState([]);
  const [numbers, setNumbers] = useState([]);
  const [avg, setAvg] = useState(0);

  const fetchNumbers = async (type) => {
    try {
      const response = await axios.get(`http://20.244.56.144/test/${type}`);
      const newNumbers = response.data.numbers;

      // Calculate average and update window states
      const newWindow = [...windowCurrState, ...newNumbers];
      let newWindowPrev = [...windowPrevState];
      if (newWindow.length > 10) {
        newWindowPrev = newWindow.slice(0, newWindow.length - 10);
        newWindow = newWindow.slice(-10);
      }
      const newAvg = calculateAverage(newWindow);

      setWindowPrevState(newWindowPrev);
      setWindowCurrState(newWindow);
      setNumbers(newNumbers);
      setAvg(newAvg);
    } catch (error) {
      console.error('Error fetching numbers:', error);
    }
  };

  const calculateAverage = (nums) => {
    if (nums.length === 0) return 0;
    const sum = nums.reduce((acc, num) => acc + num, 0);
    return sum / nums.length;
  };

  return (
    <div className="App">
      <h1>Average Calculator Microservice</h1>
      <button onClick={() => fetchNumbers('primes')}>Fetch Primes</button>
      <button onClick={() => fetchNumbers('fibo')}>Fetch Fibonacci</button>
      <button onClick={() => fetchNumbers('even')}>Fetch Even</button>
      <button onClick={() => fetchNumbers('rand')}>Fetch Random</button>
      
      <div>
        <h2>Response Format:</h2>
        <pre>
          {JSON.stringify({
            windowPrevState,
            windowCurrState,
            numbers,
            avg: avg.toFixed(2)
          }, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default App;
