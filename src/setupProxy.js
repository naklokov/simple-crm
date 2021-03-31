const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.all(
    [/generation/, /templates/],
    createProxyMiddleware({
      target: "http://localhost:8080",
      changeOrigin: true,
    })
  );

  app.use(
    "/crm/rest",
    createProxyMiddleware({
      target: "http://77.222.60.155:8080",
      changeOrigin: true,
      pathRewrite: {
        "^/crm/rest/login": "/crm/login",
        "^/crm/rest/logout": "/crm/logout",
      },
    })
  );
};
