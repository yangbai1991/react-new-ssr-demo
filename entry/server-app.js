import React from "react";
import { StaticRouter } from "react-router-dom";
import Index from "../web/pages/Index";

export default function App() {
  return (
    <StaticRouter>
      <Index />
    </StaticRouter>
  )
}