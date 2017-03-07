var mysql = require('mysql');

// userController that receives a MySQL Pool Connection
var userController = function(pool){

    var criarConta = function(req, res){
                
        // Query database (connection implicitly established)
        pool.getConnection(function(err, connection) {

            // preparying query                   
            var sql = "CALL pr_criar_nova_conta (?,?,STR_TO_DATE(?,'%d/%m/%Y'),?,?,?,?)";
            var inserts = [req.body.txt_nome, 
                                req.body.nr_cpf, 
                                req.body.dt_nascimento, 
                                req.body.txt_email, 
                                req.body.nr_telefone, 
                                req.body.txt_email, 
                                req.body.txt_senha];

            sql = mysql.format(sql, inserts);

            // Use the connection 
            connection.query(sql, function(err, results, fields) {
                // And done with the connection. 
                connection.release();

                if (!err) {
                console.log('The solution is: ', results);
                    res.send(results);
                } else { // Handle error after the release. 
                    console.log('Error while performing Query.');
                    res.send(err);
                }
            });
        });
    };

    var listaContas = function(req, res){

        // Query database (connection implicitly established)

        pool.getConnection(function(err, connection) {
            if(err) {
                console.log(err);
            }
            else {
                            // Use the connection 
            connection.query('SELECT * from tb_cliente', function(err, results, fields) {
                // And done with the connection. 
                connection.release();

                if (!err) {
                console.log('The users are: ', results);
                    res.send(results);
                } else { // Handle error after the release. 
                    console.log('Error while performing Query.');
                    res.send(err);
                }
            });
            }

        });
    };

    var buscarConta = function(req, res){
            
        // Query database (connection implicitly established)
        pool.getConnection(function(err, connection) {

            if(err) {
                console.log(err);
            }
            else {

                // preparying query                   
                var sql = "CALL pr_buscar_conta(?)";
                var inserts = [req.params.email];

                sql = mysql.format(sql, inserts);

                // Use the connection 
                connection.query(sql, function(err, results, fields) {
                    // And done with the connection. 
                    console.log(results);
                    connection.release();
                    if (!err) {
                        if (results[0] == null) {
                            console.log('Usuario inexistente');
                            res.status(404).send('usuario inexistente');                        
                        }
                        else {
                            console.log('The user is: ', results[0]);
                            res.send(results[0]);
                        }
                    
                    } else { // Handle error after the release. 
                        console.log('Error while performing Query.');
                        res.send(err);
                    }
                }); 
            }
        });
    };

    var atualizarConta = function(req, res){
            
        // Query database (connection implicitly established)
        pool.getConnection(function(err, connection) {
            
            if(err) {
                console.log(err);
            }
            else {

                // preparying query                   
                var sql = "CALL pr_atualizar_conta (?,?,STR_TO_DATE(?,'%d/%m/%Y'),?,?,?)";
                var inserts = [req.body.txt_nome, 
                                    req.body.nr_cpf, 
                                    req.body.dt_nascimento, 
                                    req.body.txt_email, 
                                    req.body.nr_telefone, 
                                    req.body.txt_senha];

                sql = mysql.format(sql, inserts);
                // Use the connection 
                connection.query(sql, function(err, results, fields) {
                    // And done with the connection. 
                    connection.release();

                    if (!err) {
                    console.log('User updated: ', results);
                        res.send(results);
                    } else { // Handle error after the release. 
                        console.log('Error while performing Query.');
                        res.send(err);
                    }
                });
            }
        });
    };

    var desativarConta = function(req, res){
            
        // Query database (connection implicitly established)
        pool.getConnection(function(err, connection) {

            if(err) {
                console.log(err);
            }
            else {

                // preparying query                   
                var sql = "UPDATE tb_cliente SET conta_ativa=0 WHERE id = (SELECT id FROM tb_login WHERE txt_login =?);";
                var inserts = [req.body.txt_email];

                sql = mysql.format(sql, inserts);
                // Use the connection 
                connection.query(sql, function(err, results, fields) {
                    // And done with the connection. 
                    connection.release();

                    if (!err) {
                    console.log('User updated: ', results);
                        res.send(results);
                    } else { // Handle error after the release. 
                        console.log('Error while performing Query.');
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
        desativarConta: desativarConta
    }

};

module.exports = userController;
