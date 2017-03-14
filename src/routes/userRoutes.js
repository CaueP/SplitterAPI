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
        * @apiSuccess {String} txt_nome Nome do usuário
        * @apiSuccess {Number} nr_cpf CPF do usuário
        * @apiSuccess {String} txt_email Email do usuário
        * @apiSuccess {Number} nr_telefone Número de telefone do usuário
        * @apiSuccess {String} dt_nascimento Data de nascimento do usuário
        *
        * @apiSuccessExample {json} Success-Response:
        *     HTTP/1.1 200 OK
        *   [
        *       {
        *           "id": 1,
        *           "txt_nome": "Ada Lovelace",
        *           "nr_cpf": 12345678901,
        *           "txt_email": "ada.lovelace@history.com",
        *           "nr_telefone": 12345678901,
        *           "dt_nascimento": "10/10/1815"
        *       },
        *       {
        *           "id": 2,
        *           "txt_nome": "Alan Mathison Turing",
        *           "nr_cpf": 12345678901,\
        *           "txt_email": "alan.turing@history.com",
        *           "nr_telefone": 12345678901,
        *           "dt_nascimento": "23/06/1912"
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
        * @apiParam {String} txt_nome Nome do usuário
        * @apiParam {Number} nr_cpf CPF do usuário
        * @apiParam {String} txt_email Email do usuário
        * @apiParam {Number} nr_telefone Número de telefone do usuário
        * @apiParam {String} dt_nascimento Data de nascimento do usuário
        * @apiParam {String} txt_senha Senha do usuário
        *
        * @apiSampleRequest /api/usuario/
        *
        * @apiParamExample {json} Request-Example:
        *   {
        *           "txt_nome": "Ada Lovelace",
        *           "nr_cpf": 12345678901,
        *           "txt_email": "ada.lovelace@history.com",
        *           "nr_telefone": 12345678901,
        *           "dt_nascimento": "10/10/1815",
        *           "txt_senha": "computerrocks"
        *   }
        *
        * @apiSuccess {Number} id Id do usuário
        * @apiSuccess {String} txt_nome Nome do usuário
        * @apiSuccess {Number} nr_cpf CPF do usuário
        * @apiSuccess {String} txt_email Email do usuário
        * @apiSuccess {Number} nr_telefone Número de telefone do usuário
        * @apiSuccess {String} dt_nascimento Data de nascimento do usuário
        *
        * @apiSuccessExample {json} Success-Response:
        *     HTTP/1.1 200 OK
        *   {
        *           "id": 1,
        *           "txt_nome": "Ada Lovelace",
        *           "nr_cpf": 12345678901,
        *           "txt_email": "ada.lovelace@history.com",
        *           "nr_telefone": 12345678901,
        *           "dt_nascimento": "10/10/1815",
        *   }
        *
        * @apiError UsuarioNaoEncontrado O id do usuário não foi encontrado.
        *
        * @apiErrorExample Error-Response:
        *     HTTP/1.1 404 Not Found
        *     {
        *       "error": "UsuarioExistente"
        *     }
        *
        */
        .post(userController.criarConta);  

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
    * @apiSuccess {String} txt_nome Nome do usuário
    * @apiSuccess {Number} nr_cpf CPF do usuário
    * @apiSuccess {String} txt_email Email do usuário
    * @apiSuccess {Number} nr_telefone Número de telefone do usuário
    * @apiSuccess {String} dt_nascimento Data de nascimento do usuário
    *
    * @apiSuccessExample {json} Success-Response:
    *     HTTP/1.1 200 OK
    *   {
    *           "id": 1,
    *           "txt_nome": "Ada Lovelace",
    *           "nr_cpf": 12345678901,
    *           "txt_email": "ada.lovelace@history.com",
    *           "nr_telefone": 12345678901,
    *           "dt_nascimento": "10/10/1815"
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
    * @api {post} usuario/:email Atualizar um usuário
    * @apiVersion 0.0.1
    * @apiName UpdateUserById
    * @apiGroup Usuario
    *
    * @apiParam {String} email O email atual do usuário
    * @apiParam {String} txt_nome Novo nome do usuário
    * @apiParam {Number} nr_cpf Novo CPF do usuário
    * @apiParam {String} txt_email Novo email do usuário
    * @apiParam {Number} nr_telefone Novo número de telefone do usuário
    * @apiParam {String} dt_nascimento Nova data de nascimento do usuário
    * @apiParam {String} txt_senha Nova senha do usuário
    *
    * @apiSampleRequest /api/usuario/ada.lovelace@history.com
    *
    * @apiParamExample {json} Request-Example:
    *   {
    *           "txt_nome": "Ada Lovelace",
    *           "nr_cpf": 12345678901,
    *           "txt_email": "ada.lovelace@history.com",
    *           "nr_telefone": 12345678901,
    *           "dt_nascimento": "10/10/1815",
    *           "txt_senha": "c4nth4xm3n0w"
    *   }
    *
    * @apiSuccess {Number} id Id do usuário
    * @apiSuccess {String} txt_nome Nome do usuário
    * @apiSuccess {Number} nr_cpf CPF do usuário
    * @apiSuccess {String} txt_email Email do usuário
    * @apiSuccess {Number} nr_telefone Número de telefone do usuário
    * @apiSuccess {String} dt_nascimento Data de nascimento do usuário
    *
    * @apiSuccessExample {json} Success-Response:
    *     HTTP/1.1 200 OK
    *   {
    *           "id": 1,
    *           "txt_nome": "Ada Lovelace",
    *           "nr_cpf": 12345678901,
    *           "txt_email": "ada.lovelace@history.com",
    *           "nr_telefone": 12345678901,
    *           "dt_nascimento": "10/10/1815",
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
    .post(userController.atualizarConta)
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