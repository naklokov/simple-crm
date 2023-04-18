const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    "/crm/rest",
    createProxyMiddleware({
      target: "http://localhost:8080",
      changeOrigin: true,
      pathRewrite: {
        "^/crm/rest/login": "/crm/login",
        "^/crm/rest/logout": "/crm/logout",
      },
    })
  );
};
