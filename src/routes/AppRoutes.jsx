// AppRoutes.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Page from "../pages/Page";
import PriceHistory from "../pages/PriceHistory";
import PrivacyPolicy from "../pages/PrivacyPolicy";

export default function AppRoutes() {
    
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Page />} />
                <Route path="/*" element={<Page />} />
                <Route path="/historia-cen" element={<PriceHistory />} />
                <Route path="/polityka-prywatnosci" element={<PrivacyPolicy />} />
            </Routes>
        </Router>
    );
}
