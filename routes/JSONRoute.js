const fs = require('fs').promises;
const path = require('path');
const { v4: uuid } = require('uuid');

module.exports = function (app) {

  // GET request notes from database
  // GET REQUEST -> READ DB -> RETURN DB as JSON
  app.get('/api/notes', async (req, res) => {
    try {
      // READ DB
      const db_response = await fs.readFile(path.join(process.cwd(), 'db', 'db.json'), 'utf8');

      // RETURN DB as JSON
      return res.json(JSON.parse(db_response));
    } catch (error) {
      console.error(error);
      return res.status(500);
    }
  });
};
