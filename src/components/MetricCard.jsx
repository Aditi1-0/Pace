import React, { useState } from 'react';

export default function MetricCard({ id, title, value, target, daysLeft, category, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newValue, setNewValue] = useState(value);

  const pct = target > 0 ? Math.min(100, Math.round((value / target) * 100)) : 0;
  const isComplete = pct >= 100;

  const handleSave = () => {
    onUpdate(id, parseInt(newValue, 10));
    setIsEditing(false);
  };

  return (
    <div 
      className="card premium-card h-100 p-4 d-flex flex-column justify-content-between position-relative overflow-hidden"
      style={{
        backgroundColor: isComplete ? '#f4fbf6' : 'var(--surface-card)',
        borderColor: isComplete ? '#ccead4' : 'var(--border-color)'
      }}
    >
      {/* Decorative Celebration particles when complete */}
      {isComplete && (
        <div className="position-absolute top-0 start-0 w-100 h-100 pointer-events-none execution-burst" />
      )}

      <div>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="badge badge-sage rounded px-2.5 py-1 small">{category}</span>
          <button 
            type="button" 
            className="btn btn-link p-0 text-decoration-none small text-danger fw-medium"
            onClick={() => onDelete(id)}
            style={{ fontSize: '0.8rem', opacity: 0.6 }}
          >
            Delete
          </button>
        </div>
        
        <h4 className="h6 fw-bold mb-2 text-dark" style={{ letterSpacing: '-0.02em' }}>{title}</h4>
        
        {isEditing ? (
          <div className="d-flex gap-2 align-items-center my-3">
            <input 
              type="number" 
              className="form-control form-control-sm custom-input w-50" 
              value={newValue} 
              onChange={(e) => setNewValue(e.target.value)} 
            />
            <button className="btn btn-sm btn-dark px-3" onClick={handleSave}>Save</button>
            <button className="btn btn-sm btn-link text-muted" onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        ) : (
          <div className="d-flex align-items-baseline my-3">
            <span className="display-6 fw-bold text-dark">{value}</span>
            <span className="text-muted ms-2 small">/ target {target}</span>
          </div>
        )}

        <div className="mb-2 small d-flex justify-content-between text-muted fw-medium">
          <span>{isComplete ? '✨ Milestone Achieved' : 'Velocity Completion'}</span>
          <span className={isComplete ? 'text-success fw-bold' : ''}>{pct}%</span>
        </div>
        
        <div className="progress bg-light" style={{ height: '5px', borderRadius: '10px' }}>
          <div 
            className="progress-bar" 
            role="progressbar" 
            style={{ 
              width: `${pct}%`, 
              backgroundColor: isComplete ? '#60a473' : '#d2c0b4',
              borderRadius: '10px',
              transition: 'width 0.6s cubic-bezier(0.1, 0.8, 0.3, 1)'
            }}
          />
        </div>

        {isComplete && (
          <div className="mt-2 text-success fw-bold small animate-pop">
            🎉 You did it! Target Completed.
          </div>
        )}
      </div>
      
      {!isEditing && (
        <button 
          className="btn btn-sm w-100 mt-4 text-secondary border fw-medium"
          style={{ borderRadius: '8px', background: isComplete ? '#eaf6ed' : '#faf9f6' }}
          onClick={() => {
            setNewValue(value);
            setIsEditing(true);
          }}
        >
          Update Value
        </button>
      )}
    </div>
  );
}