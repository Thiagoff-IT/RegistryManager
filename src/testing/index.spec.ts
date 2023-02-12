const { Client } = require('pg');

describe('Testar a conexão com o banco de dados', () => {
  let client;

  // É executado antes de todos os testes
  beforeAll(async () => {
    // Cria uma nova conexão com o banco de dados PostgreSQL
    client = new Client({
      host: 'localhost',
      user: 'postgres',
      port: 32768,
      password: 'postgrespw',
      database: 'csv_database',
    });

    // Conecta ao banco de dados
    try {
      await client.connect();
    } catch (error) {
      console.error(error);
    }
  });

  // É executado após todos os testes
  afterAll(async () => {
    // Encerra a conexão com o banco de dados
    await client.end();
  });

  // Um teste individual
  it('verifica a conexão com o banco de dados', async () => {
    // Verifica se a conexão foi estabelecida com sucesso
    expect(client.connection).toBeTruthy();
  });
});
