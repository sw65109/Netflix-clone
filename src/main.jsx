import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ProfileProvider } from "./context/ProfileContext.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { ListProvider } from "./context/ListContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <ProfileProvider>
        <ListProvider>
          <App />
        </ListProvider>
      </ProfileProvider>
    </Router>
  </StrictMode>
);
