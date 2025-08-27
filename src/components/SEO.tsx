import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: 'website' | 'article';
  twitterCard?: 'summary' | 'summary_large_image';
}

const SEO: React.FC<SEOProps> = ({
  title = 'Your Website Name',
  description = 'Default description of your website',
  keywords = [],
  ogImage = '/default-og-image.jpg',
  ogType = 'website',
  twitterCard = 'summary',
}) => {
  return (
    <Helmet>
      {/* Basic meta tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}

      {/* Open Graph meta tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter Card meta tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Additional meta tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <link rel="canonical" href={window.location.href} />
    </Helmet>
  );
};

export default SEO; 