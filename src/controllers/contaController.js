var pedidoController = function () {

    /**
     * Função para consultar pedidos em uma comanda
     * @param {*} req 
     * @param {*} res 
     */
    var consultarConta = function (req, res) {
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
        req.getConnection(function (err, conn) {
            if (err) {
                console.log("Nao foi possivel conectar ao Banco de Dados");
                console.log(err);
                return next("ErroConexaoBD");
            }
            // envia a query ao DB
            var query = conn.query('CALL pr_consultar_pedido(?, ?);', [codEstabelecimento, cod_comanda],
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
                    // console.log("Pedidos encontrados:", rows[0].length);

                    calcularTotal(rows[0], (err, total) => {
                        if (err) {
                            console.log(err);
                            resposta = {
                                error: 'ErroAoCalcular'
                            };
                            res.status(500);
                            res.json(resposta);
                            return;
                        } else {
                            resposta = {
                                total: total,
                                pedidos: rows[0]
                            }
                            res.status(200);
                            res.json(resposta);
                        }

                    });
                });
        });
    };

    /**
     * Calcula o valor total dos pedidos em uma lista de pedidos
     * @param {*} pedidos Lista de pedidos
     */
    var calcularTotal = function (pedidos, cb) {
        var total = 0;
        for (var i = 0, len = pedidos.length; i < len; i++) {
            // console.log(pedidos[i]);
             // TODO: val_pedido deve ser alterado para o valor do pedido referente a parte do cliente
            total = total + pedidos[i].val_pedido;
        }
        return cb(null, total);
    }

    var fecharConta = function(req, res) {

    }

    return {
        consultarConta: consultarConta,
        fecharConta: fecharConta
    }
};
module.exports = pedidoController;