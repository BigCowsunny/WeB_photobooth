const cache = new Map();
const CACHE_EXPIRY = 30 * 1000; // 30 วินาที (ให้ตรงกับ auto-refresh interval)

export async function fetchImagesFromDrive(folderId, apiKey) {
  const cacheKey = `${folderId}_${apiKey}`;
  const cached = cache.get(cacheKey);
  
  if (cached && Date.now() - cached.timestamp < CACHE_EXPIRY) {
    console.log('Using cached data');
    return cached.data;
  }
  
  try {
    // เรียงตาม createdTime จากเก่าไปใหม่ (ascending)
    const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents+and+mimeType+contains+'image/'&fields=files(id,name,webContentLink,thumbnailLink,mimeType,createdTime)&orderBy=createdTime&key=${apiKey}&pageSize=500`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    const images = data.files.map(file => ({
      id: file.id,
      title: file.name.replace(/\.[^/.]+$/, ''),
      src: `https://drive.google.com/thumbnail?id=${file.id}&sz=w1920`,
      thumbnail: `https://drive.google.com/thumbnail?id=${file.id}&sz=w640`,
      downloadUrl: `https://drive.google.com/uc?export=download&id=${file.id}`,
      category: 'all',
      createdTime: file.createdTime
    }));
    
    cache.set(cacheKey, {
      data: images,
      timestamp: Date.now()
    });
    
    console.log(`Fetched ${images.length} images from Google Drive (sorted by createdTime: oldest to newest)`);
    return images;
  } catch (error) {
    console.error('Google Drive API Error:', error);
    throw error;
  }
}
