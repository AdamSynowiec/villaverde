import { Helmet } from "react-helmet-async";

export default function Seo({ seo }) {
    if (!seo) return null;

    return (
        <Helmet>
            <title>{seo.title}</title>
            <meta name="description" content={seo.description} />
            <meta property="og:title" content={seo.ogTitle} />
            <meta property="og:description" content={seo.ogDescription} />
            <meta property="og:image" content={seo.ogImage} />
            <meta name="twitter:card" content={seo.twitterCard || "summary"} />
        </Helmet>
    );
}
