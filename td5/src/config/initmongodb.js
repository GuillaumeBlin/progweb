db = connect( 'mongodb://localhost/M2WEB' );
db.contacts.insertOne({name: 'toto', age: 24});
db.contacts.insertOne({name: 'titi', age: 25});
db.contacts.insertOne({name: 'tutu', age: 25});
db.contacts.insertOne({name: 'tata', age: 28});
/* mongosh -f initmongodb.js */