const path = require('path')
const { readFileSync } = require("fs");
const express = require("express");

const app = express();

app.use(express.static("dist/web", { extensions: ["js"], index: false }));
app.get("/", async (req, res) => {
  const { serverRender } = require(path.resolve(__dirname, "dist/server/server.js"));
  const serverRenderContent = serverRender();
  const htmlContext = await readFileSync(path.resolve(__dirname, "dist/web/index.html"), { encoding: "utf-8" });
  const html = htmlContext.toString().replace("ssr-context-placeholder", serverRenderContent);
  
  res.send(html);
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});