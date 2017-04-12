var assert = require('assert');
var should = require('should');
var sinon = require('sinon');


describe("Check-in", function(){

    describe("Realização de Check-in sem informação do usuário", function () {
        var req, res;
        before(function(){
            // criando o request
            req = {
                body: {         
                    mesa: {
                        qrCode: '001BARBRAHMA',
                        nrMesa: '001',
                        codEstabelecimento: 'BARBRAHMA'
                    }
                }
            };
            // criando a resposta
           res = {
                status: sinon.spy(),
                send: sinon.spy(),
                json:  sinon.spy()
            };

            var checkinController = require('../src/controllers/checkinController')();
            checkinController.realizarCheckin(req, res);
        });

        it("Response status 400", function () {
            res.status.calledWith(400).should.equal(true, 'Bad status: ' + res.status.args[0][0]);
        }); 

        it("Check-in não realizado", function () {
            assert(!res.json.args[0][0].isSucesso, res.json.args[0][0].error)
        });

        it("Error: 'usuario invalido'", function () {
            assert.equal(res.json.args[0][0].error, 'UsuarioInvalido', 'Erro: ' + res.json.args[0][0].error)
        });
    });

        describe("Realização de Check-in sem informação da mesa", function () {
        var req, res;
        before(function(){
            // criando o request
            req = {
                body: {
                    usuario: {
                        email: 'caue.polimanti@gmail.com'
                    }
                }
            };
            // criando a resposta
           res = {
                status: sinon.spy(),
                send: sinon.spy(),
                json:  sinon.spy()
            };

            var checkinController = require('../src/controllers/checkinController')();
            checkinController.realizarCheckin(req, res);
        });

        it("Response status 400", function () {
            res.status.calledWith(400).should.equal(true, 'Bad status: ' + res.status.args[0][0]);
        }); 

        it("Check-in não realizado", function () {
            assert(!res.json.args[0][0].isSucesso, res.json.args[0][0].error)
        });

        it("Error: 'mesa invalida'", function () {
            assert.equal(res.json.args[0][0].error, 'MesaInvalida', 'Erro: ' + res.json.args[0][0].error)
        });
    });

    describe("Realização de Check-in com mesa livre", function () {

        var req, res;
        before(function(){
             // criando o request
            req = {
                body: {
                    usuario: {
                        email: 'caue.polimanti@gmail.com'
                    },
                    mesa: {
                        qrCode: '001BARBRAHMA',
                        nrMesa: '001',
                        codEstabelecimento: 'BARBRAHMA'
                    }
                }
            };
            // criando a resposta
           res = {
                status: sinon.spy(),
                send: sinon.spy(),
                json:  sinon.spy()
            };

            var checkinController = require('../src/controllers/checkinController')();
            checkinController.realizarCheckin(req, res);
        });

        it("Response status 201", function () {
            res.status.calledWith(201).should.equal(true, 'Bad status: ' + res.status.args[0][0]);
        });     

        it("res.json called", function () {
            assert(res.json.called);
        });   

        it("Check-in realizado com sucesso", function () {
            assert(res.json.args[0][0].isSucesso, res.json.args[0][0].error)
        });
        
        it("Retorna QR Code Mesa ocupada", function () {
           assert(res.json.args[0][0].mesa.qrCodeOcupado, res.json.args[0][0].error);
        });  

        it("Retorna Mesa", function () {
           assert(res.json.args[0][0].mesa.nrMesa, res.json.args[0][0].error);
        }); 

        it("isPrimeiroUsuario = true", function () {
           assert(res.json.args[0][0].isPrimeiroUsuario, res.json.args[0][0].error);
        }); 

    });

    describe("Realização de Check-in com mesa ocupada, sem QR code mesa ocupada", function () {

        var req, res;
        before(function(){
             // criando o request
            req = {
                body: {
                    usuario: {
                        email: 'caue.polimanti@gmail.com'
                    },
                    mesa: {
                        qrCode: '001BARBRAHMA',
                        nrMesa: '001',
                        codEstabelecimento: 'BARBRAHMA'
                    }
                }
            };
            // criando a resposta
           res = {
                status: sinon.spy(),
                send: sinon.spy(),
                json:  sinon.spy()
            };

            var checkinController = require('../src/controllers/checkinController')();
            checkinController.realizarCheckin(req, res);
        });

        it("Response status 200", function () {
            res.status.calledWith(200).should.equal(true, 'Bad status: ' + res.status.args[0][0]);
        });     

        it("res.json called", function () {
            assert(res.json.called);
        });   

        it("Check-in não realizado", function () {
            assert(!res.json.args[0][0].isSucesso, res.json.args[0][0].error)
        });

        it("Retorna Usuario Responsavel pela Mesa", function () {
           assert(res.json.args[0][0].mesa.usuarioResponsavel, res.json.args[0][0].error);
        }); 

        it("Retorna número da Mesa", function () {
           assert(res.json.args[0][0].mesa.nrMesa, res.json.args[0][0].error);
        }); 

        it("isPrimeiroUsuario = false", function () {
           assert(!res.json.args[0][0].isPrimeiroUsuario, res.json.args[0][0].error);
        }); 

        it("Error = 'mesa ocupada'", function () {
           assert.equal(res.json.args[0][0].error, 'MesaOcupada', res.json.args[0][0].error);
        });

    });

    describe("Realização de Check-in com mesa ocupada, com QR code mesa ocupada", function () {

        var req, res;
        before(function(){
             // criando o request
            req = {
                body: {
                    usuario: {
                        email: 'caue.polimanti@gmail.com'
                    },
                    mesa: {
                        qrCode: '001BARBRAHMAcaue.polimanti@gmail.com',
                        nrMesa: '001',
                        codEstabelecimento: 'BARBRAHMA'
                    }
                }
            };
            // criando a resposta
           res = {
                status: sinon.spy(),
                send: sinon.spy(),
                json:  sinon.spy()
            };

            var checkinController = require('../src/controllers/checkinController')();
            checkinController.realizarCheckin(req, res);
        });

        it("Response status 200", function () {
            res.status.calledWith(200).should.equal(true, 'Bad status: ' + res.status.args[0][0]);
        });     

        it("res.json called", function () {
            assert(res.json.called);
        });   

        it("Check-in realizado", function () {
            assert(res.json.args[0][0].isSucesso, res.json.args[0][0].error)
        });

        it("Retorna Usuario Responsavel pela Mesa", function () {
           assert(res.json.args[0][0].mesa.usuarioResponsavel, res.json.args[0][0].error);
        }); 

        it("Retorna número da Mesa", function () {
           assert(res.json.args[0][0].mesa.nrMesa, res.json.args[0][0].error);
        }); 

        it("isPrimeiroUsuario = false", function () {
           assert(!res.json.args[0][0].isPrimeiroUsuario, res.json.args[0][0].error);
        });

    });


});