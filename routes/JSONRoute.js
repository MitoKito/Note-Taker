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

  // POST request to create a new note to database
  // POST REQUEST -> READ DB -> ADD ID to NOTE -> WRITE DB -> Return DB as JSON
  app.post('/api/notes', async (req, res) => {
    const { body } = req;

    try {
      // READ DB
      const db_response = await fs.readFile(path.join(process.cwd(), 'db', 'db.json'), 'utf8');
      const notes = JSON.parse(db_response);

      // ADD ID to NOTE
      body.id = uuid();
      notes.push(body);

      // WRITE DB
      await fs.writeFile(path.join(process.cwd(), 'db', 'db.json'), JSON.stringify(notes));

      // RETURN DB as JSON
      return res.json(notes);
    } catch (error) {
      console.error(error);
      return res.status(500);
    }
  });

  // DELETE request to filter and delete a note from the database
  // DELETE REQUEST -> READ DB -> FILTER NOTE -> WRITE DB -> RETURN DB as JSON
  app.delete('/api/notes/:id', async (req, res) => {
    const { id } = req.param;

    try {
      // READ DB
      const db_response = await fs.readFile(path.join(process.cwd(), 'db', 'db.json'), 'utf8');

      // FILTER NOTE
      const notes = JSON.parse(db_response);
      const filterNotes = notes.filter((note) => {
        if (note.id === id) return note;
      });

      // WRITE DB
      await fs.writeFile(path.join(process.cwd(), 'db', 'db.json'), JSON.stringify(filterNotes));

      // RETURN DB as JSON
      return res.json(filterNotes);
    } catch (error) {
      console.error(error);
      return res.status(500);
    }
  });
};
