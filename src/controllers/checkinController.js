var mysql = require('mysql');
var async = require('async');

// constantes
var MESA_LIVRE = 0;
var MESA_LIVRE_STRING = 'livre';
var MESA_OCUPADA = 1;
var MESA_OCUPADA_STRING = 'ocupado';
var MESA_MANUTENCAO = 2;
var TIPO_DIVISAO_VAZIO = 0;
var TIPO_DIVISAO_MESA = 1;
var TIPO_DIVISAO_INDIVIDUAL = 2;

// Variaveis para testar sem o banco
//var nrMesa = 1;
var statusMesa; // = MESA_LIVRE;
//var qrCode;     // = '001BARBRAHMA';
var qrCodeOcupado;// = '001BARBRAHMAcaue.polimanti@gmail.com';
var usuarioResponsavel;// = 'caue.polimanti@gmail.com';

var checkinController = function(pool){

    var realizarCheckin = function(req, res) {
        var usuario, mesa;
        var respostaCheckin = {};

        if(req.body.usuario)
            var usuario = req.body.usuario; // informações do usuário (nome e email)
        if(req.body.mesa)
            var mesa = req.body.mesa    // informações coletadas pelo qr code da mesa (Estabelecimento e numero da mesa)
        
            console.log("Usuario recebido: " + JSON.stringify(usuario));
            console.log("Mesa recebida: " + JSON.stringify(mesa));
 
        // validação dos dados recebidos
        if (!usuario || !usuario.email || usuario.email == '') {
            respostaCheckin = {
                isSucesso: false,
                error: 'UsuarioInvalido'
            };
            res.status(400);
            res.json(respostaCheckin);
        } else if (!mesa 
            || !mesa.qrCode || mesa.qrCode == '' 
            || !mesa.nrMesa || mesa.nrMesa == '' 
            || !mesa.codEstabelecimento || mesa.codEstabelecimento == '') {
            respostaCheckin = {
                isSucesso: false,
                error: 'MesaInvalida'
            };
            res.status(400);
            res.json(respostaCheckin);
        } else {

            
            async.series([
                function(callback){
                    pool.getConnection(function(err, connection) {
                        if(err){
                            console.log(err);
                        }
                        var sql = "CALL pr_consultar_status_mesa (?, ?);";
                        var inserts = [mesa.nrMesa, mesa.codEstabelecimento];
                        sql = mysql.format(sql, inserts);
                        // Use the connection 
                        connection.query(sql, function(err, results, fields) {
                            connection.release();
                            if(!results[0][0]){
                                callback({error: 'MesaNaoEncontrada'},null);
                            } else{
                                console.log('resultado da query: ', JSON.stringify(results));
                                callback(null, results[0][0]);
                            }
                            
                    })
                })}

            ],
            function (err, results) {
                if(err) {   // retorna o erro
                    respostaCheckin = {
                            isSucesso: false,
                            error: err.error
                    };
                    res.status(200);
                    res.json(respostaCheckin);
                } else {

                    // pega status da mesa
                    statusMesa = results[0].dsc_ind_status_mesa;

                    console.log(statusMesa);

                    // se mesa estiver livre, realizar checkin. Cria-se a comanda e retorna flag primeiroUsuario = true
                    if(statusMesa == MESA_LIVRE_STRING) {

                        associarClienteMesa(usuario, mesa, TIPO_DIVISAO_INDIVIDUAL, mesa.qrCode + usuario.email, function(error, results) {
                            if(!err) {
                                respostaCheckin = {
                                    isSucesso: true,
                                    mesa: {
                                        nrMesa: mesa.nrMesa,
                                        qrCodeOcupado: mesa.qrCode + usuario.email
                                    },
                                    isPrimeiroUsuario: true
                                }
                                res.status(201);
                                res.body = respostaCheckin;
                                res.json(respostaCheckin);
                            } else {                                
                                respostaCheckin = {
                                        isSucesso: false,
                                        error: error
                                };
                                res.status(404);
                                res.json(respostaCheckin); 
                            }
                            
                        });                        
                    } else 
                    // se mesa estiver ocupada, retornar mesa ocupada e informar que é necessário realizar check-in com pessoa x
                    if (statusMesa == MESA_OCUPADA_STRING) {
                        
                        qrCodeOcupado = results[0].cod_qr_ocupado;
                        usuarioResponsavel = results[0].txt_email;

                        // se o codigo do id do usuario dono 
                                    //e é o QR Code sem o id do usuario responsável pela mesa
                        if(mesa.qrCode == qrCodeOcupado){

                            associarClienteMesa(usuario, mesa, TIPO_DIVISAO_INDIVIDUAL, mesa.qrCode + usuarioResponsavel, function(error, results) {
                            if(!err) {
                                respostaCheckin = {
                                    isSucesso: true,
                                    mesa: {
                                        nrMesa: mesa.nrMesa,
                                        usuarioResponsavel: usuarioResponsavel
                                    },
                                    isPrimeiroUsuario: false
                                };

                                res.status(200);
                                res.json(respostaCheckin);   
                            } else {                                
                                respostaCheckin = {
                                        isSucesso: false,
                                        error: error
                                };
                                res.status(404);
                                res.json(respostaCheckin); 
                            }
                            
                        });          
                        } else {
                            respostaCheckin = {
                                isSucesso: false,
                                mesa: {
                                    nrMesa: mesa.nrMesa,
                                    usuarioResponsavel: usuarioResponsavel
                                },
                                isPrimeiroUsuario: false,
                                error: 'MesaOcupada'
                            };
                            res.status(200);
                            res.json(respostaCheckin);  
                        };
        
                    } else {
                        respostaCheckin = {
                                isSucesso: false,
                                error: 'ErroDesconhecido'
                        };
                        res.status(404);
                        res.json(respostaCheckin); 
                    }                         
                }

               
            
            });
            // consultar a mesa, para saber se mesa está ocupada
            

        }
        
        var associarClienteMesa = function(usuario, mesa, tipoDivisao, qrCodeOcupado, callback) {
            console.log(usuario, mesa, tipoDivisao, qrCodeOcupado);
            pool.getConnection(function(err, connection) {
                        if(err){
                            console.log(err);
                        }
                        //email, tp_divisao, cod_qr_ocupado, id_associacao_estabelecimento, cod_mesa
                        var sql = "CALL pr_associar_cliente_mesa (?, ?, ?, ?, ?);";
                        var inserts = [usuario.email, tipoDivisao, qrCodeOcupado, mesa.codEstabelecimento, mesa.nrMesa];
                        sql = mysql.format(sql, inserts);
                        // Use the connection 
                        connection.query(sql, function(err, results, fields) {
                            if (err) console.log("error: " + err);
                            connection.release();
                            console.log('resultado associarClienteMesa: ', JSON.stringify(results));
                            
                            return callback(null, results);
                            // if(!results[0][0]){
                            //     callback({error: 'MesaNaoEncontrada'},null);
                            // } else{
                            //     console.log('resultado da query: ', JSON.stringify(results));
                            //     callback(null, results[0][0]);
                            // }
                            
                    })
                });
        }

              
    };

    return {
        realizarCheckin: realizarCheckin
    }
}

module.exports = checkinController;