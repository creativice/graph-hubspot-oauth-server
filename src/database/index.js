require('dotenv').config();

var Datastore = require('nedb'),
  db = new Datastore({
    filename: process.env.DB_FILE || './database.nedb',
    autoload: true,
  });

class Database {
  set(payload) {
    db.insert(payload);
    return new Promise((resolve, reject) => {
      db.insert(payload, (err, doc) => {
        if (err) {
          reject(err);
        }
        resolve(doc);
      });
    });
  }

  get() {
    return new Promise((resolve, reject) => {
      db.find({}, (err, docs) => {
        if (err) {
          reject(err);
        }
        resolve(docs.length > 0 ? docs[0] : undefined);
      });
    });
  }
}

module.exports = Database;
