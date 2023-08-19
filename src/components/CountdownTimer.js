// src/components/CountdownTimer.js
import React, { useState, useEffect } from 'react';
import './CountdownTimer.css';

function CountdownTimer() {
  const [minutes, setMinutes] = useState(60);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else if (minutes > 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [minutes, seconds]);

  return (
    <div className="countdown-timer">
      <span>{String(minutes).padStart(2, '0')}{String(' minutes left')}</span>
    </div>
  );
}

export default CountdownTimer;
