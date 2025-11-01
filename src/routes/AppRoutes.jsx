// AppRoutes.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Page from "../pages/Page";

export default function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Page/>} />
                <Route path="/*" element={<Page/>} />
            </Routes>
        </Router>
    );
}
