// const React = require('react');
// const { renderToPipeableStream } = require("react-dom/server");
const path = require('path')
const { readFileSync } = require("fs");
const { Transform } = require("stream");
const express = require("express");
const webpack = require("webpack");
const ejs = require("ejs");
const clientConfig = require('./webpack.client')
const serverConfig = require('./webpack.server')
// const Html = require("./entry/html").default;
// const App = require("./entry/server-app").default;
// import Html from "./entry/html";
// import App from "./entry/server-app";

const app = express();

app.use(express.static("dist/web", { extensions: ["js"], index: false }));
// app.set('view engine', 'ejs');
app.set('view engine', 'html');
app.set('view options', { delimiter: '?' });
app.engine('html', ejs.renderFile);
// app.engine('.html', ejs.__express)
app.set('views', path.join(__dirname, 'dist/web/'));
app.get("/", async (req, res) => {
  const { serverRender } = require(path.resolve(__dirname, "dist/server/server.js"));
  const serverRenderContent = serverRender();
  // const htmlContext = await readFileSync(path.resolve(__dirname, "dist/web/index.html"), { encoding: "utf-8" });
  // const html = htmlContext.toString().replace("ssr-context-placeholder", serverRenderContent);

  // res.send(html);
  res.render('index', { ssrContextPlaceholder: serverRenderContent });
});

app.get("/ssr", async (req, res) => {
  const htmlContext = await readFileSync(path.resolve(__dirname, "dist/web/index.html"), { encoding: "utf-8" });
  const [htmlStart, htmlEnd] = htmlContext.toString().split('<?-ssrContextPlaceholder?>')
  const { serverStreamRender } = require(path.resolve(__dirname, "dist/server/server.js"));
  const { pipe } = serverStreamRender({
    // bootstrapScripts: ['/818-39684d1d-client.js'],
    onShellReady() {
      res.setHeader('content-type', 'text/html');
      const transformStream = new Transform({
        transform(chunk, encoding, callback) {
          res.write(chunk, encoding);
          callback();
        }
      });
      res.write(htmlStart)
      pipe(transformStream);
      transformStream.on('finish', () => {
        res.end(htmlEnd);
      });
    }
  });
  // const { pipe } = renderToPipeableStream(
  //   <Html title="React New SSR Demo">
  //     <App />
  //   </Html>,
  //   {
  //     bootstrapScripts: ['/818-39684d1d-client.js'],
  //     onShellReady() {
  //       res.setHeader('content-type', 'text/html');
  //       pipe(res);
  //     }
  //   }
  // );
});

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
