const express = require('express');
const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static('public'));

app.get('/', (req, res) => {
    const visitorIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const visitorInfo = { ip: visitorIP, agent: req.headers };

    res.send(`
        <link rel="stylesheet" href="index.css"> 
        Hello there 
        <pre>${JSON.stringify(visitorInfo, null, 2)}</pre>
        <br>Is it OK if I call you ${visitorInfo.ip}? 
        <br>If you play nice, you will get a cookie.

        <div id="textContainer">

        </div>
        <script>
        console.log("hello worlrlrlrrlrl")
        const texts = [
            { text: "lorem ipsim", delay: 2 },
            { text: "endidididid", delay: 5 },
            { text: "yeyeeyeyey\neueueueueu\neueueueue", delay: 2000 } // Adjusted for demonstration
        ];

        
        function displayText(index) {
            const container = document.getElementById('textContainer');
            if (index < texts.length) {
                // Adds text to the container
                let paragraph = document.createElement('p');
                paragraph.textContent = texts[index].text;
                container.appendChild(paragraph);
                console.log(texts[index].text);
                // Wait for 'delay' milliseconds before displaying the next text
                setTimeout(() => {
                    displayText(index + 1);
                }, texts[index].delay);
            }
        }

        // Start displaying texts from the first item
        document.addEventListener('DOMContentLoaded', function() {
            displayText(0);
        });
    </script>dfddfdfdfdfd
    `);
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});