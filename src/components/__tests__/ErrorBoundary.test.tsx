import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ErrorBoundary from '../ErrorBoundary';

// Component that throws an error
const ThrowError = () => {
  throw new Error('Test error');
};

describe('ErrorBoundary Component', () => {
  // Suppress console.error for expected errors
  const originalError = console.error;
  beforeAll(() => {
    console.error = vi.fn();
  });
  afterAll(() => {
    console.error = originalError;
  });

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Test content</div>
      </ErrorBoundary>
    );
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('renders error UI when there is an error', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Test error')).toBeInTheDocument();
  });

  it('renders custom fallback when provided', () => {
    const fallback = <div>Custom error UI</div>;
    render(
      <ErrorBoundary fallback={fallback}>
        <ThrowError />
      </ErrorBoundary>
    );
    expect(screen.getByText('Custom error UI')).toBeInTheDocument();
  });

  it('reloads page when refresh button is clicked', () => {
    const reload = vi.fn();
    delete window.location;
    window.location = { reload } as any;

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    fireEvent.click(screen.getByText('Refresh Page'));
    expect(reload).toHaveBeenCalled();
  });
}); 