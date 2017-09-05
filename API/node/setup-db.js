var pgtools = require('pgtools');

var pg = require('pg');

const config = {
  user: 'postgres',
  password: 'mysecretpassword',
  port: 5432,
  host: 'localhost'
}
pgtools.dropdb(config, 'n-api', function (err, res) {
    if (err) {
      console.error(err);
      process.exit(-1);
    }
    console.log(res);
    pgtools.createdb(config, 'n-api', function (err, res) {
  if (err) {
    console.error(err);
    process.exit(-1);
  }
  console.log(res);

});
  });


var conString = "postgres://postgres:mysecretpassword@localhost:5432/n-api";

var client = new pg.Client(conString);
client.connect();

//queries are queued and executed one after another once the connection becomes available
var x = 1000;
client.query(
  'CREATE TABLE names(id SERIAL PRIMARY KEY, name VARCHAR(100) not null, number INT)');
while (x > 0) {
    client.query("INSERT INTO names(name, number) values('Ted',12)");
    client.query("INSERT INTO names(name, number) values($1, $2)", ['John', x]);
    x = x - 1;
}

var query = client.query("SELECT * FROM names");
//fired after last row is emitted
console.log(query);
query.on('row', function(row) {
    console.log(row);
});

query.on('end', function() {
    client.end();
});