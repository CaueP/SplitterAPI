var pedidoController = function() {

    /**
     * Função para consultar pedidos em uma comanda
     * @param {*} req 
     * @param {*} res 
     */
    var consultarPedidos = function(req, res) {
        var resposta;

        // verificando se todos os parametros foram recebidos
        req.assert('codEstabelecimento', 'CodEstabelecimento é obrigatório').notEmpty().isAlpha();

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
        var codEstabelecimento = req.params.codEstabelecimento;

        // obtem conexao com o DB
        req.getConnection(function(err, conn) {
            if (err) {
                //console.log("Nao foi possivel conectar ao Banco de Dados");
                //console.log(err);
                return next("ErroConexaoBD");
            }
            // envia a query ao DB
            var query = conn.query('SELECT A.cod_pedido, B.nome_produto, A.qtd_produto, B.link_img_produto, A.cod_status_pedido, A.val_a_pagar, A.val_pedido, A.txt_observacao FROM tb_pedido AS A INNER JOIN tb_produto AS B ON A.cod_produto = B.cod_produto AND B.cod_estabelecimento = (SELECT B.cod_estabelecimento FROM tb_estabelecimento AS B WHERE B.id_associacao_estabelecimento = ?);;', [codEstabelecimento],
                function(err, rows) {
                    if (err) {
                        //console.log(err);
                        resposta = {
                            error: 'ParametroNaoEncontrado'
                        };
                        res.status(422);
                        res.json(resposta);
                        return;
                    }
                    //console.log("Pedidos encontrados:", rows.length);
                    resposta = rows[0];
                    res.status(200);
                    //console.log(resposta);
                    res.json(resposta);
                });
        });
    };

    return {
        consultarPedidos: consultarPedidos
    };
};

module.exports = pedidoController;