import { useState, useEffect } from 'react';
import HeroHeader from './components/HeroHeader';
import FilterTabs from './components/FilterTabs';
import PhotoGrid from './components/PhotoGrid';
import Lightbox from './components/Lightbox';
import ErrorBanner from './components/ErrorBanner';
import LoadingState from './components/LoadingState';
import EmptyState from './components/EmptyState';
import Footer from './components/Footer';
import { fetchImagesFromDrive } from './services/googleDrive';
import { MOCK_IMAGES } from './data/mockData';
import './App.css';

function App() {
  const [images, setImages] = useState(MOCK_IMAGES);
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiKey, setApiKey] = useState('');
  const [folderId, setFolderId] = useState('');

  const handleRefreshImages = async (customApiKey, customFolderId) => {
    const keyToUse = customApiKey || apiKey;
    const folderToUse = customFolderId || folderId;

    if (!keyToUse || !folderToUse) {
      setError('กรุณาใส่ API Key และ Folder ID ในไฟล์ .env หรือกรอกในฟอร์ม');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const fetchedImages = await fetchImagesFromDrive(folderToUse, keyToUse);
      setImages(fetchedImages);
      setActiveCategory('all');
    } catch (err) {
      setError(err.message);
      console.error('Error fetching images:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // โหลดค่าจาก environment variables และเรียก API อัตโนมัติ
  useEffect(() => {
    const envApiKey = import.meta.env.VITE_GOOGLE_API_KEY;
    const envFolderId = import.meta.env.VITE_GOOGLE_FOLDER_ID;
    
    if (envApiKey && envApiKey !== 'your_api_key_here') {
      setApiKey(envApiKey);
    }
    if (envFolderId && envFolderId !== 'your_folder_id_here') {
      setFolderId(envFolderId);
    }

    // เรียก API อัตโนมัติถ้ามีค่าครบใน .env
    if (envApiKey && envApiKey !== 'your_api_key_here' && 
        envFolderId && envFolderId !== 'your_folder_id_here') {
      handleRefreshImages(envApiKey, envFolderId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-refresh: ตรวจสอบรูปใหม่ทุก 30 วินาที
  useEffect(() => {
    const envApiKey = import.meta.env.VITE_GOOGLE_API_KEY;
    const envFolderId = import.meta.env.VITE_GOOGLE_FOLDER_ID;

    // ถ้าไม่มี API key หรือ Folder ID ก็ไม่ทำ auto-refresh
    if (!envApiKey || envApiKey === 'your_api_key_here' || 
        !envFolderId || envFolderId === 'your_folder_id_here') {
      return;
    }

    // ตั้ง interval ให้รีเฟรชข้อมูลทุก 30 วินาที
    const intervalId = setInterval(() => {
      console.log('🔄 Auto-refreshing images...');
      handleRefreshImages(envApiKey, envFolderId);
    }, 30000); // 30 วินาที = 30000 มิลลิวินาที

    // Clear interval เมื่อ component unmount
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredImages = activeCategory === 'all'
    ? images
    : images.filter(img => img.category === activeCategory);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const handleOpenLightbox = (index) => {
    setLightboxIndex(index);
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(-1);
  };

  const handleDismissError = () => {
    setError(null);
  };

  return (
    <div className="app">
      <HeroHeader />

      <section>
        <div className="container">
          <FilterTabs
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />

          {error && (
            <ErrorBanner
              message={error}
              onDismiss={handleDismissError}
            />
          )}

          {isLoading ? (
            <LoadingState />
          ) : filteredImages.length === 0 ? (
            <EmptyState />
          ) : (
            <PhotoGrid
              images={filteredImages}
              onImageClick={handleOpenLightbox}
            />
          )}
        </div>
      </section>

      <Footer />

      {lightboxIndex >= 0 && (
        <Lightbox
          images={filteredImages}
          currentIndex={lightboxIndex}
          onClose={handleCloseLightbox}
          onNext={() => setLightboxIndex((lightboxIndex + 1) % filteredImages.length)}
          onPrev={() => setLightboxIndex((lightboxIndex - 1 + filteredImages.length) % filteredImages.length)}
        />
      )}
    </div>
  );
}

export default App;
