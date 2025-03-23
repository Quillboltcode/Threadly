import React from "react";
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router"; // Use "react-router-dom" instead
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App"; // Your main layout component
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import "./index.css";
import MessagePage from "./pages/Message";
import SettingsPage from "./pages/Setting";

const queryClient = new QueryClient();
// Define routes using createBrowserRouter
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Main Layout Component
    children: [
      { path: "home", element: <Home /> },
      { path: "profile", element: <Profile /> },
      { path: "messages", element: <MessagePage />},
      { path: "settings", element: <SettingsPage/>},
      { path: "*", element: <NotFound /> }, // Correct placement for NotFound
    ],
  },
]);

// Render the app
const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
  </React.StrictMode>
);
