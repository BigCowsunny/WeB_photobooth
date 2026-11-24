import './ErrorBanner.css';

function ErrorBanner({ message, onDismiss }) {
  return (
    <div className="error-banner" role="alert">
      <svg className="error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/>
        <path d="M12 9v4M12 17h.01"/>
      </svg>
      <p>
        <strong>เกิดข้อผิดพลาด:</strong> {message}
      </p>
      <button
        type="button"
        className="error-dismiss"
        onClick={onDismiss}
        aria-label="ปิดข้อความแจ้งเตือน"
      >
        ×
      </button>
    </div>
  );
}

export default ErrorBanner;
