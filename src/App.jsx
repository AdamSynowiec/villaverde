import { Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <HelmetProvider>
      <Suspense>
        <AppRoutes />
      </Suspense>
    </HelmetProvider>
  );
}
