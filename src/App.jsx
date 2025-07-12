import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import LoadingSpinner from "./components/LoadingSpinner";

// Carga diferida (lazy loading) para todas las páginas.
// Esto mejora drásticamente el rendimiento de la carga inicial.
const HomePage = lazy(() => import('./pages/HomePage'));
const PlanBasicoPage = lazy(() => import('./pages/PlanBasicoPage'));
const PlanProfesionalPage = lazy(() => import('./pages/PlanProfesionalPage'));
const PlanPremiumPage = lazy(() => import('./pages/PlanPremiumPage'));
const GraciasPage = lazy(() => import('./pages/GraciasPage'));
const SchedulingPage = lazy(() => import('./pages/SchedulingPage'));
const ThankYouPage = lazy(() => import('./pages/ThankYouPage'));

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/plan/basico" element={<PlanBasicoPage />} />
          <Route path="/plan/profesional" element={<PlanProfesionalPage />} />
          <Route path="/plan/premium" element={<PlanPremiumPage />} />
          <Route path="/agendar-reunion" element={<SchedulingPage />} />
          <Route path="/gracias" element={<GraciasPage />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
        </Routes>
      </Suspense>
    </>
  );
}
