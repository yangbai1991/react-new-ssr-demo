import React from "react";

export default function Html({ children, title }) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <title>{title}</title>
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}