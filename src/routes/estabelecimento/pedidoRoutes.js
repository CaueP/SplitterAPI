var express = require('express');

pedidoRouter = express.Router();

var router = function() {

    var pedidoController = require('../../controllers/estabelecimento/pedidoController')();

    pedidoRouter.route('/:codEstabelecimento')
        .get(pedidoController.consultarPedidos);

    return pedidoRouter;
};

module.exports = router;