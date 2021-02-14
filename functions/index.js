
// const functions = require('firebase-functions');
// const express = require('express');

// const app = express();
// const path = require('path');
// app.use(express.static(path.join(__dirname, 'public')));

// app.get('/timestamp-cache', (request, response) => {
//   response.set('Cache-Control', 'public, max-age=300, s-maxage=600');
//   response.send(`${Date.now()}`);
// });

// app.get('/timestamp', (request, response) => {
//   response.send(`${Date.now()}`);
// });

// app.get('/*', (request, response) => response.sendFile(__dirname + 'public/index.html'));

// exports.app = functions.https.onRequest(app);