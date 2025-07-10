// Demo en React para Casa Regis - Landing Propuesta Web
import React from "react";
import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import HomePage from "./pages/HomePage";
import PlanBasicoPage from "./pages/PlanBasicoPage";
import PlanProfesionalPage from "./pages/PlanProfesionalPage";
import PlanPremiumPage from "./pages/PlanPremiumPage";
import SchedulingPage from "./pages/SchedulingPage";
import ThankYouPage from "./pages/ThankYouPage";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/plan/basico" element={<PlanBasicoPage />} />
        <Route path="/plan/profesional" element={<PlanProfesionalPage />} />
        <Route path="/plan/premium" element={<PlanPremiumPage />} />
        <Route path="/agendar-reunion" element={<SchedulingPage />} />
        <Route path="/gracias" element={<ThankYouPage />} />
      </Routes>
    </>
  );
}
