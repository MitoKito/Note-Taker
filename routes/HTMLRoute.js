const path = require('path');

module.exports = function (app) {
  const PUBLIC_FOLDER_PATH = path.join(process.cwd(), 'public')

  // Home
  app.get('/', (req, res) => {
    res.sendFile(path.join(PUBLIC_FOLDER_PATH, 'index.html'));
  });

  // Notes Editor
  app.get('/notes', (req, res) => {
    res.sendFile(path.join(PUBLIC_FOLDER_PATH, 'notes.html'));
  });

  // No Match -> Home Page
  app.get('*', (req, res) => {
    res.sendFile(path.join(PUBLIC_FOLDER_PATH, 'index.html'));
  })
};
