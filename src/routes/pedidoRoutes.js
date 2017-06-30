var express = require('express');

pedidoRouter = express.Router();

var router = function() {

    var pedidoController = require('../controllers/pedidoController')();

    pedidoRouter.route('/')
        /**
         * @api {post} pedido/ Realizar pedido
         * @apiVersion 0.0.1
         * @apiName postPedido
         * @apiGroup Pedido
         *
         * @apiParam {String} codEstabelecimento Código do estabelecimento
         * @apiParam {Number} nrMesa Número da mesa do estabelecimento
         * @apiParam {Number} cod_comanda Código da comanda
         * @apiParam {Number} cod_produto Código do produto
         * @apiParam {Number} qtd_produto Quantidade do produto
         * @apiParam {String} txt_observacao Observação do pedido para a preparação
         * @apiSampleRequest /api/pedido/
         *
         * @apiParamExample {json} Request-Example:
         *   {
         *           "codEstabelecimento": "TAVERNA",
         *           "nrMesa": 1,
         *           "cod_comanda": 1,
         *           "cod_produto": 6,
         *           "qtd_produto": 2,
         *           "txt_observacao": "Sem açúcar"
         *   }
         *
         * @apiSuccess {Number} codPedido Código do pedido realizado
         *
         * @apiSuccessExample {json} Pedido Realizado:
         *     HTTP/1.1 201 Created
         *   {
         *           "cod_pedido": 3
         *   }
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
        .post(pedidoController.realizarPedido);

    pedidoRouter.route('/:codEstabelecimento/:cod_comanda')
        /**
         * @api {get} pedido/:codEstabelecimento/:cod_comanda Buscar pedidos
         * @apiVersion 0.0.1
         * @apiName GetPedidos
         * @apiGroup Pedido
         *
         * @apiSampleRequest /api/pedido/BARDOFRAN/1
         *
         * @apiSuccess {Number} cod_pedido Código do pedido realizado
         * @apiSuccess {String} nome_produto Nome do produto
         * @apiSuccess {Number} qtd_produto Quantidade de produtos pedidos
         * @apiSuccess {String} link_img_produto URL para imagem do produto
         * @apiSuccess {Number} val_a_pagar Valor individual a pagar
         * @apiSuccess {Number} val_pedido Valor total do pedido
         * @apiSuccess {Number} cod_status_pedido Código de status do pedido
         * @apiSuccess {String} txt_observacao Observação inserida ao realizar o pedido
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
         *          "val_a_pagar":  10,
         *          "cod_status_pedido": 0
         *          "txt_observacao": "Com sal"
         *    ]
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
        .get(pedidoController.consultarPedidos);

    return pedidoRouter;
};

module.exports = router;