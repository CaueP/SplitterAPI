var mesaController = function() {

    /**
     * Consulta os participantes de uma mesa em um determinado estabelecimento
     * @param {*} req 
     * @param {*} res 
     */
    var consultarParticipantes = function(req, res) {
        var resposta;

        // verificando se todos os parametros foram recebidos
        req.assert('codEstabelecimento', 'CodEstabelecimento é obrigatório').notEmpty().isAlpha().isByteLength({ min: 0, max: 15 });
        req.assert('nrMesa', 'nrMesa é obrigatório').notEmpty().isInt();

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
            nrMesa = req.params.nrMesa;

        // obtem conexao com o DB
        req.getConnection(function(err, conn) {
            if (err) {
                console.log("Nao foi possivel conectar ao Banco de Dados");
                console.log(err);
                return next("ErroConexaoBD");
            }
            // envia a query ao DB
            var query = conn.query('CALL pr_consultar_participantes(?, ?);', [codEstabelecimento, nrMesa],
                function(err, rows) {
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
                        res.status(200);
                        res.json(rows[0]);
                    }
                });
        });
    };

    /**
     * Atualiza o tipo de divisão de uma Mesa
     * @param {*} req 
     * @param {*} res 
     */
    var atualizarTipoDivisao = function(req, res) {
        var resposta;

        // verificando se todos os parametros foram recebidos
        req.assert('codEstabelecimento', 'CodEstabelecimento é obrigatório').notEmpty().isAlpha().isByteLength({ min: 0, max: 15 });
        req.assert('nrMesa', 'nrMesa é obrigatório').notEmpty().isInt();
        req.assert('tipoDivisao', 'tipoDivisao é obrigatório').notEmpty().isInt();

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
            nrMesa = req.params.nrMesa,
            tipoDivisao = req.params.tipoDivisao;

        // obtem conexao com o DB
        req.getConnection(function(err, conn) {
            if (err) {
                console.log("Nao foi possivel conectar ao Banco de Dados");
                console.log(err);
                return next("ErroConexaoBD");
            }
            // envia a query ao DB
            var query = conn.query('CALL pr_atualiza_tipo_divisao(?, ?, ?);', [nrMesa, codEstabelecimento, tipoDivisao],
                function(err, rows) {
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
                        res.status(201);
                        console.log(rows[0][0].tipoDivisao);
                        resposta = {
                            tipoDivisao: rows[0][0].tipoDivisao
                        };
                        res.json(resposta);
                    }
                });
        });
    };


    return {
        consultarParticipantes: consultarParticipantes,
        atualizarTipoDivisao: atualizarTipoDivisao
    }

};

module.exports = mesaController;