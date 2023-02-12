const { Client } = require('pg');

describe('Testar tabelas no banco de dados', () => {
  let client;

  beforeAll(async () => {
    client = new Client({
      host: 'localhost',
      user: 'postgres',
      port: 32768,
      password: 'postgrespw',
      database: 'csv_database',
    });

    try {
      await client.connect();
    } catch (error) {
      console.error(error);
    }
  });

  afterAll(async () => {
    await client.end();
  });

  it('verifica se existem tabelas no banco de dados', async () => {
    const result = await client.query('SELECT * FROM time_series_19_covid_combined');

    expect(result.rows.length).toBeGreaterThan(0);
  });
});
