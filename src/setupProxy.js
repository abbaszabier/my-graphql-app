const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/query",
    createProxyMiddleware({
      target: "http://diyo-api-load-balancer-576848411.ap-southeast-1.elb.amazonaws.com:8080",
      changeOrigin: true,
    })
  );
};
