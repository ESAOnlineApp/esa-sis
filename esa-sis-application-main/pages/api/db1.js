// const { Client } = require('pg');

const { default: client } = require("../../utilities/db1");

// const client = new Client({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'postgres',
//   password: '0000',
//   port: 5432,
// })

// client.connect();

// client.query("Select * from major", (err, res) => {
//   if(!err){
//     // console.log(res.rows);
//   }else{
//     // console.log(res.message)
//   }
//   client.end;
// })

client.query(
  "Select * from major",
  (
    err
    // ,res
  ) => {
    if (!err) {
      // console.log(res.rows);
    } else {
      // console.log(res.message)
    }
    client.end;
  }
);
