var express = require('express');

var checkinRouter = express.Router();

var router = function (mySqlPool) {

    var checkinController = require('../controllers/checkinController')(mySqlPool);

    checkinRouter.use(checkinController.middleware);

    checkinRouter.route('/')
        /**
         * @api {post} checkin/ Realizar check-in
         * @apiVersion 0.0.1
         * @apiName Checkin
         * @apiGroup Check-in
         *
         * @apiParam {Object} usuario Objeto usuário
         * @apiParam {String} email Email do usuário
         * @apiParam {Object} mesa Objeto mesa
         * @apiParam {String} qrCode QR Code completo da Mesa
         * @apiParam {String} nrMesa Número da mesa
         * @apiParam {String} codEstabelecimento Código do estabelecimento
         *
         * @apiSampleRequest /api/checkin/
         *
         * @apiParamExample {json} Request-Example:
         *   {
         *           "usuario": {
         *               "email": "ada.lovelace@history.com"
         *           },
         *           "mesa": {
         *               "qrCode": "001TAVERNA",
         *               "nrMesa": "001",
         *               "codEstabelecimento": "TAVERNA"
         *           }
         *   }
         *
         * @apiSuccess {Bool} isSucesso Indica se o check-in foi bem sucedido
         * @apiSuccess {Object} mesa Objeto mesa
         * @apiSuccess {String} qrCodeOcupado QR Code criado para quando é o primeiro usuário
         * @apiSuccess {String} nrMesa Número da mesa
         * @apiSuccess {String} usuarioResponsavel Usuário responsável pela mesa
         * @apiSuccess {Object} comanda Objeto Comanda
         * @apiSuccess {Number} codComanda Código da comanda gerada para o usuário
         * @apiSuccess {Bool} isPrimeiroUsuario Indica se é o primeiro usuário à realizar check-in
         *
         * @apiSuccessExample {json} Mesa Livre:
         *     HTTP/1.1 201 OK
         *   {
         *           "isSucesso": true,
         *           "mesa": {
         *               "nrMesa": 3,
         *               "qrCodeOcupado": "001TAVERNAada.lovelace@history.com"
         *           },
         *           "comanda": {
         *               "codComanda": 1
         *           },
         *           "isPrimeiroUsuario": true
         *   }
         *
         * @apiSuccessExample {json} Mesa Ocupada:
         *     HTTP/1.1 200 OK
         *   {
         *           "isSucesso": true,
         *           "mesa": {
         *               "nrMesa": 3,
         *               "usuarioResponsavel": "ada.lovelace@history.com"
         *           },
         *           "comanda": {
         *               "codComanda": 2
         *           },
         *           "isPrimeiroUsuario": false
         *   }
         *
         * @apiError UsuarioInvalido O usuário passado é inválido.
         *
         * @apiErrorExample UsuarioInvalido:
         *     HTTP/1.1 304 Not Modified
         *     {
         *       "isSucesso": false,
         *       "error": "UsuarioInvalido"
         *     }
         *
         * @apiError MesaInvalida A mesa escaneada é inválida.
         *
         * @apiErrorExample MesaInvalida:
         *     HTTP/1.1 304 Not Modified
         *     {
         *       "isSucesso": false,
         *       "error": "MesaInvalida"
         *     }
         *
         * @apiError MesaNaoEncontrada A mesa escaneada não existe.
         *
         * @apiErrorExample MesaNaoEncontrada:
         *     HTTP/1.1 404 Not Found
         *     {
         *       "isSucesso": false,
         *       "error": "MesaNaoEncontrada"
         *     }
         *
         */
        .post(checkinController.realizarCheckin)


        /**
         * @api {put} checkin/ Atualizar Status da Mesa
         * @apiVersion 0.0.1
         * @apiName atualizarMesa
         * @apiGroup Check-in
         *
         * @apiParam {Object} usuario Objeto usuário
         * @apiParam {String} email Email do usuário
         * @apiParam {Object} mesa Objeto mesa
         * @apiParam {String} qrCode QR Code completo da Mesa        
         * @apiParam {Number} nrMesa Número da mesa
         * @apiParam {String} novoStatus Novo status da mesa (livre, ocupado ou manutancao)
         * @apiParam {String} codEstabelecimento Código do estabelecimento
         *
         * @apiSampleRequest /api/checkin/
         *
         * @apiParamExample {json} Request-Example:
         *   {
         *           "usuario": {
         *               "email": "ada.lovelace@history.com"
         *           },
         *           "mesa": {
         *               "qrCode": "001TAVERNA",
         *               "nrMesa": "001",
         *               "novoStatus": "livre",
         *               "codEstabelecimento": "TAVERNA"
         *           }
         *   }
         *
         * @apiSuccess {Bool} isSucesso Indica se a atualização foi bem sucedida
         *
         * @apiSuccessExample {json} Mesa atualizada:
         *     HTTP/1.1 201 OK
         *   {
         *       "isSucesso": true
         *   }
         *
         * @apiErrorExample UsuarioInvalido:
         *     HTTP/1.1 304 Not Modified
         *     {
         *       "isSucesso": false,
         *       "error": "UsuarioInvalido"
         *     }
         *
         * @apiError MesaInvalida A mesa escaneada é inválida.
         *
         * @apiErrorExample MesaInvalida:
         *     HTTP/1.1 304 Not Modified
         *     {
         *       "isSucesso": false,
         *       "error": "MesaInvalida"
         *     }
         *
         * @apiError NovoStatusNaoEncontrado O status da mesa não foi passado.
         *
         * @apiErrorExample NovoStatusNaoEncontrado:
         *     HTTP/1.1 304 Not Modified
         *     {
         *       "isSucesso": false,
         *       "error": "NovoStatusNaoEncontrado"
         *     }
         *
         */
        .put(checkinController.atualizarStatusMesa)

    return checkinRouter;
};


// exporting the user router
module.exports = router;