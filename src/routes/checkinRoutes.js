var express = require('express');

var checkinRouter = express.Router();

var router = function(mySqlPool) {
    
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
        * @apiParam {String} nome Nome do usuário
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
        *               "nome": "Ada Lovelace"
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
        *           "isPrimeiroUsuario": false
        *   }
        *
        * @apiError UsuarioInvalido O id do usuário não foi encontrado.
        *
        * @apiErrorExample Error-Response:
        *     HTTP/1.1 304 Not Modified
        *     {
        *       "error": "UsuarioExistente"
        *     }
        *
        */
        .post(checkinController.realizarCheckin)
        .put(checkinController.atualizarStatusMesa)

    return checkinRouter;
};


// exporting the user router
module.exports = router;