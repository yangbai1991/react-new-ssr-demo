const { path } = require('fs')
const express = require("express");

const app = express();

app.use(express.static("public"));
app.get("/", async (req, res) => {
  const { serverRender } = path.resolve(__dirname, "dist/server/server-entry.js");
  const serverRenderContent = serverRender();
  const htmlContext = await readFile(path.resolve(__dirname, "public/index.html"), "utf8");
  const html = htmlContext.toString().replace("ssr-context-placeholder", serverRenderContent);
  
  res.send(html);
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});