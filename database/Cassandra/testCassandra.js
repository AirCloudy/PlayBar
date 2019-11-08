const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: ['localhost'],
  localDataCenter: 'datacenter1',
  keyspace: 'mykeyspace',
});

function queryCassandra() {
  for (let i = 0; i < 2000; i += 1) {
    const query = `SELECT * FROM songs WHERE songId = ${i}`;
    console.log(client.execute(query));
  }
}

async function testCassandra() {
  const start = Date.now();
  await queryCassandra();
  const end = Date.now();
  console.log(`Total time: ${end - start}`);
}

testCassandra();
