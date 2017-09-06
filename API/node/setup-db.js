const { Client } = require('pg');

var conString = "postgres://postgres:mysecretpassword@localhost:5433/";

var client = new Client(conString + 'postgres');
client.connect();

client.query("DROP DATABASE napi;", (e, r) => {

    client.query("CREATE DATABASE napi;", (err, res) => {
        if (err) {
            console.log('Database already exists');

        } else {
            client.end();
            clientnapi = new Client(conString + 'napi');
            var x = 1000;
            clientnapi.query(
                'CREATE TABLE names(id SERIAL PRIMARY KEY, name VARCHAR(100) not null, number INT)');
            while (x > 0) {
                clientnapi.query("INSERT INTO names(name, number) values('Ted',12)");
                clientnapi.query("INSERT INTO names(name, number) values($1, $2)", ['John', x]);
                x = x - 1;

            }
            console.log('Created database and sample records.');
        }
        clientnapi.end();

    });
});