import React from "react";
import { renderToString, renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import Index from "../web/pages/Index";

export function serverRender() {
  return renderToString(
    <React.StrictMode>
      <StaticRouter>
        <Index />
      </StaticRouter>
    </React.StrictMode>
  );
}

export function serverStreamRender(options) {
  return renderToPipeableStream(<Index />, options);
}