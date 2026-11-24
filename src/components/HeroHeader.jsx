import { useEffect } from 'react';
import './HeroHeader.css';

function HeroHeader() {
  useEffect(() => {
    // Create shooting stars
    const createShootingStar = () => {
      const star = document.createElement('div');
      star.className = 'shooting-star';
      star.style.top = `${Math.random() * 50}%`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.animationDelay = `${Math.random() * 3}s`;
      document.body.appendChild(star);

      setTimeout(() => {
        star.remove();
      }, 3000);
    };

    // Create a shooting star every 4 seconds
    const interval = setInterval(createShootingStar, 4000);
    
    // Create initial shooting star
    createShootingStar();

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-header">
      <div className="container">
        <div className="hero-ornament left" aria-hidden="true">✦</div>
        <div className="hero-ornament right" aria-hidden="true">✧</div>
        <div className="planet planet-1" aria-hidden="true"></div>
        <div className="planet planet-2" aria-hidden="true"></div>
        
        <div className="hero-content">
          <div className="eyebrow">
            <span className="star-icon">★</span>
            Photo Kmutnb Prachin
            <span className="star-icon">★</span>
          </div>
          <h1 className="hero-title">KMUTNB FEST 2026</h1>
          <p className="hero-subtitle">
            งานนมัสการเหลวงพ่อสิงค์ & KMUTNB FEST 2026<br/>
          </p>
        </div>
        <div className="divider"></div>
      </div>
    </section>
  );
}

export default HeroHeader;
