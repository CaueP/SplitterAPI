var express = require('express');

contaRouter = express.Router();

var router = function() {
    var contaController = require('../controllers/contaController')();

    contaRouter.route('/:codEstabelecimento/:cod_comanda')
        /**
         * @api {get} conta/:codEstabelecimento/:cod_comanda Calcular total
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

    /**
     * @api {post} conta/:codEstabelecimento/:nrMesa/:cod_comanda Fechar conta
     * @apiVersion 0.0.1
     * @apiName fecharConta
     * @apiGroup Conta
     *
     * @apiParam {String} codEstabelecimento Código do estabelecimento
     * @apiParam {Number} nrMesa Número da mesa do estabelecimento
     * @apiParam {Number} cod_comanda Código da comanda
     * @apiSampleRequest /api/conta/TAVERNA/1/2
     *
     * @apiSuccess {Number} total_individual Total individual da comanda
     * @apiSuccess {Number} total_mesa Total consumido pela mesa
     * @apiSuccess {Number} pedidos Lista de pedidos realizados
     * @apiSuccess {Number} cod_pedido Código do pedido realizado
     * @apiSuccess {String} nome_produto Nome do produto
     * @apiSuccess {Number} qtd_produto Quantidade de produtos pedidos
     * @apiSuccess {String} link_img_produto URL para imagem do produto
     * @apiSuccess {Number} val_a_pagar Valor individual a pagar
     * @apiSuccess {Number} val_pedido Valor total do pedido
     * @apiSuccess {Number} cod_status_pedido Código de status do pedido
     * @apiSuccess {String} txt_observacao Observação inserida ao realizar o pedido
     *
     * @apiSuccessExample {json} Pedido Realizado:
     *     HTTP/1.1 201 Created
     *   {
     *           "total_individual": 10,
     *           "total_mesa": 30,
     *           "pedidos":
     *          [
     *              {
     *                  "cod_pedido": 6,
     *                  "nome_produto": "Batata Frita",
     *                  "qtd_produto": 2,
     *                  "link_img_produto": "http://www.restaurantecozinhaitaliana.com.br/files/batata.jpg",
     *                  "val_a_pagar":  10,
     *                  "val_pedido": 30,
     *                  "cod_status_pedido": 0,
     *                  "txt_observacao": "Com sal"
     *              },
     *              {
     *                  "cod_pedido": 7,
     *                  "nome_produto": "Batata Frita Suprema",
     *                  "qtd_produto": 2,
     *                  "link_img_produto": "http://www.bigxpicanha.com.br/Content/Produto/Imagem/Fritas-com-Cheddar-e-Bacon-108.png",
     *                  "val_pedido": 27.5,
     *                  "cod_status_pedido": 0,
     *                  "txt_observacao": "Sem cheddar"
     *          ]
     * 
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
    contaRouter.route('/:codEstabelecimento/:nrMesa/:cod_comanda')
        .get(contaController.fecharConta);

    /**
     * @api {post} conta/pagar/:nrMesa/:cod_comanda Registrar pagamento
     * @apiVersion 0.0.1
     * @apiName registrarPagamento
     * @apiGroup Conta
     *
     * @apiParam {Number} nrMesa Número da mesa do estabelecimento
     * @apiParam {Number} cod_comanda Código da comanda
     * @apiSampleRequest /api/conta/pagar/1/2
     *
     * @apiSuccess {Boolean} pagamentoRealizado Confirmação da realização do pagamento
     *
     * @apiSuccessExample {json} Pedido Realizado:
     *     HTTP/1.1 201 Created
     *   {
     *           pagamentoRealizado: true
     * 
     *   }
     *
     * @apiError ParametrosInvalidos Os parâmetros passados são inválidos.
     *
     * @apiErrorExample ParametrosInvalidos:
     *     HTTP/1.1 422 Unprocessable Entity 
     *     {
     *           error: 'ParametrosInvalidos'
     *     }
     *
     * @apiError ParametroNaoEncontrado Algum dos parâmetros passados não foram encontrados no BD.
     *
     * @apiErrorExample ParametroNaoEncontrado:
     *     HTTP/1.1 422 Unprocessable Entity 
     *     {
     *           error: 'ParametroNaoEncontrado',
     *           pagamentoRealizado: false
     *     }
     *
     */
    contaRouter.route('/pagar/:nrMesa/:cod_comanda')
        .post(contaController.pagarConta);

    return contaRouter;
};

module.exports = router;