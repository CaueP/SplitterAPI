var pedidoController = function () {

    /**
     * Função para consultar pedidos em uma comanda
     * @param {*} req 
     * @param {*} res 
     */
    var consultarConta = function (req, res) {
        var resposta;

        // verificando se todos os parametros foram recebidos e sao validos
        req.assert('codEstabelecimento', 'CodEstabelecimento é obrigatório').notEmpty().isAlpha().isByteLength({ min: 0, max: 15 });
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

                    calcularTotal(rows[0], (err, totalIndividual, totalMesa) => {
                        if (err) {
                            console.log(err);
                            resposta = {
                                error: 'ErroAoCalcular'
                            };
                            res.status(500);
                            res.json(resposta);
                            return;
                        } else {
                            if (req.body.isFecharConta) {
                                resposta = {
                                    total_individual: req.body.valorTotalIndividual,
                                    total_mesa: req.body.valorTotalMesa,
                                    pedidos: rows[0]
                                }
                                res.status(201);
                                res.json(resposta);
                            } else {
                                resposta = {
                                    total_individual: totalIndividual,
                                    total_mesa: totalMesa,
                                    pedidos: rows[0]
                                }
                                res.status(200);
                                res.json(resposta);
                            }
                        }

                    });
                });
        });
    };

    /**
     * Calcula o valor total individual e da mesa dos pedidos em uma lista de pedidos
     * @param {*} pedidos Lista de pedidos
     */
    var calcularTotal = function (pedidos, cb) {
        var totalIndividual = 0;
        var totalMesa = 0;
        for (var i = 0, len = pedidos.length; i < len; i++) {
            // console.log(pedidos[i]);
            // TODO: val_pedido deve ser alterado para o valor do pedido referente a parte do cliente
            totalIndividual = totalIndividual + pedidos[i].val_a_pagar;
            totalMesa = totalMesa + pedidos[i].val_pedido;
        }
        return cb(null, totalIndividual, totalMesa);
    }

    /**
     * Função para registrar o fechamento da comanda
     * @param {*} req 
     * @param {*} res 
     */
    var fecharConta = function (req, res) {
        var resposta;

        // verificando se todos os parametros foram recebidos
        req.assert('codEstabelecimento', 'CodEstabelecimento é obrigatório').notEmpty().isAlpha();
        req.assert('nrMesa', 'nrMesa é obrigatório').notEmpty().isInt();
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

        // parametros para a procedure
        var codEstabelecimento = req.params.codEstabelecimento,
            cod_comanda = req.params.cod_comanda,
            nrMesa = req.params.nrMesa;

        // obtem conexao com o DB
        req.getConnection(function (err, conn) {
            if (err) {
                console.log("Nao foi possivel conectar ao Banco de Dados");
                console.log(err);
                return next("ErroConexaoBD");
            }
            // envia a query ao DB

            var query = conn.query('CALL pr_fechar_comanda(?, ?, ?);', [codEstabelecimento, cod_comanda, nrMesa],
                function (err, rows) {
                    if (err) {
                        console.log(err);
                        resposta = {
                            error: 'ParametroNaoEncontrado'
                        };
                        res.status(422);
                        res.json(resposta);
                        return;
                    } else {
                        // console.log(rows);
                        // flag para indicar ao consultar conta que é um fechar conta
                        req.body.isFecharConta = true;
                        req.body.valorTotalMesa = rows[0][0].vl_total_mesa
                        req.body.valorTotalIndividual = rows[0][0].vl_total_individual
                        // console.log('')
                        // console.log('vl_total_mesa')
                        // console.log(req.body.valorTotalMesa);
                        // console.log('vl_total_individual')
                        // console.log(req.body.valorTotalIndividual);
                        consultarConta(req, res);
                    }
                });
        });
    }

    /**
     * Função para registrar o pagamento da comanda
     * @param {*} req 
     * @param {*} res 
     */
    var pagarConta = function (req, res) {
        var resposta;

        // verificando se todos os parametros foram recebidos
        req.assert('nrMesa', 'nrMesa é obrigatório').notEmpty().isInt();
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

        // parametros para a procedure
        var cod_comanda = req.params.cod_comanda,
            nrMesa = req.params.nrMesa;

        // obtem conexao com o DB
        req.getConnection(function (err, conn) {
            if (err) {
                console.log("Nao foi possivel conectar ao Banco de Dados");
                console.log(err);
                return next("ErroConexaoBD");
            }
            // envia a query ao DB
            var query = conn.query('CALL pr_realizar_pagamento(?, ?);', [cod_comanda, nrMesa],
                function (err, rows) {
                    if (err) {
                        console.log(err);
                        resposta = {
                            error: 'ParametroNaoEncontrado',
                            pagamentoRealizado: false
                        };
                        res.status(422);
                        res.json(resposta);
                        return;
                    } else {
                        resposta = {
                            pagamentoRealizado: true
                        };
                        res.status(201);
                        res.json(resposta);
                    }
                });
        });
    }

    return {
        consultarConta: consultarConta,
        fecharConta: fecharConta,
        pagarConta: pagarConta
    }
};
module.exports = pedidoController;