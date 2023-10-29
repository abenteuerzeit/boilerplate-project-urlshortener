const sqlite3 = require('sqlite3').verbose();

function initializeDatabase() {
  const db = new sqlite3.Database(':memory:', (err) => {
    if (err) throw err;
    console.log('Connected to the in-memory SQLite database.');
  });

  const query = `
    CREATE TABLE Url (
      url_id INTEGER PRIMARY KEY AUTOINCREMENT,
      original_url TEXT NOT NULL,
      short_url TEXT NOT NULL
    );
  `;

  db.run(query, (err) => {
    if (err) throw err;
  });

  return db;
}

const db = initializeDatabase();

module.exports = db;
