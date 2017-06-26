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
         * @apiParam {String} email Email do usuário
         * @apiParam {Object} mesa Objeto mesa
         * @apiParam {String} qrCode QR Code completo da Mesa
         * @apiParam {String} nrMesa Número da mesa
         * @apiParam {Number} tipoDivisao Método de divisão da conta da mesa (Mesa = 1, Individual = 2)
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
         *               "codEstabelecimento": "TAVERNA",
         *               "tipoDivisao": 1
         *           }
         *   }
         *
         * @apiSuccess {Bool} isSucesso Indica se o check-in foi bem sucedido
         * @apiSuccess {Object} mesa Objeto mesa
         * @apiParam {String} codEstabelecimento Código do estabelecimento
         * @apiSuccess {String} qrCodeOcupado QR Code criado para quando é o primeiro usuário
         * @apiSuccess {String} nrMesa Número da mesa
         * @apiSuccess {String} usuarioResponsavel Usuário responsável pela mesa
         * @apiSuccess {Object} comanda Objeto Comanda
         * @apiSuccess {Number} cod_comanda Código da comanda gerada para o usuário
         * @apiSuccess {Bool} isPrimeiroUsuario Indica se é o primeiro usuário à realizar check-in
         *
         * @apiSuccessExample {json} Mesa Livre:
         *     HTTP/1.1 201 OK
         *   {
         *           "isSucesso": true,
         *           "mesa": {
         *               "codEstabelecimento": "TAVERNA",
         *               "nrMesa": 3,
         *               "qrCodeOcupado": "001TAVERNAada.lovelace@history.com"
         *           },
         *           "comanda": {
         *               "cod_comanda": 1
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
         *               "cod_comanda": 2
         *           },
         *           "isPrimeiroUsuario": false
         *   }
         *
         * @apiError UsuarioInvalido O usuário passado é inválido.
         *
         * @apiErrorExample UsuarioInvalido:
         *     HTTP/1.1 422 Unprocessable Entity
         *     {
         *       "isSucesso": false,
         *       "error": "UsuarioInvalido"
         *     }
         *
         * @apiError MesaInvalida A mesa escaneada é inválida.
         *
         * @apiErrorExample MesaInvalida:
         *     HTTP/1.1 422 Unprocessable Entityd
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
     * @apiParam {String} novoStatus Novo status da mesa ("Vazio" 0, "Ocupado" 1 ou "Manutencao" 2)
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
     *               "novoStatus": "Vazio",
     *               "codEstabelecimento": "TAVERNA"
     *           }
     *   }
     *
     * @apiSuccess {Bool} isSucesso Indica se a atualização foi bem sucedida
     *
     * @apiSuccessExample {json} Mesa atualizada:
     *     HTTP/1.1 201 OK
     *   {
     *       "isSucesso": true,
     *       "nrNovoStatus": 0
     *   }
     *
     * @apiErrorExample UsuarioInvalido:
     *     HTTP/1.1 422 Unprocessable Entity
     *     {
     *       "isSucesso": false,
     *       "error": "UsuarioInvalido"
     *     }
     *
     * @apiError MesaInvalida A mesa escaneada é inválida.
     *
     * @apiErrorExample MesaInvalida:
     *     HTTP/1.1 422 Unprocessable Entity
     *     {
     *       "isSucesso": false,
     *       "error": "MesaInvalida"
     *     }
     *
     * @apiError NovoStatusNaoEncontrado O status da mesa não foi passado.
     *
     * @apiErrorExample NovoStatusInvalido:
     *     HTTP/1.1 422 Unprocessable Entity
     *     {
     *       "isSucesso": false,
     *       "error": "NovoStatusNaoEncontrado"
     *     }
     *
     * @apiError ErroDesconhecido Ocorreu um erro desconhecido.
     *
     * @apiErrorExample ErroDesconhecido:
     *     HTTP/1.1 500 Internal Server Error
     *     {
     *       "isSucesso": false,
     *       "error": "ErroDesconhecido"
     *     }
     *
     */
    .put(checkinController.atualizarStatusMesa)

    return checkinRouter;
};


// exporting the user router
module.exports = router;