import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const STOPLIGHT_COLORS = [
    { color: 'go', duration: 2 },
    { color: 'slow', duration: 1 },
    { color: 'stop', duration: 2 },
  ];

  const [activeLight, setActiveLight] = useState(0);
  const [direction, setDirection] = useState('g2s');

  const handleSwitchColor = () => {
    switch (direction) {
      case 'g2s':
        if (activeLight < STOPLIGHT_COLORS.length - 1) {
          setActiveLight((prev) => prev + 1);
        } else if (activeLight === STOPLIGHT_COLORS.length - 1) {
          setActiveLight((prev) => prev - 1);
          setDirection('s2g');
        }
        break;
      case 's2g':
        if (activeLight > 0) {
          setActiveLight((prev) => prev - 1);
        } else if (activeLight === 0) {
          setActiveLight((prev) => prev + 1);
          setDirection('g2s');
        }
        break;
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleSwitchColor();
    }, STOPLIGHT_COLORS[activeLight].duration * 1000);
    return () => clearInterval(interval);
  }, [activeLight, handleSwitchColor, STOPLIGHT_COLORS]);

  return (
    <div className='stoplight'>
      {STOPLIGHT_COLORS.map((light) => (
        <div
          key={light.color}
          className={`light ${light.color} ${
            light.color === STOPLIGHT_COLORS[activeLight].color ? 'active' : ''
          }`}
        ></div>
      ))}
      <p>Active light: {STOPLIGHT_COLORS[activeLight].color}</p>
      <button onClick={() => handleSwitchColor()}>Switch Color</button>
    </div>
  );
}

export default App;
