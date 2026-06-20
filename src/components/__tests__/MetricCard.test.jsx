import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import MetricCard from '../MetricCard';
import '@testing-library/jest-dom';

describe('MetricCard Unit Pipeline', () => {
  const dummyProps = {
    title: 'System Commits',
    value: '45',
    unit: 'pushes',
    category: 'GitHub',
    status: 'Active',
    onInspect: vi.fn()
  };

  it('renders metric data configurations accurately', () => {
    render(<MetricCard {...dummyProps} />);
    expect(screen.getByText('System Commits')).toBeInTheDocument();
    expect(screen.getByText('45')).toBeInTheDocument();
  });

  it('executes active logging streams upon interaction trigger', () => {
    render(<MetricCard {...dummyProps} />);
    const actionBtn = screen.getByRole('button', { name: /View Detailed Logs/i });
    fireEvent.click(actionBtn);
    expect(dummyProps.onInspect).toHaveBeenCalledTimes(1);
  });
});