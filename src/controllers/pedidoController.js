var pedidoController = function() {

    /**
     * Função para realizar um pedido
     * @param {*} req 
     * @param {*} res 
     */
    var realizarPedido = function(req, res, next) {
        var resposta;

        // verificando se todos os parametros foram recebidos
        req.assert('codEstabelecimento', 'CodEstabelecimento é obrigatório').notEmpty().isAlpha();
        req.assert('cod_comanda', 'cod_comanda é obrigatório').notEmpty().isInt();
        req.assert('cod_produto', 'cod_produto é obrigatório').notEmpty();
        req.assert('qtd_produto', 'qtd_produto é obrigatório').notEmpty();
        req.assert('txt_observacao', 'txt_observacao é obrigatório');

        // validação dos erros verificados
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
            cod_comanda = req.body.cod_comanda,
            cod_produto = req.body.cod_produto,
            qtd_produto = req.body.qtd_produto,
            txt_observacao = req.body.txt_observacao;

        // obtem conexao com o DB
        req.getConnection(function(err, conn) {
            if (err) {
                console.log("Nao foi possivel conectar ao Banco de Dados");
                console.log(err);
                return next("ErroConexaoBD");
            }
            // envia a query ao DB
            var query = conn.query('CALL pr_realizar_pedido(?, ?, ?, ?, ?);', [codEstabelecimento, cod_comanda, cod_produto, qtd_produto, txt_observacao],
                function(err, rows) {
                    if (err) {
                        console.log(err);
                        resposta = {
                            error: 'ParametroNaoEncontrado'
                        };
                        res.status(422);
                        res.json(resposta);
                        return;
                    }
                    if (rows[0][0]) { // valida se recebeu a resposta
                        console.log("Codigo do pedido realizado:", rows[0][0].cod_pedido);
                        res.status(201);
                        res.json({
                            cod_pedido: rows[0][0].cod_pedido
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
    var consultarPedidos = function(req, res) {
        var resposta;

        // verificando se todos os parametros foram recebidos
        req.assert('codEstabelecimento', 'CodEstabelecimento é obrigatório').notEmpty().isAlpha();
        req.assert('cod_comanda', 'cod_comanda é obrigatório').notEmpty().isInt();

        // validação dos erros verificados
        var errors = req.validationErrors();
        if (errors) {
            resposta = {
                error: 'ParametrosInvalidos'
            };
            res.status(422);
            res.json(resposta);
            return;
        }

        // dados para a busca
        var codEstabelecimento = req.params.codEstabelecimento,
            cod_comanda = req.params.cod_comanda;

        // obtem conexao com o DB
        req.getConnection(function(err, conn) {
            if (err) {
                console.log("Nao foi possivel conectar ao Banco de Dados");
                console.log(err);
                return next("ErroConexaoBD");
            }
            // envia a query ao DB
            var query = conn.query('CALL pr_consultar_pedido(?, ?);', [codEstabelecimento, cod_comanda],
                function(err, rows) {
                    if (err) {
                        console.log(err);
                        resposta = {
                            error: 'ParametroNaoEncontrado'
                        };
                        res.status(422);
                        res.json(resposta);
                        return;
                    }
                    console.log("Pedidos encontrados:", rows.length);
                    resposta = rows[0];
                    res.status(200);
                    res.json(resposta);
                });
        });
    };

    return {
        realizarPedido: realizarPedido,
        consultarPedidos: consultarPedidos
    };
};

module.exports = pedidoController;