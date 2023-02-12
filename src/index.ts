const fs = require('fs');
import { Client }  from 'pg';


const client = new Client({
  host: 'localhost',
  user: 'postgres',
  port: 32768,
  password: 'postgrespw',
  database: 'csv_database',
});

client.connect();

fs.readFile('time-series-19-covid-combined.csv', 'utf8', (err, data) => {
  if (err) throw err;

  const lines = data.split('\n');
  const columns = lines[0].split(',');
  const tableName = 'time_series_19_covid_combined';

  client.query(`
    CREATE TABLE IF NOT EXISTS ${tableName} (
      ${columns.map((col, index) => `"${col}" text`).join(',\n')}
    );
  `, (err, res) => {
    if (err) throw err;

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',');

      client.query(`
        INSERT INTO ${tableName} (
          ${columns.map(col => `"${col}"`).join(', ')}
        ) VALUES (
          ${values.map(value => `'${value}'`).join(', ')}
        );
      `, (err, res) => {
        if (err) throw err;
      });
    }
    //const result = await client.query('SELECT * FROM us_simplifield');
  });
});
