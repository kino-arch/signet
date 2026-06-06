import { Helmet } from "react-helmet-async"

interface SeoProps {
  title: string
  description: string
  canonical?: string
  ogImage?: string
  ogType?: "website" | "article" | "product"
  noindex?: boolean
}

export function Seo({
  title,
  description,
  canonical,
  ogImage = "https://signet.app/og-default.png",
  ogType = "website",
  noindex = false,
}: SeoProps) {
  const fullTitle =
    title === "Signet"
      ? "Signet — Forge Your Identity | AI-Powered Resume Builder"
      : `${title} | Signet`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={canonical} />}
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      {canonical && <meta property="og:url" content={canonical} />}

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />
    </Helmet>
  )
}
