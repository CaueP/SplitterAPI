var express = require('express');

var cardapioRouter = express.Router();

var router = function (mySqlPool) {

    var cardapioController = require('../controllers/cardapioController')(mySqlPool);

    cardapioRouter.route('/:codEstabelecimento')
        /**
         * @api {get} cardapio/:codEstabelecimento Buscar o cardápio de um estabelecimento
         * @apiVersion 0.0.1
         * @apiName GetCardapioEstabelecimento
         * @apiGroup Cardapio
         *
         * @apiSampleRequest /api/cardapio/BARFRAN
         *
         * @apiSuccess {Object} cardapio Lista com itens do cardápio
         * @apiSuccess {Number} cod_produto Código do produto
         * @apiSuccess {String} nome_produto Nome do produto
         * @apiSuccess {String} cod_tp_alimento Tipo do produto
         * @apiSuccess {String} dsc_produto Descrição do produto
         * @apiSuccess {Number} val_produto Valor unitário do produto
         * @apiSuccess {String} link_img_produto URL para imagem do produto
         *
         * @apiSuccessExample {json} Success-Response:
         *     HTTP/1.1 200 OK
         *   {
         *    "cardapio": [
         *        {
         *          "cod_produto": 6,
         *          "nome_produto": "Batata Frita",
         *          "cod_tp_alimento": 2,
         *          "dsc_produto": "Batata frita, porção de 500 gramas",
         *          "val_produto": 22.5,
         *          "link_img_produto": "http://www.restaurantecozinhaitaliana.com.br/files/batata.jpg"
         *        },
         *        {
         *          "cod_produto": 7,
         *          "nome_produto": "Batata Frita Suprema",
         *          "cod_tp_alimento": 2,
         *          "dsc_produto": "Batata frita com cheddar, bacon e queijo ralado, porção de 500 gramas",
         *          "val_produto": 27.5,
         *          "link_img_produto": "http://www.bigxpicanha.com.br/Content/Produto/Imagem/Fritas-com-Cheddar-e-Bacon-108.png"
         *        },
         *        {
         *          "cod_produto": 8,
         *          "nome_produto": "Mini Coxinha",
         *          "cod_tp_alimento": 2,
         *          "dsc_produto": "Coxinhas de Frango, porção de 10 unidades",
         *          "val_produto": 32,
         *          "link_img_produto": "http://natashopping.com.br/lojas/supermercadonata/produtos/15688/galeria/mini-coxinha-com-catupiry-cento-400x400-1.jpg"
         *        }
         *    ]
         *    }
         *
         * @apiError EstabelecimentoNaoEncontrado O estabelecimento não foi encontrado.
         *
         * @apiErrorExample EstabelecimentoNaoEncontrado:
         *     HTTP/1.1 404 Not Found
         *     {
         *          "error": "EstabelecimentoNaoEncontrado",
         *          "estabEncontrado": false
         *     }
         *
         */
        .get(cardapioController.consultarCardapio);

    return cardapioRouter;
};

module.exports = router;