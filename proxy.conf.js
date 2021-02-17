const PROXY_CONFIG = [{
    context: [
        "/api"
    ],
    "target": "http://localhost:3000",
    "secure": false,
    "logLevel": "debug",
    "changeOrigin": true,
    onProxyRes(proxyRes, req, res) {
        console.log('RAW Headers from the target', JSON.stringify(proxyRes.headers, true, 2));
        var body = Buffer.from('');
        proxyRes.on('data', function (data) {
            body = Buffer.concat([body, data]);
        });
        proxyRes.on('end', function () {
            body = body.toString();
            var prettyBody;
            if (body !== '') {
                try {
                    try {
                        JSON.parse(body);
                        prettyBody = JSON.stringify(JSON.parse(body), true, 2);
                    } catch (error) {
                        console.error('Cannot parse JSON, the response is invalid JSON format');
                    }
                } catch (error) {
                    console.error(error);
                }
            }
            console.log("Body from proxied server: ", prettyBody);
        });
    }
}];

module.exports = PROXY_CONFIG;