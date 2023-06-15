const pool = require("../config/connection");

const dropTable = `
  DROP TABLE IF EXISTS "Users";
`;

const ddlUsers = `
  CREATE TABLE IF NOT EXISTS "Users" (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

pool.query(dropTable, (err, result) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Success delete table");
    pool.query(ddlUsers, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Success create Users table");
      }
    });
  }
});
