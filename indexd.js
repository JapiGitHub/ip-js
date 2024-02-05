const express = require('express');
const requestIp = require('request-ip');

const app = express();
const port = 3000;

app.use(requestIp.mw())

app.get('/', (req, res) => {
    const clientIp = req.clientIp;
    const headers = req.headers; // Accessing the entire headers object

    const visitorInfo = {
        ip: clientIp,
        headers: headers, // Storing the entire headers object
    };

    console.log('Visitor Info:', visitorInfo);
    console.log('ip  ::  ', visitorInfo.ip);
    res.send(`<link rel="stylesheet" href="index.css"> Hello there <pre>${JSON.stringify(visitorInfo, null, 2)}</pre><br>is it OK if I call you  ${visitorInfo.ip}. <bR>If you play nice you will get a cookie`);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
