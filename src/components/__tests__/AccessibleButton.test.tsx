import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AccessibleButton from '../AccessibleButton';

describe('AccessibleButton', () => {
  it('renders with correct label', () => {
    render(<AccessibleButton label="Click me" />);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<AccessibleButton label="Click me" onClick={handleClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('shows loading state', () => {
    render(<AccessibleButton label="Click me" isLoading={true} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('applies correct variant styles', () => {
    const { rerender } = render(<AccessibleButton label="Primary" variant="primary" />);
    expect(screen.getByRole('button')).toHaveClass('bg-blue-500');

    rerender(<AccessibleButton label="Secondary" variant="secondary" />);
    expect(screen.getByRole('button')).toHaveClass('bg-gray-200');

    rerender(<AccessibleButton label="Danger" variant="danger" />);
    expect(screen.getByRole('button')).toHaveClass('bg-red-500');
  });
}); 