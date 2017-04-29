var pedidoController = function () {

    /**
     * Função para realizar um pedido
     * @param {*} req 
     * @param {*} res 
     */
    var realizarPedido = function (req, res) {
        var resposta;

        // verificando se todos os parametros foram recebidos
        if (!req.body.codEstabelecimento ||
            !req.body.codComanda ||
            !req.body.codProduto ||
            !req.body.qtdProduto ||
            !req.body.descObservacao) {
            resposta = {
                error: 'ParametrosInvalidos'
            };
            res.status(200);
            res.json(resposta);
        } else {
            resposta = {
                numPedido: 1
            };
            res.status(201);
            res.json(resposta)
        }
    };

    /**
     * Função para consultar pedidos em uma comanda
     * @param {*} req 
     * @param {*} res 
     */
    var consultarPedidos = function (req, res) {
        var resposta;
        // verificando se todos os parametros foram recebidos
        if (!req.params.codEstabelecimento ||
            !req.params.codComanda) {
            resposta = {
                error: 'ParametrosInvalidos'
            };
            res.status(200);
            res.json(resposta);
        } else {
            resposta = [{
                cod_pedido: 1
            }];
            res.status(200);
            res.json(resposta)
        }
    };

    return {
        realizarPedido: realizarPedido,
        consultarPedidos: consultarPedidos
    };
};

module.exports = pedidoController;