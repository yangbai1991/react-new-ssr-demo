import React from "react";
import { BrowserRouter } from "react-router-dom";
import { hydrateRoot } from 'react-dom/client';
import Index from "../web/pages/Index";

hydrateRoot(
  document.getElementById("root"),
  <React.StrictMode>
    <BrowserRouter>
      <Index />
    </BrowserRouter>
  </React.StrictMode>
);