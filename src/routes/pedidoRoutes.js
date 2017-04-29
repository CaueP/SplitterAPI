var express = require('express');

pedidoRouter = express.Router();

var router = function () {

    var pedidoController = require('../controllers/pedidoController')();

    pedidoRouter.route('/')
        /**
         * @api {post} pedido/ Realizar pedido
         * @apiVersion 0.0.1
         * @apiName postPedido
         * @apiGroup Pedido
         *
         * @apiParam {String} codEstabelecimento Código do estabelecimento
         * @apiParam {Number} codComanda Código da comanda
         * @apiParam {Number} codProduto Código do produto
         * @apiParam {Number} qtdProduto Quantidade do produto
         * @apiParam {String} descObservacao Observação do pedido para a preparação
         * @apiSampleRequest /api/pedido/
         *
         * @apiParamExample {json} Request-Example:
         *   {
         *           "codEstabelecimento": "TAVERNA",
         *           "codComanda": 1,
         *           "codProduto": 6,
         *           "qtdProduto": 2,
         *           "descObservacao": "Sem açúcar"
         *   }
         *
         * @apiSuccess {Number} codPedido Código do pedido realizado
         *
         * @apiSuccessExample {json} Pedido Realizado:
         *     HTTP/1.1 201 OK
         *   {
         *           "codPedido": 3
         *   }
         *
         * @apiError ParametrosInvalidos Os parâmetros passados são inválidos.
         *
         * @apiErrorExample ParametrosInvalidos:
         *     HTTP/1.1 200 Not Modified
         *     {
         *       "error": "ParametrosInvalidos"
         *     }
         *
         */
        .post(pedidoController.realizarPedido);

    pedidoRouter.route('/:codEstabelecimento/:codComanda')
        /**
         * @api {get} pedido/:codEstabelecimento/:codComanda Buscar pedidos
         * @apiVersion 0.0.1
         * @apiName GetPedidos
         * @apiGroup Pedido
         *
         * @apiSampleRequest /api/pedido/BARFRAN/1
         *
         * @apiSuccess {Number} cod_pedido Código do pedido realizado
         * @apiSuccess {String} nome_produto Nome do produto
         * @apiSuccess {Number} qtd_produto Quantidade de produtos pedidos
         * @apiSuccess {String} link_img_produto URL para imagem do produto
         * @apiSuccess {Number} val_pedido Valor total do pedido
         * @apiSuccess {Number} cod_status_pedido Código de status do pedido
         *
         * @apiSuccessExample {json} Success-Response:
         *     HTTP/1.1 200 OK
         *   [
         *        {
         *          "cod_pedido": 6,
         *          "nome_produto": "Batata Frita",
         *          "qtd_produto": 2,
         *          "link_img_produto": "http://www.restaurantecozinhaitaliana.com.br/files/batata.jpg",
         *          "val_pedido": 22.5,
         *          "cod_status_pedido": 0
         *        },
         *        {
         *          "cod_pedido": 7,
         *          "nome_produto": "Batata Frita Suprema",
         *          "qtd_produto": 2,
         *          "link_img_produto": "http://www.bigxpicanha.com.br/Content/Produto/Imagem/Fritas-com-Cheddar-e-Bacon-108.png",
         *          "val_pedido": 27.5,
         *          "cod_status_pedido": 0
         *    ]
         */
        .get(pedidoController.consultarPedidos);

    return pedidoRouter;
};

module.exports = router;