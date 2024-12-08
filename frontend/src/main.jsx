import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import RoutesApp from "./routes.jsx";
import { ContextWrapper } from "./states/states.jsx";

createRoot(document.getElementById("root")).render(
  <ContextWrapper>
    <BrowserRouter>
      <RoutesApp />
    </BrowserRouter>
  </ContextWrapper>
);
