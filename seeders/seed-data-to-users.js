const fs = require("fs");
const path = require("path");
const pool = require("../config/connection");
const { hashPassword } = require("../helpers/encryption");

const insertUsers =
  `INSERT INTO "Users" (name, password) Values ` +
  JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "../data/users.json"), "utf-8")
  )
    .map(({ name, password }) => {
      const hashedPassword = hashPassword(password);
      return `('${name}', '${hashedPassword}')`;
    })
    .join(",\n");

pool.query(insertUsers, (err, result) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Success seed Users table");
  }
});
