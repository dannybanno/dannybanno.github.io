import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Services from '../Services';

// Mock the useNavigate hook
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

const renderServices = () => {
  return render(
    <BrowserRouter>
      <Services />
    </BrowserRouter>
  );
};

describe('Services Component', () => {
  it('renders the services section with correct title', () => {
    renderServices();
    expect(screen.getByText('My Services')).toBeInTheDocument();
  });

  it('renders the correct number of service features', () => {
    renderServices();
    const features = screen.getAllByRole('heading', { level: 2 });
    expect(features).toHaveLength(8); // We're showing 8 services
  });

  it('renders service features with correct content', () => {
    renderServices();
    expect(screen.getByText('Responsive Website Design')).toBeInTheDocument();
    expect(screen.getByText('Custom websites that look great on any device')).toBeInTheDocument();
  });

  it('renders service icons', () => {
    renderServices();
    const icons = document.querySelectorAll('svg');
    expect(icons.length).toBeGreaterThan(0);
  });

  it('applies correct styling classes', () => {
    renderServices();
    const section = screen.getByRole('region', { name: /services/i });
    expect(section).toHaveClass('py-20', 'md:py-32', 'relative', 'overflow-hidden', 'bg-white');
  });
}); 