// test libs
var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');
var should = chai.should();


chai.use(chaiHttp);


describe('CSU09 - API Mesa', () => {

    describe('Teste de Consulta de participantes de uma mesa', () => {

        it.skip('Código de Estabelecimento inexistente deve retornar um erro', (done) => {
            var codEstabelecimento = 'NAOEXISTE';
            var nrMesa = 1;

            chai.request(app)
                .get('/api/mesa/participante' + codEstabelecimento + '/' + nrMesa)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error').eql('ParametrosInvalidos');
                    done();
                });
        });

        it('Código de Estabelecimento com número deve retornar um erro', (done) => {
            var codEstabelecimento = 21321321;
            var nrMesa = 1;

            chai.request(app)
                .get('/api/mesa/participante/' + codEstabelecimento + '/' + nrMesa)
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error').eql('ParametrosInvalidos');
                    done();
                });
        });

        it('Código de Estabelecimento com 16 caracteres deve retornar um erro', (done) => {
            var codEstabelecimento = 'ABCDEFGHIJKLMNOP'; // 16 caracteres, pois o limite é 15
            var nrMesa = 1;

            chai.request(app)
                .get('/api/mesa/participante/' + codEstabelecimento + '/' + nrMesa)
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error').eql('ParametrosInvalidos');
                    done();
                });
        });

        it('Mesa invalida deve retornar um erro', (done) => {
            var codEstabelecimento = 'BARDOFRAN';
            var nrMesa = 'e32e32dw';

            chai.request(app)
                .get('/api/mesa/participante/' + codEstabelecimento + '/' + nrMesa)
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error').eql('ParametrosInvalidos');
                    done();
                });
        });

        it('Deve retornar a lista com os participantes de uma mesa', (done) => {
            var codEstabelecimento = 'BARDOFRAN';
            var nrMesa = 1;

            chai.request(app)
                .get('/api/mesa/participante/' + codEstabelecimento + '/' + nrMesa)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    // console.log(res.body);
                    done();
                });
        });
    });

    describe('Teste de Atualização do tipo de divisão de uma mesa', () => {

        it.skip('Código de Estabelecimento inexistente deve retornar um erro', (done) => {
            var codEstabelecimento = 'NAOEXISTE';
            var nrMesa = 1;
            var tipoDivisao = 1;

            chai.request(app)
                .put('/api/mesa/' + codEstabelecimento + '/' + nrMesa + '/' + tipoDivisao)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error').eql('ParametrosInvalidos');
                    done();
                });
        });

        it('Código de Estabelecimento com número deve retornar um erro', (done) => {
            var codEstabelecimento = 21321321;
            var nrMesa = 1;
            var tipoDivisao = 1;

            chai.request(app)
                .put('/api/mesa/' + codEstabelecimento + '/' + nrMesa + '/' + tipoDivisao)
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error').eql('ParametrosInvalidos');
                    done();
                });
        });

        it('Código de Estabelecimento com 16 caracteres deve retornar um erro', (done) => {
            var codEstabelecimento = 'ABCDEFGHIJKLMNOP'; // 16 caracteres, pois o limite é 15
            var nrMesa = 1;
            var tipoDivisao = 1;

            chai.request(app)
                .put('/api/mesa/' + codEstabelecimento + '/' + nrMesa + '/' + tipoDivisao)
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error').eql('ParametrosInvalidos');
                    done();
                });
        });

        it('Mesa invalida deve retornar um erro', (done) => {
            var codEstabelecimento = 'BARDOFRAN';
            var nrMesa = 'e32e32dw';
            var tipoDivisao = 1;

            chai.request(app)
                .put('/api/mesa/' + codEstabelecimento + '/' + nrMesa + '/' + tipoDivisao)
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error').eql('ParametrosInvalidos');
                    done();
                });
        });

        it('Deve retornar o novo tipo de divisão da mesa', (done) => {
            var codEstabelecimento = 'BARDOFRAN';
            var nrMesa = 1;
            var tipoDivisao = 1;

            chai.request(app)
                .put('/api/mesa/' + codEstabelecimento + '/' + nrMesa + '/' + tipoDivisao)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('tipoDivisao').eql(tipoDivisao);
                    console.log(res.body);
                    done();
                });
        });
    });

});