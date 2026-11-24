import { useState, useEffect } from 'react';
import './AutoRefreshIndicator.css';

function AutoRefreshIndicator() {
  const [timeLeft, setTimeLeft] = useState(30);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const envApiKey = import.meta.env.VITE_GOOGLE_API_KEY;
    const envFolderId = import.meta.env.VITE_GOOGLE_FOLDER_ID;

    // ถ้าไม่มี API key หรือ Folder ID ก็ไม่แสดง indicator
    if (!envApiKey || envApiKey === 'your_api_key_here' || 
        !envFolderId || envFolderId === 'your_folder_id_here') {
      setIsActive(false);
      return;
    }

    // นับถอยหลังทุกวินาที
    const countdownInterval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          return 30; // รีเซ็ตเป็น 30 วินาที
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, []);

  if (!isActive) return null;

  return (
    <div className="auto-refresh-indicator" title="รีเฟรชข้อมูลอัตโนมัติทุก 30 วินาที">
      <svg 
        className="refresh-icon" 
        width="16" 
        height="16" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
      </svg>
      <span className="refresh-text">Auto</span>
      <span className="refresh-countdown">{timeLeft}s</span>
    </div>
  );
}

export default AutoRefreshIndicator;
