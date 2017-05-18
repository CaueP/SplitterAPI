var express = require('express');

contaRouter = express.Router();

var router = function () {
    var contaController = require('../controllers/contaController')();

    contaRouter.route('/:codEstabelecimento/:cod_comanda')
        /**
         * @api {get} conta/:codEstabelecimento/:cod_comanda Calcular total da Conta
         * @apiVersion 0.0.1
         * @apiName GetTotal
         * @apiGroup Conta
         *
         * @apiSampleRequest /api/conta/BARFRAN/1
         *
         * @apiSuccess {Number} total Valor total dos pedidos realizados
         * @apiSuccess {Number} cod_pedido Código do pedido realizado
         * @apiSuccess {String} nome_produto Nome do produto
         * @apiSuccess {Number} qtd_produto Quantidade de produtos pedidos
         * @apiSuccess {String} link_img_produto URL para imagem do produto
         * @apiSuccess {Number} val_pedido Valor total do pedido
         * @apiSuccess {Number} cod_status_pedido Código de status do pedido
         *
         * @apiSuccessExample {json} Success-Response:
         *     HTTP/1.1 200 OK
         * {
         *      "total": 50.00,    
         *      "pedidos": [
         *              {
         *                  "cod_pedido": 6,
         *                  "nome_produto": "Batata Frita",
         *                  "qtd_produto": 2,
         *                  "link_img_produto": "http://www.restaurantecozinhaitaliana.com.br/files/batata.jpg",
         *                  "val_pedido": 22.5,
         *                  "cod_status_pedido": 0
         *              },
         *              {
         *                  "cod_pedido": 7,
         *                  "nome_produto": "Batata Frita Suprema",
         *                  "qtd_produto": 2,
         *                  "link_img_produto": "http://www.bigxpicanha.com.br/Content/Produto/Imagem/Fritas-com-Cheddar-e-Bacon-108.png",
         *                  "val_pedido": 27.5,
         *                  "cod_status_pedido": 0
         *          ]
         * }
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
        .get(contaController.consultarConta);

    contaRouter.route('/:codEstabelecimento/:nrMesa/:cod_comanda')
        .get(contaController.fecharConta);

    return contaRouter;
};

module.exports = router;