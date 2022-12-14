// app.js
const express = require('express');
const app = express();
const path = require("path");
const publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

console.log('started');
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(3000);