const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
console.log(process.env.MONGODB_URL);
require('./init');
const server = require('./server');
const port = process.env.PORT || 3001;

server.listen(port, () => {
  console.log('app started');
});
