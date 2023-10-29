require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const urlRoutes = require('./controllers/urlController'); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use('/public', express.static(`${process.cwd()}/public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    if (process.env.NODE_ENV !== 'development') return next();
    const currentTime = new Date().toISOString();
    console.log(`[${currentTime}] ${req.method} ${req.originalUrl}`);
    console.log(`Client IP: ${req.ip}`);
    console.log(`User Agent: ${req.headers['user-agent']}`);
    console.log('Headers:', JSON.stringify(req.headers, null, 2));
    console.log('Body:', JSON.stringify(req.body, null, 2));
    console.log('Query:', JSON.stringify(req.query, null, 2));
    console.log('--- End of Request Info ---\n');
    next();
});

app.use(urlRoutes);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
