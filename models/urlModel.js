const db = require('../utils/database');


class URLModel {
  static async insert(original, short) {
    const query = 'INSERT INTO url (original_url, short_url) VALUES (?, ?)';
    return new Promise((resolve, reject) => {
      db.run(query, [original, short], function(err) {
        if (err) reject(err);
        resolve(this.lastID);
      });
    });
  }

  static async get(short) {
    const query = 'SELECT original_url FROM url WHERE short_url = ?';
    return new Promise((resolve, reject) => {
      db.get(query, [short], (err, row) => {
        if (err) reject(err);
        resolve(row);
      });
    });
  }
}

module.exports = URLModel;
