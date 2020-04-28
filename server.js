const express = require('express');
const path = require('path');

const PUBLIC_FOLDER_PATH = path.join(process.cwd(), 'public')

// Setup express server
const app = express();

// Setup PORT for listener
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
require('./routes/HTMLRoute')(app);
require('./routes/JSONRoute')(app);

// Start server
app.listen(PORT, () => console.log(`Server listening on PORT: ${PORT}`));
