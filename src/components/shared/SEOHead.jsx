import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'Ubuntu Seeds Private Limited';
const SITE_URL = 'https://www.ubuntuseeds.co.in';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

export default function SEOHead({
  title,
  description,
  path = '/',
  image = DEFAULT_IMAGE,
  type = 'website',
  keywords = 'ubuntu seeds, hybrid seeds india, cotton seeds gujarat, vegetable seeds, bajra hybrid, seed company ahmedabad',
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Grow with Confidence`;
  const canonical = `${SITE_URL}${path}`;

  return (
    <Helmet>
      {/* Primary */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
