const PROXY_CONFIG = [{
  context: ['/auth', '/api'],
  target: 'http://localhost:3000',
  secure: false,
  logLevel: 'debug',
  changeOrigin: true,
  onProxyRes: (proxyRes, req, res) => {
    console.log('RAW Headers from the target', JSON.stringify(proxyRes.headers, true, 2));

    let body = [];

    proxyRes.on('data', (chunk) => {
      body.push(chunk);
    });

    proxyRes.on('end', () => {
      try {
        body = Buffer.concat(body).toString();
        const prettyBody = JSON.stringify(JSON.parse(body), true, 2);
        console.log(`res from proxied server:\n${prettyBody}`);
      } catch (error) {
        console.error(`Cannot parse JSON body: ${error.message}`);
      }
    });
  }
}];

module.exports = PROXY_CONFIG;