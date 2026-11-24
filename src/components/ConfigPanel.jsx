import { useState } from 'react';
import './ConfigPanel.css';

function ConfigPanel({ apiKey: envApiKey, folderId: envFolderId, onRefresh }) {
  const [apiKey, setApiKey] = useState('');
  const [folderId, setFolderId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = async () => {
    setIsLoading(true);
    await onRefresh(apiKey, folderId);
    setIsLoading(false);
  };

  const displayApiKey = envApiKey ? envApiKey.substring(0, 10) + '...' : 'your_api_key_here';
  const displayFolderId = envFolderId ? envFolderId.substring(0, 8) + '...' : 'your_folder_id_here';

  return (
    <div className="config-panel">
      <h4 className="config-title">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <circle cx="12" cy="12" r="3"/>
          <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 1.55V21a2 2 0 1 1-4 0v-.05A1.7 1.7 0 0 0 9 19.4a1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.55-1H3a2 2 0 1 1 0-4h.05A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.55V3a2 2 0 1 1 4 0v.05a1.7 1.7 0 0 0 1 1.55 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9a1.7 1.7 0 0 0 1.55 1H21a2 2 0 1 1 0 4h-.05a1.7 1.7 0 0 0-1.55 1z"/>
        </svg>
        Google Drive Config
      </h4>
      
      <div className="config-field">
        <label className="config-label" htmlFor="apiKeyInput">API Key</label>
        <input
          type="text"
          className="config-input"
          id="apiKeyInput"
          placeholder={displayApiKey}
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          autoComplete="off"
          spellCheck="false"
        />
      </div>
      
      <div className="config-field">
        <label className="config-label" htmlFor="folderIdInput">Folder ID</label>
        <input
          type="text"
          className="config-input"
          id="folderIdInput"
          placeholder={displayFolderId}
          value={folderId}
          onChange={(e) => setFolderId(e.target.value)}
          autoComplete="off"
          spellCheck="false"
        />
      </div>
      
      <button
        type="button"
        className="btn btn-primary"
        onClick={handleRefresh}
        disabled={isLoading}
        style={{ width: '100%' }}
      >
        {isLoading ? (
          <>
            <span className="spinner-mini" aria-hidden="true"></span>
            กำลังโหลด...
          </>
        ) : (
          'รีเฟรชข้อมูล'
        )}
      </button>
      
      <p className="config-note">
        <svg className="config-note-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <circle cx="12" cy="12" r="9"/>
          <path d="M12 8h.01M11 12h1v4h1"/>
        </svg>
        ใส่ค่าใน .env หรือกรอกในฟอร์มนี้ เพื่อโหลดรูปจาก Google Drive
      </p>
    </div>
  );
}

export default ConfigPanel;
