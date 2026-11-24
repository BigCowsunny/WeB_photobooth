import './EmptyState.css';

function EmptyState() {
  return (
    <div className="empty-state" role="status">
      <svg className="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
        <rect x="3" y="6" width="18" height="14" rx="3"/>
        <circle cx="12" cy="13" r="4"/>
        <path d="M8.5 6 10 3.5h4l1.5 2.5"/>
      </svg>
      <h3>ไม่พบรูปภาพในหมวดหมู่นี้</h3>
      <p style={{ color: 'var(--fg-2)', marginTop: 'var(--space-2)' }}>
        กรุณาเลือกหมวดหมู่อื่น หรือตรวจสอบการตั้งค่า API
      </p>
    </div>
  );
}

export default EmptyState;
