const pool = require("../config/connection");
const { hashPassword } = require("../helpers/encryption");
const { Users } = require("./class");

class Model {
  static validations(name = "", password = "") {
    console.log(name, password.length);
    const validations = [];

    if(name?.trim() === "") {
      validations.push("Name must be filled");
    }

    if(name?.length < 2 || name?.length >= 128) {
      validations.push("Name must contain minimal 2 characters and maximum 128 characters");
    }

    if(password) {
      if(password?.trim() === "") {
        validations.push("Name must be filled");
      }
  
      if(password?.length < 5 || password?.length > 8) {
        validations.push("Password must contain minimal 5 characters and maximum 8 characters");
      }
    }

    return validations;
  }

  static readUsers(callback) {
    const query = `
      select * from "Users" u
      order by u.id;
    `;

    pool.query(query, (err, result) => {
      if (err) {
        callback(err);
      } else {
        const users = result.rows.map(({ id, name, password, createdAt }) => {
          return new Users(id, name, password, createdAt);
        });
        callback(null, users);
      }
    });
  }

  static readUserByName(name, callback) {
    const query = `
      select * from "Users" u
      where u.name = '${name}'
    `;

    pool.query(query, (err, result) => {
      if (err) {
        callback(err);
        return;
      } else {
        const user = result.rows.map(({ id, name, password, createdAt }) => {
          return new Users(id, name, password, createdAt);
        })[0];
        callback(null, user);
      }
    });
  }

  static readUserById(id, callback) {
    const query = `
      select * from "Users" u
      where u.id = '${id}'
    `;

    pool.query(query, (err, result) => {
      if (err) {
        callback(err);
        return;
      } else {
        const user = result.rows.map(({ id, name, password, createdAt }) => {
          return new Users(id, name, password, createdAt);
        })[0];
        callback(null, user);
      }
    });
  }

  static addUser(name, password, callback) {
    const validations = Model.validations(name, password)
    const hashedPassword = hashPassword(password);

    if (validations.length > 0) {
      callback({ name: "Validation Errors", validations })
    } else {
      const values = [name, hashedPassword];
    
      const insertUser = `
        INSERT INTO "Users" (name, password)
        VALUES ($1, $2);
      `

      pool.query(insertUser, values, (err, result) => {
        if (err) {
          callback(err);
        } else {
          callback(null, result);
        }
      })
    }
  }

  static editUser(id, name, callback) {
    const validations = Model.validations(name)

    if (validations.length > 0) {
      callback({ name: "Validation Errors", validations })
    } else {
      const values = [name];
    
      const updateUser = `
        UPDATE "Users"
        SET "name" = $1
        where "id" = ${id};
      `

      pool.query(updateUser, values, (err, result) => {
        if (err) {
          callback(err);
        } else {
          callback(null, result);
        }
      })
    }
  }

  static deleteUserById(id, callback) {
    const values = [ id ];

    const deleteUser = `
      DELETE FROM "Users"
      WHERE id = $1
      RETURNING *;
    `

    pool.query(deleteUser, values, (err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null, result);
      }
    })
  }
}

module.exports = Model;
