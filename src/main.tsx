import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles/globals.css";
import { AppLayout } from "./layouts/AppLayout";
import { AboutPage } from "./pages/AboutPage";
import { AiComputingPage } from "./pages/AiComputingPage";
import { ChainPage } from "./pages/ChainPage";
import { CompaniesPage } from "./pages/CompaniesPage";
import { CompanyDetailPage } from "./pages/CompanyDetailPage";
import { GlossaryPage } from "./pages/GlossaryPage";
import { HomePage } from "./pages/HomePage";
import { LearnPage } from "./pages/LearnPage";
import { ProcessPage } from "./pages/ProcessPage";
import { QuizPage } from "./pages/QuizPage";
import { SegmentDetailPage } from "./pages/SegmentDetailPage";
import { SegmentsPage } from "./pages/SegmentsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "chain", element: <ChainPage /> },
      { path: "process", element: <ProcessPage /> },
      { path: "segments", element: <SegmentsPage /> },
      { path: "segments/:id", element: <SegmentDetailPage /> },
      { path: "companies", element: <CompaniesPage /> },
      { path: "companies/:code", element: <CompanyDetailPage /> },
      { path: "ai-computing", element: <AiComputingPage /> },
      { path: "glossary", element: <GlossaryPage /> },
      { path: "learn", element: <LearnPage /> },
      { path: "quiz", element: <QuizPage /> },
      { path: "about", element: <AboutPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
