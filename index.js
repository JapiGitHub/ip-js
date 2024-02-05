const express = require('express');
const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static('public'));

app.get('/', (req, res) => {
    const visitorIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const visitorInfo = { ip: visitorIP, agent: req.headers };

    // Loop through all properties of the agent object and format them
    let agentInfo = '';
    for (const [key, value] of Object.entries(visitorInfo.agent)) {
        agentInfo += `${key}: ${value}`; // Concatenate each key-value pair with a newline
    }

    res.send(`
        <link rel="stylesheet" href="index.css">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=VT323&display=swap" rel="stylesheet">
        
        Hello there 
        <!--  human readable <pre>${JSON.stringify(visitorInfo, null, 2)}</pre> -->
        <pre>  IP: ${visitorInfo.ip} Agent: ${agentInfo} </pre>
        <br>Is it OK if I call you ${visitorInfo.ip}? 
        <br>If you play nice, you will get a cookie.

        <div id="textContainer">

        </div>
    `);
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});