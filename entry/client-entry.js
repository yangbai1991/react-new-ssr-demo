import React from "react";
import { hydrateRoot } from 'react-dom/client';
import Index from "../web/pages/Index";

hydrateRoot(document.getElementById("root"), <Index />);