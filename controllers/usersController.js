const { comparePassword } = require("../helpers/encryption");
const Model = require("../models/model");
const request = require('request');

class UsersController {
  static loginPage(req, res) {
    res.render("login", { title: "Login" });
  }

  static login(req, res) {
    if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
      return res.json({"responseCode" : 1,"responseDesc" : "Please select captcha"});
    }
    // Put your secret key here.
    var secretKey = process.env.RECAPTCHA_SECRET_KEY;
    // req.connection.remoteAddress will provide IP address of connected user.
    var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
    // Hitting GET request to the URL, Google will respond with success or error scenario.
    request(verificationUrl,function(error,response,body) {
      body = JSON.parse(body);
      // Success will be true or false depending upon captcha validation.
      if(body.success !== undefined && !body.success) {
        return res.json({"responseCode" : 1,"responseDesc" : "Failed captcha verification"});
      }

      const { name, password } = req.body;

      if (!name || !password) {
        res.send("Name atau Password tidak boleh kosong");
        return;
      }

      Model.readUserByName(name, (err, result) => {
        if (err) {
          res.send(err);
        } else {
          const isPasswordValid = comparePassword(password, result.password);

          if (isPasswordValid) {
            res.redirect("/users");
          } else {
            res.send("LOGIN GAGAL");
          }
        }
      });
    });
  }

  static usersPage(req, res) {
    Model.readUsers((err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.render("users", { title: "Users", users: result });
      }
    });
  }

  static addUserPage(req, res) {
    res.render("addUser", { title: "Add User" });
  }

  static addUser(req, res) {
    const { name, password } = req.body;

    if (!name || !password) {
      res.send("Name atau Password tidak boleh kosong");
      return;
    }

    Model.addUser(name, password, (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.redirect("/users");
      }
    });
  }

  static deleteUser(req, res) {
    const { id } = req.params;

    Model.deleteUserById(Number(id), (err, result) => {
      if (err) {
        if (err.name === "Validation Errors") {
          res.send(err.msg);
        } else {
          res.send(err);
        }
      } else {
        res.redirect("/users");
      }
    });
  }

  static editUserPage(req, res) {
    const { id } = req.params;

    Model.readUserById(id, (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.render("editUser", { title: "Edit User", user: result });
      }
    });
  }

  static editUser(req, res) {
    const { id } = req.params;
    const { name } = req.body;

    console.log(id, name);

    Model.editUser(id, name, (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.redirect("/users");
      }
    });
  }
}

module.exports = UsersController;
