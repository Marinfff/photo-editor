import mysql from 'mysql';
import config from '../config/db';

console.log(config)

const query = (sql) => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(config);

    connection.connect((err) => {
      if (err) {
        reject(err)
      }
    });

    connection.query(sql, (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
      connection.end();
    })
  })
};

export default {query}
