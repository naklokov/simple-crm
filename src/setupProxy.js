const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    "/helper",
    createProxyMiddleware({
      target: "http://mcpr-tech.online:8088",
      changeOrigin: true,
    })
  );

  app.use(
    "/crm/rest",
    createProxyMiddleware({
      target: "http://mcpr-tech.online:8081",
      changeOrigin: true,
    })
  );
};
