var mesaController = function() {


    var consultarParticipantes = function(req, res) {
        var resposta;

        // verificando se todos os parametros foram recebidos
        req.assert('codEstabelecimento', 'CodEstabelecimento é obrigatório').notEmpty().isAlpha();
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
        // req.getConnection(function(err, conn) {
        //     if (err) {
        //         console.log("Nao foi possivel conectar ao Banco de Dados");
        //         console.log(err);
        //         return next("ErroConexaoBD");
        //     }
        //     // envia a query ao DB
        //     var query = conn.query('CALL pr_consultar_participantes(?, ?);', [codEstabelecimento, nrMesa],
        //         function(err, rows) {
        //             if (err) {
        //                 console.log(err);
        //                 resposta = {
        //                     error: 'ParametroNaoEncontrado'
        //                 };
        //                 res.status(422);
        //                 res.json(resposta);
        //                 return;
        //             } else {
        //                 resposta = {
        //                     pagamentoRealizado: true
        //                 };
        //                 res.status(200);
        //                 res.json(resposta);
        //             }
        //         });
        // });

        resposta = [{
                nome: "Beatriz Mesticheli",
                url_foto: 'https://scontent.fcgh7-1.fna.fbcdn.net/v/t1.0-1/c0.4.100.100/p100x100/12391996_122964501408769_3103251759682782950_n.jpg?oh=bcd396836323b0c04dcefbcb4d8e8582&oe=59DFC5B3',
                email: 'bia_mesticheli@hotmail.com',
                comanda: 20
            },
            {
                nome: "Caue Polimanti",
                url_foto: 'https://scontent.fcgh7-1.fna.fbcdn.net/v/t1.0-1/p100x100/13754231_1380859845263633_8564094324055866503_n.jpg?oh=655c2b8bb07b63dd91f91a8493a0f136&oe=59E08D8B',
                email: 'caue.polimanti@gmail.com',
                comanda: 21
            },
            {
                nome: "Victor Noronha",
                email: 'vitor_noronha@hotmail.com',
                url_foto: 'https://scontent.fcgh7-1.fna.fbcdn.net/v/t1.0-1/p100x100/16998990_1438482292840276_6045828279754066158_n.jpg?oh=47debeed48ecd09f4cefa04ab3c00d16&oe=59A2A8BB',
                comanda: 22
            }
        ];

        res.status(200);
        res.json(resposta);
    };


    return {
        consultarParticipantes: consultarParticipantes
    }

};

module.exports = mesaController;