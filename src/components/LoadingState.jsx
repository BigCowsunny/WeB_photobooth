import './LoadingState.css';

function LoadingState() {
  return (
    <div className="loading-container" role="status" aria-live="polite">
      <div className="spinner" aria-hidden="true"></div>
      <p>กำลังโหลดรูปภาพ...</p>
    </div>
  );
}

export default LoadingState;
