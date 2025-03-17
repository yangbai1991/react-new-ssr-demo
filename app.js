const path = require('path')
const { readFileSync } = require("fs");
const express = require("express");
const webpack = require("webpack");
const clientConfig = require('./webpack.client')
const serverConfig = require('./webpack.server')
// const Html = require("./entry/html");
// const App = require("./entry/server-app");

const app = express();

app.use(express.static("dist/web", { extensions: ["js"], index: false }));
app.get("/", async (req, res) => {
  const { serverRender } = require(path.resolve(__dirname, "dist/server/server.js"));
  const serverRenderContent = serverRender();
  const htmlContext = await readFileSync(path.resolve(__dirname, "dist/web/index.html"), { encoding: "utf-8" });
  const html = htmlContext.toString().replace("ssr-context-placeholder", serverRenderContent);
  
  res.send(html);
});

// app.get("/ssr", async (req, res) => {
//   const { pipe } = renderToPipeableStream(
//     <Html title="React New SSR Demo">
//       <App />
//     </Html>, {
//     bootstrapScripts: ['/main.js'],
//     onShellReady() {
//       res.setHeader('content-type', 'text/html');
//       pipe(res);
//     }
//   });
// });

const bootstrap = async () => {
  const compiler = webpack([clientConfig, serverConfig]);
  const compilerRes = new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        return reject(err);
      }
      console.log(stats.toString(serverConfig.stats));
      resolve();
    });
    compiler.hooks.done.tap('server-agent', () => console.log('\n构建成功'));
  });
  await compilerRes;
  app.listen(3000, () => {
    console.log("listening on port 3000");
  });
}

bootstrap()