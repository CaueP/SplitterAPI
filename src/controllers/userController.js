var mysql = require('mysql');

// userController that receives a MySQL Pool Connection
var userController = function(pool) {
    var criarConta = function(req, res) {
        // Query database (connection implicitly established)
        pool.getConnection(function(err, connection) {
            // preparying query                   
            var sql = "CALL pr_criar_nova_conta (?,?,STR_TO_DATE(?,'%d/%m/%Y'),?,?,?,?,?)";
            var inserts = [req.body.nome,
                req.body.cpf,
                req.body.dataNascimento,
                req.body.email,
                req.body.telefone,
                req.body.email,
                req.body.senha,
                req.body.url_foto
            ];
            sql = mysql.format(sql, inserts);
            // Use the connection 
            connection.query(sql, function(err, results, fields) {
                // And done with the connection. 
                connection.release();
                //console.log('criarConta: ', results)
                if (!err) {
                    if (!results[0][0]) {
                        res.status(404).json('{"error": "ContaNaoCriada"}');
                    } else {
                        //console.log('usuario criado: ', req.body.email);
                        ////console.log(results);
                        req.body.contaCriada = results[0][0];
                        req.body.contaCriada.contaAtiva = Boolean(req.body.contaCriada.contaAtiva);
                        res.status(201).json(req.body.contaCriada);
                    }

                } else { // Handle error after the release. 
                    //console.log('Error while performing Query.');
                    //console.log('Error: ', err.code);
                    // verifica se o usuario ja existe
                    if (err.code = 'ER_DUP_ENTRY') {
                        //console.log('conta existente');
                        req.params.email = req.body.email;
                        req.body.contaExistente = true;
                        middlewareConta(req, res, ativarConta);
                    } else {
                        res.status(404).json({ error: "ContaNaoCriada" });
                    }
                }
            });
        });
    };

    /**
     * Consulta o banco de dados para obter uma lista com todas as contas cadastradas
     * @param {*} req 
     * @param {*} res 
     */
    var listaContas = function(req, res) {
        // Query database (connection implicitly established)

        pool.getConnection(function(err, connection) {
            if (err) {
                //console.log(err);
            } else {
                // Use the connection 
                connection.query("SELECT c.id AS id, c.txt_nome AS nome, c.nr_cpf AS cpf, DATE_FORMAT(c.dt_nascimento,'%d/%m/%Y') AS dataNascimento, c.txt_email AS email, c.nr_telefone AS telefone, c.conta_ativa AS contaAtiva FROM tb_cliente c JOIN tb_login l ON c.txt_email = l.txt_login", function(err, results, fields) {
                    // And done with the connection. 
                    connection.release();
                    if (!err) {
                        //console.log('The users are: ', results[0]);
                        res.status(200).json(results);
                    } else { // Handle error after the release. 
                        //console.log('Error while performing Query.');
                        res.send(err);
                    }
                });
            }
        });
    };

    /**
     * Middleware para intermediar todas as consultas à uma conta existente, verificando se a conta existe e encaminhando posteriormente para o método requisitado
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    var middlewareConta = function(req, res, next) {
        // Query database (connection implicitly established)
        pool.getConnection(function(err, connection) {
            if (err) {
                //console.log(err);
            } else {
                // preparying query                   
                var sql = "CALL pr_buscar_conta(?)";
                var inserts = [req.params.email];

                sql = mysql.format(sql, inserts);

                // Use the connection 
                connection.query(sql, function(err, results, fields) {
                    // And done with the connection.
                    connection.release();
                    var message;

                    if (err) { // Handle error after the release. 
                        message = {
                            error: "UsuarioNaoEncontrado"
                        };
                        //console.log('Error while performing Query.');
                        res.status(500).json(message);
                    } else {
                        if (!results[0][0]) {
                            message = {
                                error: "UsuarioNaoEncontrado"
                            };
                            //console.log('UsuarioNaoEncontrado');
                            res.status(404).json(message);
                        } else {
                            req.conta = results[0][0];
                            // convert int to boolean
                            req.conta.contaAtiva = Boolean(req.conta.contaAtiva);
                            if (req.body.contaExistente) {
                                if (req.conta.contaAtiva) {
                                    message = {
                                        error: "ContaExistente"
                                    };
                                    res.status(300).json(message);
                                } else { //encaminha para reativar a conta
                                    next(req, res);
                                }
                            } else {
                                next();
                            }
                            //res.status(200).json(results[0][0]);
                        }
                    }
                });
            }
        });
    };

    /**
     * Método de busca de uma conta específica através do email
     * @param {*} req 
     * @param {*} res 
     */
    var buscarConta = function(req, res) {
        //console.log('Conta encontrada: ', req.conta);
        res.status(200).json(req.conta);
    };

    /**
     * Método para atualizar uma conta específica através do email
     * @param {*} req 
     * @param {*} res 
     */
    var atualizarConta = function(req, res) {
        //console.log(req.conta);
        if (req.conta.contaAtiva) {
            // Query database (connection implicitly established)
            pool.getConnection(function(err, connection) {

                if (err) {
                    //res.send(err);
                    message = {
                        error: err
                    };
                    res.status(500).json(message);
                } else {
                    // preparying query                   
                    var sql = "CALL pr_atualizar_conta (?,?,STR_TO_DATE(?,'%d/%m/%Y'),?,?,?)";
                    var inserts = [req.body.nome,
                        req.body.cpf,
                        req.body.dataNascimento,
                        req.params.email,
                        req.body.telefone,
                        req.body.senha
                    ];

                    sql = mysql.format(sql, inserts);
                    ////console.log(sql);
                    // Use the connection
                    connection.query(sql, function(err, results, fields) {
                        // And done with the connection. 
                        connection.release();
                        var message;
                        if (!err) {
                            req.contaAtualizada = results[0][0];
                            req.contaAtualizada.contaAtiva = Boolean(req.contaAtualizada.contaAtiva);
                            //console.log('Conta atualizada: ', req.contaAtualizada);

                            res.status(201).json(req.contaAtualizada);
                        } else { // Handle error after the release. 
                            //console.log('Error while performing Query.');
                            //res.send(err);
                            message = {
                                error: "ContaNaoAtualizada"
                            };
                            res.status(500).json(message);
                        }
                    });
                }
            });
        } else {
            //console.log(req.conta);
            message = {
                error: "ContaDesativada"
            };
            res.status(500).json(message);
        }
    };

    /**
     * Método para desativar uma conta através do email
     * @param {*} req 
     * @param {*} res 
     */
    var desativarConta = function(req, res) {
        if (req.conta.contaAtiva) {
            // Query database (connection implicitly established)
            pool.getConnection(function(err, connection) {

                if (err) {
                    //console.log(err);
                } else {
                    // preparying query                   
                    var sql = "UPDATE tb_cliente SET conta_ativa=0 WHERE id = (SELECT id FROM tb_login WHERE txt_login = ?);";
                    var inserts = [req.params.email];

                    sql = mysql.format(sql, inserts);
                    ////console.log(sql);
                    // Use the connection 
                    connection.query(sql, function(err, results, fields) {
                        // And done with the connection. 
                        connection.release();

                        if (!err) {

                            //console.log('desativarConta: ', results);
                            message = { result: "ContaDesativada" };
                            res.status(200).json(message);
                        } else { // Handle error after the release. 
                            //console.log('Error while performing Query.');
                            //console.log('Error: ', err);
                            message = { result: "ContaNaoDesativada" };
                            res.status(404).json(message);
                        }
                    });
                }
            });
        } else {
            message = { error: "ContaDesativada" };
            res.status(404).json(message);
        }
    };

    /**
     * Método para ativar uma conta desativada. É chamado quando ocorre uma criação de conta com email vinculado à uma antiga conta inativa
     * @param {*} req 
     * @param {*} res 
     */
    var ativarConta = function(req, res) {
        var email;
        if (req.body.contaExistente) {
            email = req.body.email;
        } else {
            email = req.params.email;
        }
        // Query database (connection implicitly established)
        pool.getConnection(function(err, connection) {
            if (err) {
                //console.log(err);
            } else {
                // preparying query                   
                var sql = "UPDATE tb_cliente SET conta_ativa=1 WHERE id = (SELECT id FROM tb_login WHERE txt_login = ?);";
                var inserts = [email];

                sql = mysql.format(sql, inserts);
                ////console.log(sql);
                // Use the connection 
                connection.query(sql, function(err, results, fields) {
                    // And done with the connection. 
                    connection.release();

                    if (!err) {
                        //console.log('ativarConta: ', results)
                        //console.log('affectedRows = ', results.affectedRows);
                        if (results.affectedRows != 1) {
                            //res.status(404).send('conta existente');
                            if (req.body.contaExistente) {
                                res.status(304).json('{"error": "UsuarioExistente"}');
                            } else {
                                res.status(500).json('{"error": "ContaNaoAtivada"}');
                            }
                        } else {
                            req.conta.contaAtiva = true;
                            atualizarConta(req, res);
                        }
                    } else { // Handle error after the release. 
                        //console.log('Error while performing Query.');
                        res.send(err);
                    }
                });
            }
        });
    };

    // As we are using the revealing module pattern, we will expose the functions above on the return below
    return {
        criarConta: criarConta,
        listaContas: listaContas,
        buscarConta: buscarConta,
        atualizarConta: atualizarConta,
        desativarConta: desativarConta,
        middlewareConta: middlewareConta
    }

};
// exporta o modulo controller
module.exports = userController;