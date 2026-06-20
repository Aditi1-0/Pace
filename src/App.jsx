import React, { useState } from 'react';
import MetricCard from './components/MetricCard';

const INITIAL_METRICS = [
  { id: 1, title: 'LeetCode Problem Metrics', value: 142, target: 200, daysLeft: 12, category: 'Technical Practice' },
  { id: 2, title: 'Open Source System Commits', value: 38, target: 50, daysLeft: 8, category: 'GitHub Delivery' },
  { id: 3, title: 'Portfolio Architecture Traffic', value: 75, target: 120, daysLeft: 24, category: 'Analytics Tracking' }
];

export default function App() {
  const [metrics, setMetrics] = useState(INITIAL_METRICS);
  
  // Form parameters
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [target, setTarget] = useState('');
  const [days, setDays] = useState('');
  const [category, setCategory] = useState('Technical Practice');

  const handleCreateTracker = (e) => {
    e.preventDefault();
    if (!title || !value || !target || !days) return;

    const newMetric = {
      id: Date.now(),
      title,
      value: parseInt(value, 10),
      target: parseInt(target, 10),
      daysLeft: parseInt(days, 10),
      category
    };

    setMetrics([newMetric, ...metrics]);
    setTitle('');
    setValue('');
    setTarget('');
    setDays('');
  };

  const handleUpdateValue = (id, updatedCount) => {
    setMetrics(metrics.map(m => m.id === id ? { ...m, value: updatedCount } : m));
  };

  const handleDeleteTracker = (id) => {
    setMetrics(metrics.filter(m => m.id !== id));
  };

  return (
    <div className="container py-5" style={{ maxWidth: '1140px' }}>
      <header className="mb-5 pb-4 border-bottom d-flex justify-content-between align-items-end" style={{ borderColor: 'var(--border-color) !important' }}>
        <div>
          <span className="text-uppercase tracking-wider text-muted small fw-bold">Track. Improve. Repeat</span>
          <h1 className="h2 fw-bold mt-1 text-dark">Pace</h1>
        </div>
      </header>

      <div className="row g-4">
        <div className="col-lg-4">
          <div className="p-4 rounded premium-card bg-white">
            <h3 className="h6 mb-4 text-dark fw-bold text-uppercase tracking-wide">Initialize Horizon Target</h3>
            <form onSubmit={handleCreateTracker}>
              <div className="mb-3">
                <label className="form-label text-muted small fw-bold">Target Label</label>
                <input type="text" className="form-control custom-input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Array System Solutions" required />
              </div>
              
              <div className="row g-2 mb-3">
                <div className="col-6">
                  <label className="form-label text-muted small fw-bold">Current Count</label>
                  <input type="number" className="form-control custom-input" value={value} onChange={(e) => setValue(e.target.value)} placeholder="0" required />
                </div>
                <div className="col-6">
                  <label className="form-label text-muted small fw-bold">Target Count</label>
                  <input type="number" className="form-control custom-input" value={target} onChange={(e) => setTarget(e.target.value)} placeholder="100" required />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label text-muted small fw-bold">Achieve in(Days)</label>
                <input type="number" className="form-control custom-input" value={days} onChange={(e) => setDays(e.target.value)} placeholder="e.g., 14" required />
              </div>

              <div className="mb-4">
                <label className="form-label text-muted small fw-bold">Category</label>
                <select className="form-select custom-input" value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="Technical Practice">Technical Practice</option>
                  <option value="GitHub Delivery">GitHub Delivery</option>
                  <option value="Analytics Tracking">LinkedList questions</option>
                </select>
              </div>

              <button type="submit" className="action-btn-primary w-100">
                Set the Pace!
              </button>
            </form>
          </div>
        </div>

        <div className="col-lg-8">
          {metrics.length === 0 ? (
            <div className="text-center p-5 rounded premium-card bg-white text-muted">
              No metrics left in workspace framework. Initialise a target parameter to begin.
            </div>
          ) : (
            <div className="row g-3">
              {metrics.map(metric => (
                <div className="col-md-6" key={metric.id}>
                  <MetricCard 
                    {...metric} 
                    onUpdate={handleUpdateValue} 
                    onDelete={handleDeleteTracker} 
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}