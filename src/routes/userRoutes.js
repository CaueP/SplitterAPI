var express = require('express');

var userRouter = express.Router();

// function router
var router = function(mySqlPool) {

    var userController = require('../controllers/userController')(mySqlPool);

    // Setting route for /
    userRouter.route('/')
        /**
        * @api {get} usuario/ Buscar todos os usuários
        * @apiVersion 0.0.1
        * @apiName GetAllUsers
        * @apiGroup Usuario
        *
        * @apiSampleRequest /api/usuario/
        *
        * @apiSuccess {Number} id Id do usuário
        * @apiSuccess {String} nome Nome do usuário
        * @apiSuccess {Number} cpf CPF do usuário
        * @apiSuccess {String} dataNascimento Data de nascimento do usuário
        * @apiSuccess {String} email Email do usuário
        * @apiSuccess {Number} telefone Número de telefone do usuário
        * @apiSuccess {Bool} contaAtiva Estado da conta do usuário
        *
        * @apiSuccessExample {json} Success-Response:
        *     HTTP/1.1 200 OK
        *   [
        *       {
        *           "id": 1,
        *           "nome": "Ada Lovelace",
        *           "cpf": 12345678901,
        *           "dataNascimento": "10/10/1815",
        *           "email": "ada.lovelace@history.com",
        *           "telefone": 12345678901,
        *           "contaAtiva": 1
        *       },
        *       {
        *           "id": 2,
        *           "nome": "Alan Mathison Turing",
        *           "cpf": 12345678901,
        *           "dataNascimento": "23/06/1912",
        *           "email": "alan.turing@history.com",
        *           "telefone": 12345678901,
        *           "contaAtiva": 1
        *       }
        *   ]
        */
        .get(userController.listaContas)
        /**
        * @api {post} usuario/ Criar um usuário
        * @apiVersion 0.0.1
        * @apiName CreateUser
        * @apiGroup Usuario
        *
        * @apiParam {String} nome Nome do usuário
        * @apiParam {Number} cpf CPF do usuário
        * @apiParam {String} email Email do usuário
        * @apiParam {Number} telefone Número de telefone do usuário
        * @apiParam {String} dataNascimento Data de nascimento do usuário
        * @apiParam {String} senha Senha do usuário
        *
        * @apiSampleRequest /api/usuario/
        *
        * @apiParamExample {json} Request-Example:
        *   {
        *           "nome": "Ada Lovelace",
        *           "cpf": 12345678901,
        *           "email": "ada.lovelace@history.com",
        *           "telefone": 12345678901,
        *           "dataNascimento": "10/10/1815",
        *           "senha": "computerrocks"
        *   }
        *
        * @apiSuccess {Number} id Id do usuário
        * @apiSuccess {String} nome Nome do usuário
        * @apiSuccess {Number} cpf CPF do usuário
        * @apiSuccess {String} dataNascimento Data de nascimento do usuário
        * @apiSuccess {String} email Email do usuário
        * @apiSuccess {Number} telefone Número de telefone do usuário
        * @apiSuccess {Bool} contaAtiva Estado da conta do usuário
        
        *
        * @apiSuccessExample {json} Success-Response:
        *     HTTP/1.1 200 OK
        *   {
        *           "id": 1,
        *           "nome": "Ada Lovelace",
        *           "cpf": 12345678901,
        *           "dataNascimento": "10/10/1815",
        *           "email": "ada.lovelace@history.com",
        *           "telefone": 12345678901,
        *           "contaAtiva": 1
        *   }
        *
        * @apiError UsuarioNaoEncontrado O id do usuário não foi encontrado.
        *
        * @apiErrorExample Error-Response:
        *     HTTP/1.1 304 Not Modified
        *     {
        *       "error": "UsuarioNaoEncontrado"
        *     }
        *
        */
        .post(userController.criarConta);  

     // Middleware for /:email
    userRouter.use('/:email', userController.middlewareConta);

    // Setting route to get a single user
    userRouter.route('/:email')
    /**
    * @api {get} usuario/:email Buscar um usuário
    * @apiVersion 0.0.1
    * @apiName GetUserById
    * @apiGroup Usuario
    *
    * @apiParam {String} email O email do usuário
    *
    * @apiSampleRequest /api/usuario/ada.lovelace@history.com
    *
    * @apiSuccess {Number} id Id do usuário
    * @apiSuccess {String} nome Nome do usuário
    * @apiSuccess {Number} cpf CPF do usuário
    * @apiSuccess {String} email Email do usuário
    * @apiSuccess {Number} telefone Número de telefone do usuário
    * @apiSuccess {String} dataNascimento Data de nascimento do usuário
    *
    * @apiSuccessExample {json} Success-Response:
    *     HTTP/1.1 200 OK
    *   {
    *           "id": 1,
    *           "nome": "Ada Lovelace",
    *           "cpf": 12345678901,
    *           "email": "ada.lovelace@history.com",
    *           "telefone": 12345678901,
    *           "dataNascimento": "10/10/1815"
    *   }
    *
    * @apiError UsuarioNaoEncontrado O id do usuário não foi encontrado.
    *
    * @apiErrorExample Error-Response:
    *     HTTP/1.1 404 Not Found
    *     {
    *       "error": "UsuarioNaoEncontrado"
    *     }
    *
    */
    .get(userController.buscarConta)
    /**
    * @api {put} usuario/:email Atualizar um usuário
    * @apiVersion 0.0.1
    * @apiName UpdateUserById
    * @apiGroup Usuario
    *
    * @apiParam {String} email O email atual do usuário
    * @apiParam {String} nome Novo nome do usuário
    * @apiParam {Number} cpf Novo CPF do usuário
    * @apiParam {String} email Novo email do usuário
    * @apiParam {Number} telefone Novo número de telefone do usuário
    * @apiParam {String} dataNascimento Nova data de nascimento do usuário
    * @apiParam {String} senha Nova senha do usuário
    *
    * @apiSampleRequest /api/usuario/ada.lovelace@history.com
    *
    * @apiParamExample {json} Request-Example:
    *   {
    *           "nome": "Ada Lovelace",
    *           "cpf": 12345678901,
    *           "email": "ada.lovelace@history.com",
    *           "telefone": 12345678901,
    *           "dataNascimento": "10/10/1815",
    *           "senha": "c4nth4xm3n0w"
    *   }
    *
    * @apiSuccess {Number} id Id do usuário
    * @apiSuccess {String} nome Nome do usuário
    * @apiSuccess {Number} cpf CPF do usuário
    * @apiSuccess {String} email Email do usuário
    * @apiSuccess {Number} telefone Número de telefone do usuário
    * @apiSuccess {String} dataNascimento Data de nascimento do usuário
    *
    * @apiSuccessExample {json} Success-Response:
    *     HTTP/1.1 200 OK
    *   {
    *           "id": 1,
    *           "nome": "Ada Lovelace",
    *           "cpf": 12345678901,
    *           "email": "ada.lovelace@history.com",
    *           "telefone": 12345678901,
    *           "dataNascimento": "10/10/1815",
    *   }
    *
    * @apiError UsuarioNaoEncontrado O id do usuário não foi encontrado.
    *
    * @apiErrorExample Error-Response:
    *     HTTP/1.1 404 Not Found
    *     {
    *       "error": "UsuarioNaoEncontrado"
    *     }
    *
    */   
    .put(userController.atualizarConta)
    /**
    * @api {delete} usuario/:email Desativar um usuário
    * @apiVersion 0.0.1
    * @apiName DeactivateUserById
    * @apiGroup Usuario
    *
    * @apiParam {String} email O email atual do usuário
    *
    * @apiSampleRequest /api/usuario/ada.lovelace@history.com
    *
    * @apiSuccess {String} result Resultado
    *
    * @apiSuccessExample {json} Success-Response:
    *     HTTP/1.1 200 OK
    *   {
    *       "result": "UsuarioDesativado"
    *   }
    *
    * @apiError UsuarioNaoEncontrado O id do usuário não foi encontrado.
    *
    * @apiErrorExample Error-Response:
    *     HTTP/1.1 404 Not Found
    *     {
    *       "error": "UsuarioNaoEncontrado"
    *     }
    *
    */
    .delete(userController.desativarConta);

    return userRouter;
};

// exporting the user router
module.exports = router;