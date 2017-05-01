var mysql = require('mysql');
var async = require('async');

// constantes
var MESA_LIVRE = 0;
var MESA_LIVRE_STRING = 'Vazio';
var MESA_OCUPADA = 1;
var MESA_OCUPADA_STRING = 'Ocupado';
var MESA_MANUTENCAO = 2;
var MESA_MANUTENCAO_STRING = "Manutencao";

var TIPO_DIVISAO_VAZIO = 0;
var TIPO_DIVISAO_MESA = 1;
var TIPO_DIVISAO_INDIVIDUAL = 2;

// Variaveis para testar sem o banco
//var nrMesa = 1;
var statusMesa; // = MESA_LIVRE;
//var qrCode;     // = '001BARBRAHMA';
var qrCodeOcupado; // = '001BARBRAHMAcaue.polimanti@gmail.com';
var usuarioResponsavel; // = 'caue.polimanti@gmail.com';

var checkinController = function(pool) {

    /**
     * Middleware para validar se os valores recebidos sao válidos
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    var middleware = function(req, res, next) {
        var respostaCheckin = {};

        // validação dos dados recebidos
        if (!req.body.usuario || !req.body.usuario.email || req.body.usuario.email == '') {
            respostaCheckin = {
                isSucesso: false,
                error: 'UsuarioInvalido'
            };
            res.status(422);
            res.json(respostaCheckin);
        } else if (!req.body.mesa ||
            !req.body.mesa.qrCode || req.body.mesa.qrCode == '' ||
            !req.body.mesa.nrMesa || req.body.mesa.nrMesa == '' ||
            !req.body.mesa.codEstabelecimento || req.body.mesa.codEstabelecimento == '') {
            respostaCheckin = {
                isSucesso: false,
                error: 'MesaInvalida'
            };
            res.status(422);
            res.json(respostaCheckin);
        } else {
            console.log("Usuario recebido: " + req.body.usuario.email);
            console.log("Mesa recebida: ");
            console.log(req.body.mesa);
            next();
        }

    }

    var realizarCheckin = function(req, res) {
        var usuario, mesa;
        var respostaCheckin = {};

        if (req.body.usuario)
            var usuario = req.body.usuario; // informações do usuário (nome e email)
        if (req.body.mesa)
            var mesa = req.body.mesa // informações coletadas pelo qr code da mesa (Estabelecimento e numero da mesa)

        async.series([
                function(callback) {

                    // consultar a mesa, para saber se mesa está ocupada
                    pool.getConnection(function(err, connection) {
                        if (err) {
                            console.log(err);
                        }
                        var sql = "CALL pr_consultar_status_mesa (?, ?);";
                        var inserts = [mesa.nrMesa, mesa.codEstabelecimento];
                        sql = mysql.format(sql, inserts);
                        // Use the connection 
                        connection.query(sql, function(err, results, fields) {
                            connection.release();
                            if (!results[0][0]) {
                                callback({
                                    error: 'MesaNaoEncontrada'
                                }, null);
                            } else {
                                console.log('resultado da consulta status mesa: ', results[0][0].dsc_ind_status_mesa);
                                callback(null, results[0][0]);
                            }

                        })
                    })
                }

            ],
            function(err, results) {
                if (err) { // retorna o erro
                    respostaCheckin = {
                        isSucesso: false,
                        error: err.error
                    };
                    res.status(404);
                    res.json(respostaCheckin);
                } else {

                    // pega status da mesa
                    statusMesa = results[0].dsc_ind_status_mesa;

                    // se mesa estiver livre, realizar checkin. Cria-se a comanda e retorna flag primeiroUsuario = true
                    if (statusMesa == MESA_LIVRE_STRING) {
                        console.log('Check-in em mesa livre: ');
                        associarClienteMesa(usuario, mesa, TIPO_DIVISAO_INDIVIDUAL, mesa.qrCode + usuario.email, function(error, resultadoAssociacao) {
                            if (!err) {
                                respostaCheckin = {
                                    isSucesso: true,
                                    mesa: {
                                        codEstabelecimento: mesa.codEstabelecimento,
                                        nrMesa: mesa.nrMesa,
                                        qrCodeOcupado: mesa.qrCode + usuario.email
                                    },
                                    comanda: {
                                        cod_comanda: resultadoAssociacao.cod_comanda
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
                        if (mesa.qrCode == qrCodeOcupado) {
                            console.log('Check-in em mesa ocupada: ');
                            associarClienteMesa(usuario, mesa, TIPO_DIVISAO_INDIVIDUAL, mesa.qrCode + usuarioResponsavel, function(error, resultadoAssociacao) {
                                if (!err) {
                                    respostaCheckin = {
                                        isSucesso: true,
                                        mesa: {
                                            codEstabelecimento: mesa.codEstabelecimento,
                                            nrMesa: mesa.nrMesa,
                                            usuarioResponsavel: usuarioResponsavel
                                        },
                                        comanda: {
                                            cod_comanda: resultadoAssociacao.cod_comanda
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
                        res.status(500);
                        res.json(respostaCheckin);
                    }
                }
            });
    };

    var associarClienteMesa = function(usuario, mesa, tipoDivisao, qrCodeOcupado, callback) {
        console.log(usuario, mesa, tipoDivisao, qrCodeOcupado);
        pool.getConnection(function(err, connection) {
            if (err) {
                console.log(err);
            }
            //email, tp_divisao, cod_qr_ocupado, id_associacao_estabelecimento, cod_mesa
            var sql = "CALL pr_associar_cliente_mesa (?, ?, ?, ?, ?);";
            var inserts = [usuario.email, tipoDivisao, qrCodeOcupado, mesa.codEstabelecimento, mesa.nrMesa];
            sql = mysql.format(sql, inserts);
            // Use the connection 
            connection.query(sql, function(err, results, fields) {
                connection.release();
                if (err) {
                    console.log("associarClienteMesa error: " + err);
                    return callback(err, null);
                } else {
                    console.log('Resultado associarClienteMesa: ');
                    console.log(results[0][0])
                    return callback(null, results[0][0]);
                }
                // if(!results[0][0]){
                //     callback({error: 'MesaNaoEncontrada'},null);
                // } else{
                //     console.log('resultado da query: ', JSON.stringify(results));
                //     callback(null, results[0][0]);
                // }

            })
        });
    };


    var atualizarStatusMesa = function(req, res) {
        var usuario, mesa;
        var respostaCheckin = {};

        if (req.body.usuario)
            var usuario = req.body.usuario; // informações do usuário (nome e email)
        if (req.body.mesa)
            var mesa = req.body.mesa // informações coletadas pelo qr code da mesa (Estabelecimento e numero da mesa)
        if (!mesa.novoStatus) {

            respostaCheckin = {
                isSucesso: false,
                error: "NovoStatusInvalido"
            };
            res.status(422);
            res.json(respostaCheckin);
        }
        var nrNovoStatus;
        switch (mesa.novoStatus) {
            case MESA_OCUPADA_STRING:
                nrNovoStatus = MESA_OCUPADA;
                break;
            case MESA_LIVRE_STRING:
                nrNovoStatus = MESA_LIVRE;
                break;
            case MESA_MANUTENCAO_STRING:
                nrNovoStatus = MESA_MANUTENCAO;
                break;
        }

        pool.getConnection(function(err, connection) {
            if (err) {
                console.log(err);
            }
            //email, tp_divisao, cod_qr_ocupado, id_associacao_estabelecimento, cod_mesa
            var sql = "CALL pr_atualizar_status_mesa (?, ?, ?, ?);";
            var inserts = [mesa.nrMesa, mesa.codEstabelecimento, mesa.qrCode, nrNovoStatus];
            sql = mysql.format(sql, inserts);
            // Use the connection 
            connection.query(sql, function(err, results, fields) {
                if (err) console.log("error: " + err);
                connection.release();

                if (err) {
                    respostaCheckin = {
                        alterado: false
                    };

                    res.status(304);
                    res.json(respostaCheckin);
                } else {
                    console.log('resultado atualizarStatusMesa: ', JSON.stringify(results));
                    respostaCheckin = {
                        alterado: true,
                        nrNovoStatus: nrNovoStatus
                    };
                    console.log(respostaCheckin);
                    res.status(201);
                    res.json(respostaCheckin);
                }

            })
        });
    };

    return {
        realizarCheckin: realizarCheckin,
        middleware: middleware,
        atualizarStatusMesa
    }
}

module.exports = checkinController;