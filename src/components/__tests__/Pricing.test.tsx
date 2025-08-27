import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Pricing from '../Pricing';

const mockFeatures = [
  {
    title: 'Responsive Design',
    description: 'Looks great on all devices',
    icon: '/icons/responsive.svg',
  },
  {
    title: 'SEO Optimized',
    description: 'Built for search engines',
    icon: '/icons/seo.svg',
  },
];

const mockProps = {
  productName: 'Website in a Box',
  price: 999,
  features: mockFeatures,
  imageUrls: {
    preview: '/images/preview.jpg',
    features: ['/images/feature1.jpg', '/images/feature2.jpg'],
  },
  links: {
    product: '/purchase',
    details: '/product-details',
  },
  isPopular: true,
};

const renderPricing = (props = mockProps) => {
  return render(
    <BrowserRouter>
      <Pricing {...props} />
    </BrowserRouter>
  );
};

describe('Pricing Component', () => {
  it('renders the pricing section with correct title', () => {
    renderPricing();
    expect(screen.getByText('Website in a Box')).toBeInTheDocument();
  });

  it('displays the correct price', () => {
    renderPricing();
    expect(screen.getByText('$999')).toBeInTheDocument();
  });

  it('renders all features', () => {
    renderPricing();
    mockFeatures.forEach((feature) => {
      expect(screen.getByText(feature.title)).toBeInTheDocument();
      expect(screen.getByText(feature.description)).toBeInTheDocument();
    });
  });

  it('shows popular badge when isPopular is true', () => {
    renderPricing();
    expect(screen.getByText('Most Popular')).toBeInTheDocument();
  });

  it('hides popular badge when isPopular is false', () => {
    renderPricing({ ...mockProps, isPopular: false });
    expect(screen.queryByText('Most Popular')).not.toBeInTheDocument();
  });

  it('renders correct links', () => {
    renderPricing();
    const getStartedLink = screen.getByText('Get Started');
    const learnMoreLink = screen.getByText('Learn More');

    expect(getStartedLink.closest('a')).toHaveAttribute('href', '/purchase');
    expect(learnMoreLink.closest('a')).toHaveAttribute('href', '/product-details');
  });

  it('renders preview image with correct alt text', () => {
    renderPricing();
    const previewImage = screen.getByAltText('Website in a Box preview');
    expect(previewImage).toHaveAttribute('src', '/images/preview.jpg');
  });

  it('shows placeholder image when preview image fails to load', () => {
    renderPricing();
    const previewImage = screen.getByAltText('Website in a Box preview');
    fireEvent.error(previewImage);
    expect(screen.getByRole('img', { name: 'Website in a Box preview' })).toBeInTheDocument();
  });

  it('shows placeholder image when feature image fails to load', () => {
    renderPricing();
    const featureImage = screen.getByAltText('Responsive Design');
    fireEvent.error(featureImage);
    expect(screen.getByRole('img', { name: 'Responsive Design' })).toBeInTheDocument();
  });
}); 