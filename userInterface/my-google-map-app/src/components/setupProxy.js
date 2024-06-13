
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://172.20.10.2:3000', // Replace with your Raspberry Pi server address
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', // Remove /api prefix when forwarding the request
      },
    })
  );
};
