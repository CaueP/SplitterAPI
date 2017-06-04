var express = require('express');

mesaRouter = express.Router();

var router = function() {
    var mesaController = require('../controllers/mesaController')();

    mesaRouter.route('/participante/:codEstabelecimento/:nrMesa')
        /**
         * @api {get} mesa/participante/:codEstabelecimento/:cod_comanda Consultar participantes
         * @apiVersion 0.0.1
         * @apiName GetParticipante
         * @apiGroup Mesa
         *
         * @apiSampleRequest /mesa/participante/TAVERNA/1
         *
         * @apiSuccess {String} nome Nome do participante
         * @apiSuccess {String} email Email do participante
         * @apiSuccess {Number} nrComanda Númeri da comanda aberta para o participante
         * @apiSuccess {String} url_foto URL da foto do participante
         *
         * @apiSuccessExample {json} Success-Response:
         *     HTTP/1.1 200 OK
         * [
         *          {
         *              "nome": "Ada Lovelace",
         *              "email": "ada.lovelace@history.com",
         *              "nrComanda": 1,
         *              "url_foto": "https://vignette1.wikia.nocookie.net/curious-expedition/images/a/a0/Lovelace.jpg"
         *          },
         *          {
         *              "nome": "Alan Mathison Turing",
         *              "email": "alan.turing@history.com",
         *              "nrComanda": 2,
         *              "url_foto": "https://static.comicvine.com/uploads/scale_small/11/110802/4582551-alan-turing.gif"
         *          },
         *  ]
         * 
         * @apiError ParametrosInvalidos Os parâmetros passados são inválidos.
         *
         * @apiErrorExample ParametrosInvalidos:
         *     HTTP/1.1 422 Unprocessable Entity 
         *     {
         *       "error": "ParametrosInvalidos"
         *     }
         *
         * @apiError ParametroNaoEncontrado Algum dos parâmetros passados não foram encontrados no BD.
         *
         * @apiErrorExample ParametroNaoEncontrado:
         *     HTTP/1.1 422 Unprocessable Entity 
         *     {
         *       "error": "ParametroNaoEncontrado"
         *     }
         *
         */
        .get(mesaController.consultarParticipantes);


    return mesaRouter;
};

module.exports = router;