import React from "react";
import { renderToString } from "react-dom/server";
import Index from "../web/pages/Index";

export function serverRender() {
  return renderToString(<Index />);
}