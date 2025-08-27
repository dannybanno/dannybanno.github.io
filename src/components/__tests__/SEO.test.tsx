import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { HelmetProvider } from 'react-helmet-async';
import SEO from '../SEO';

const renderSEO = (props = {}) => {
  return render(
    <HelmetProvider>
      <SEO {...props} />
    </HelmetProvider>
  );
};

describe('SEO Component', () => {
  it('renders with default meta tags', () => {
    renderSEO();
    const helmet = document.querySelector('title');
    expect(helmet?.textContent).toBe('Your Website Name | Your Website Name');
  });

  it('renders with custom title', () => {
    renderSEO({ title: 'Custom Title' });
    const helmet = document.querySelector('title');
    expect(helmet?.textContent).toBe('Custom Title | Your Website Name');
  });

  it('renders with custom description', () => {
    renderSEO({ description: 'Custom description' });
    const metaDescription = document.querySelector('meta[name="description"]');
    expect(metaDescription?.getAttribute('content')).toBe('Custom description');
  });

  it('renders with custom keywords', () => {
    renderSEO({ keywords: ['test', 'keywords'] });
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    expect(metaKeywords?.getAttribute('content')).toBe('test, keywords');
  });

  it('renders Open Graph meta tags', () => {
    renderSEO({
      title: 'OG Title',
      description: 'OG Description',
      ogType: 'article',
    });

    expect(document.querySelector('meta[property="og:title"]')?.getAttribute('content')).toBe('OG Title | Your Website Name');
    expect(document.querySelector('meta[property="og:description"]')?.getAttribute('content')).toBe('OG Description');
    expect(document.querySelector('meta[property="og:type"]')?.getAttribute('content')).toBe('article');
  });

  it('renders Twitter Card meta tags', () => {
    renderSEO({
      title: 'Twitter Title',
      description: 'Twitter Description',
      twitterCard: 'summary_large_image',
    });

    expect(document.querySelector('meta[name="twitter:card"]')?.getAttribute('content')).toBe('summary_large_image');
    expect(document.querySelector('meta[name="twitter:title"]')?.getAttribute('content')).toBe('Twitter Title | Your Website Name');
    expect(document.querySelector('meta[name="twitter:description"]')?.getAttribute('content')).toBe('Twitter Description');
  });
}); 