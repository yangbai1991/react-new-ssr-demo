import React from "react";
import { renderToString } from "react-dom/server";
import Index from "./src/pages/Index";

export function serverRender() {
  return renderToString(<Index />);
}