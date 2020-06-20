'use strict';

// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

// Get our API routes
const searchapi = require('./server/search/routes/search.server.route');
const prospectapi = require('./server/prospect/routes/prospect.server.routes');
const customerapi = require('./server/customer/routes/customer.server.routes');
const userapi = require('./server/user/routes/user.server.routes');
const questionnaire = require('./server/questionnaire/routes/questionnaire.server.routes');
const hanaClient = require(path.resolve('./config/hanaclient'));

const app = express();

// Parsers for POST data
app.use(bodyParser.json({ limit:'50mb' }));
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));


// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api/cisco1ea/user', userapi);
app.use('/api/cisco1ea', searchapi);
app.use('/api/cisco1ea/prospect', prospectapi);
app.use('/api/cisco1ea/customer', customerapi);
app.use('/api/cisco1ea/questionnaire', questionnaire);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.OPENSHIFT_NODEJS_PORT|| process.env.PORT || '3000';
app.set('port', port);

const ip = process.env.OPENSHIFT_NODEJS_IP|| '127.0.0.1';

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, ip, (cb) => {
  console.log(`API running on ${ip}:${port}`);
  hanaClient.client1.connect();
  hanaClient.client2.connect();
});
