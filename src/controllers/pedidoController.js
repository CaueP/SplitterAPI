var pedidoController = function () {

    /**
     * Função para realizar um pedido
     * @param {*} req 
     * @param {*} res 
     */
    var realizarPedido = function (req, res, next) {
        var resposta;

        // verificando se todos os parametros foram recebidos
        req.assert('codEstabelecimento', 'CodEstabelecimento é obrigatório').notEmpty().isAlpha();
        req.assert('codComanda', 'codComanda é obrigatório').notEmpty().isInt();
        req.assert('codProduto', 'codProduto é obrigatório').notEmpty();
        req.assert('qtdProduto', 'qtdProduto é obrigatório').notEmpty();
        req.assert('descObservacao', 'descObservacao é obrigatório');

        var errors = req.validationErrors();
        if (errors) {
            resposta = {
                error: 'ParametrosInvalidos'
            };
            res.status(422);
            res.json(resposta);
            return;
        }
        // dados para o insert
        var codEstabelecimento = req.body.codEstabelecimento,
            codComanda = req.body.codComanda,
            codProduto = req.body.codProduto,
            qtdProduto = req.body.qtdProduto,
            descObservacao = req.body.descObservacao;

        // obtem conexao com o DB
        req.getConnection(function (err, conn) {
            if (err) {
                console.log("Nao foi possivel conectar ao Banco de Dados");
                console.log(err);
                return next("ErroConexaoBD");
            }
            // envia a query ao DB
            var query = conn.query('CALL pr_realizar_pedido(?, ?, ?, ?, ?);', [codEstabelecimento, codComanda, codProduto, qtdProduto, descObservacao],
                function (err, rows) {
                    if (err) {
                        console.log(err);
                        resposta = {
                            error: 'ParametroNaoEncontrado'
                        };
                        res.status(422);
                        res.json(resposta);
                        return;
                    }
                    if (rows[0][0]) {   // valida se recebeu a resposta
                        console.log("Codigo do pedido realizado:", rows[0][0].cod_pedido);
                        res.status(201);
                        res.json({
                            codPedido: rows[0][0].cod_pedido
                        });
                    }
                });
        });
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