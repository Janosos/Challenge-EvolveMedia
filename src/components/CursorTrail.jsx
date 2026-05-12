import React, { useState, useEffect } from 'react';

const CursorTrail = () => {
  const [trails, setTrails] = useState([]);

  useEffect(() => {
    let idCounter = 0;
    
    // Throttle to prevent too many DOM nodes
    let lastTime = 0;
    
    const handleMouseMove = (e) => {
      const now = Date.now();
      if (now - lastTime < 20) return; // ~50 fps
      lastTime = now;

      const newTrail = {
        id: idCounter++,
        x: e.clientX,
        y: e.clientY,
      };

      setTrails((prevTrails) => [...prevTrails, newTrail]);

      // Remove the trail element after 500ms
      setTimeout(() => {
        setTrails((prevTrails) => prevTrails.filter(t => t.id !== newTrail.id));
      }, 500);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="cursor-trail-container" style={{ pointerEvents: 'none', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 9999 }}>
      {trails.map(trail => (
        <div
          key={trail.id}
          className="cursor-trail-particle"
          style={{
            left: trail.x,
            top: trail.y,
          }}
        />
      ))}
    </div>
  );
};

export default CursorTrail;
