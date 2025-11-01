import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SectionRenderer from "../SectionRenderer";
import Seo from "../components/Seo";
import config from "../config";
import { useTranslation } from "react-i18next";

export default function Page() {

    const { i18n, t } = useTranslation();
    const location = useLocation();
    const slug = location.pathname.slice(1);
    const [pageData, setPageData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        fetch(`${config.apiUrl}/page/${slug}?api_key=${config.apiKey}`)
            .then((res) => {
                if (!res.ok) {
                    navigate('/404');
                    throw new Error("Strona nie istnieje");
                }
                return res.json();
            })
            .then((data) => {
                setPageData(data[0]);
                setError(null);
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [slug, navigate]);

    if (loading) return <div className="text-center mt-20">{t("loading")}</div>;
    if (error) return <div className="text-center mt-20 text-red-500">{error}</div>;

    return (
        <>
            <Seo seo={pageData.seo} />
            <SectionRenderer sections={pageData.sections} />
        </>
    );
}
