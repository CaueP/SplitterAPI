var mysql = require('mysql');

var cardapioController = function (pool) {
    var consultarCardapio = function (req, res) {
        var resposta = {};
        var error;

        pool.getConnection(function (err, connection) {
            if (err) {
                // console.log(err);
                resposta.error = err;
            } else {
                var sql = "CALL pr_consultar_cardapio(?);";
                var inserts = [req.params.codEstabelecimento];
                sql = mysql.format(sql, inserts);
                // Use the connection 
                connection.query(sql, function (err, results, fields) {
                    connection.release();
                    if (!results[0][0]) {
                        // resposta estabelecimento nao encontrado
                        error = 'EstabelecimentoNaoEncontrado'
                        resposta.error = error;
                        resposta.estabEncontrado = false;
                        res.status(404);
                    } else {
                        // console.log('resultado da query: ');
                        // console.log(JSON.stringify(results));
                        // resposta sucesso
                        resposta = results[0];
                        res.status(200);
                    }
                    
                    res.json(resposta);
                });
            }
        });
    };

    return {
        consultarCardapio: consultarCardapio
    };
};

module.exports = cardapioController;