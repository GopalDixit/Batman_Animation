import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';

// Import images
import batmanImg from './assets/batman-removebg-preview.png';
import batarangImg from './assets/batarang-removebg-preview.png';
import batImg from './assets/batimg-removebg-preview.png';
import buildingImg from './assets/building-removebg-preview.png';

const BatmanAnimation = () => {
  const [isThunderstorm, setThunderstorm] = useState(false);
  const batarangRef = useRef(null);
  const batsRef = useRef([]);
  const containerRef = useRef(null);
  const cloudsRef = useRef(null);

  const handleThunderstormClick = () => {
    console.log('Thunderstorm clicked'); 

    setThunderstorm(true);

    const tl = gsap.timeline();

    // Thunderstorm effect
    tl.to(containerRef.current, {
      backgroundColor: '#032357', 
      duration: 1,
      onStart: () => console.log('Thunderstorm started'), 
    });

    tl.to(containerRef.current, {
      backgroundColor: '#444', //thunder flashes
      duration: 0.1,
      repeat: 5,
      yoyo: true,
      ease: 'linear',
      onComplete: () => console.log('Thunderstorm completed'), 
    });

    // Batarang swipe
    tl.fromTo(batarangRef.current, 
      { x: -100, y: 100, opacity: 0 },
      { x: 400, y: -100, opacity: 1, duration: 1.5, ease: 'power2.out' }
    );

    // Bats flying 
    batsRef.current.forEach((bat, index) => {
      tl.fromTo(bat, 
        { x: Math.random() * 800, y: Math.random() * 600 + 400, opacity: 0 },
        { x: Math.random() * 800 - 200, y: Math.random() * -600, opacity: 1, duration: 3, ease: 'power1.inOut', repeat: -1, yoyo: true },
        "-=1" //for overlaping
      );
    });

    
  };

  return (
    <div 
      ref={containerRef} 
      style={styles.container} 
      onClick={handleThunderstormClick} 
    >
      {/* Background and Clouds */}
      <div ref={cloudsRef} style={styles.clouds}></div>

      {/* Building */}
      <div style={styles.building}>
        <img
          src={buildingImg}
          alt="Building"
          style={styles.buildingImage}
        />
      </div>

      {/* Batman */}
      <img
        src={batmanImg}
        alt="Batman"
        style={styles.batman}
      />

      {/* Batarang */}
      <img
        ref={batarangRef}
        src={batarangImg}
        alt="Batarang"
        style={styles.batarang}
      />

      {/* Bats */}
      {Array.from({ length: 50 }).map((_, index) => (
        <img
          key={index}
          ref={el => batsRef.current[index] = el}
          src={batImg}
          alt="Bat"
          style={styles.bat}
        />
      ))}
    </div>
  );
};

const styles = {
  container: {
    position: 'relative',
    height: '100vh',
    width: '100vw',
    backgroundColor: '#2b518f',
    overflow: 'hidden', 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  clouds: {
    position: 'absolute',
    top: '0',
    width: '200%', 
    height: '30%',
    backgroundColor: 'rgba(0, 0, 50, 0)',
    zIndex: 1,
  },
  building: {
    position: 'absolute',
    bottom: '-5px',
    zIndex: 2,
    
  },
  buildingImage: {
    width: '100vw', 
    height: '500px',
    objectFit: 'cover', 
  },
  batman: {
    position: 'absolute',
    bottom: '0px',
    width: '150px',
    zIndex: 3,
  },
  batarang: {
    position: 'absolute',
    width: '50px',
    zIndex: 4,
  },
  bat: {
    position: 'absolute',
    width: '30px',
    zIndex: 2,
  },
};

export default BatmanAnimation;
