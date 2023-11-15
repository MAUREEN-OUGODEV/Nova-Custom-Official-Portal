import React, { useState, useEffect } from 'react';

function Greeting() {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    function getGreeting() {
      const now = new Date();
      const hours = now.getHours();

      if (hours >= 5 && hours < 12) {
        return 'Good morning';
      } else if (hours >= 12 && hours < 17) {
        return 'Good afternoon';
      } else if (hours >= 17 && hours < 21) {
        return 'Good evening';
      } else {
        return 'Good night';
      }
    }

    function updateGreeting() {
      const newGreeting = getGreeting();
      setGreeting(newGreeting);
    }

    updateGreeting(); // Call initially
    const interval = setInterval(updateGreeting, 60000); // Update every minute

    return () => {
      clearInterval(interval); // Clear the interval when the component unmounts
    };
  }, []);

  return (
    <div>
      <h1 className='font-bold'>{greeting}</h1>
    </div>
  );
}

export default Greeting;
