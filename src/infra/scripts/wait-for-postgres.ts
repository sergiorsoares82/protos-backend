import { exec } from 'node:child_process';

const checkPostgres = () => {
  const handleReturn = (error: Error | null, stdout: string) => {
    if (stdout.search('accepting connections') === -1) {
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
