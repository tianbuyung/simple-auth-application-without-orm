const express = require("express");
const router = express.Router();
const fibonacciController = require("../controllers/fibonacciController");
const usersController = require("../controllers/usersController");

router.get("/", fibonacciController.fibonacciPage);
router.post("/", fibonacciController.generateFibonacci);

router.get("/login", usersController.loginPage);
router.post("/login", usersController.login);

router.get("/users", usersController.usersPage);

router.get("/add-user", usersController.addUserPage);
router.post("/add-user", usersController.addUser);

router.get('/delete-user/:id', usersController.deleteUser);

router.get('/edit-user/:id', usersController.editUserPage);
router.post('/edit-user/:id', usersController.editUser);

module.exports = router;
