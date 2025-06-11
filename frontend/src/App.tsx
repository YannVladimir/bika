import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./theme/ThemeProvider";
import { CssBaseline } from "@mui/material";
import Dashboard from "./pages/Dashboard/Dashboard";
import Companies from "./pages/Companies/Companies";
import Users from "./pages/Users/Users";
import DocumentTypes from "./pages/DocumentTypes/DocumentTypes";
import ArchivalPage from "./pages/Archival/ArchivalPage";
import Reports from "./pages/Reports/ReportsPage";
import Drive from "./pages/Drive/Drive";
import Settings from "./pages/Settings/Settings";
import Profile from "./pages/Profile/Profile";
import Layout from "./components/Layout/Layout";
import RetrievalPage from "./pages/Retrieval/RetrievalPage";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "companies",
          element: <Companies />,
        },
        {
          path: "users",
          element: <Users />,
        },
        {
          path: "document-types",
          element: <DocumentTypes />,
        },
        {
          path: "archival",
          element: <ArchivalPage />,
        },
        {
          path: "retrieval",
          element: <RetrievalPage />,
        },
        {
          path: "reports",
          element: <Reports />,
        },
        {
          path: "drive",
          element: <Drive />,
        },
        {
          path: "settings",
          element: <Settings />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
      ],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
    },
  }
);

function App() {
  return (
    <ThemeProvider>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
