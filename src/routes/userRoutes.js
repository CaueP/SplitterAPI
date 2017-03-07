var express = require('express');

var userRouter = express.Router();

// function router
var router = function(mySqlPool) {

    var userController = require('../controllers/userController')(mySqlPool);

    // Setting route for /
    userRouter.route('/')
        // GET method to get all users registered
        .get(userController.listaContas)
        // POST method to register a new user
        .post(userController.criarConta);  

    // Setting route to get a single user
    userRouter.route('/:email')
    .get(userController.buscarConta)
    .post(userController.atualizarConta)
    .delete(userController.desativarConta);

    return userRouter;
};

// exporting the user router
module.exports = router;