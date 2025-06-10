import { exec } from 'node:child_process';

const checkPostgres = () => {
  const handleReturn = (_, stdout) => {
    if (stdout.search('accepting connections') === -1) {
      // eslint-disable-next-line no-undef
      process.stdout.write('.');
      checkPostgres();
      return;
    }

    console.log('\n\n🟢 Postgres está pronto e aceitando conexões.');
  };

  exec('docker exec postgres-dev pg_isready --host localhost', handleReturn);
};

console.log('\n\n🔴 Aguardando o banco de dados...');

checkPostgres();
