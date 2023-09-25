const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const fs = require('fs');


// // Serve static files
// app.use(express.static(__dirname));
// app.use('/', express.static('public'));

app.use(cors());
// Endpoint to serve budget.json
app.get('/budget', (req, res) => {
    fs.readFile('budget.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading budget.json');
            return;
        }
        res.send(JSON.parse(data));
    });
});

app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});