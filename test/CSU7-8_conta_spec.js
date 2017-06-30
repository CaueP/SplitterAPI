// test libs
var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');
var should = chai.should();


chai.use(chaiHttp);

describe('CSU07/08 - API Conta', () => {

    describe('Teste de Consulta de Conta', () => {

        it.skip('Código de Estabelecimento inexistente deve retornar um erro', (done) => {
            var codEstabelecimento = 'NAOEXISTE';
            var codComanda = 1;

            chai.request(app)
                .get('/api/conta/' + codEstabelecimento + '/' + codComanda)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error').eql('ParametrosInvalidos');
                    done();
                });
        });

        it('Código de Estabelecimento com número deve retornar um erro', (done) => {
            var codEstabelecimento = 21321321;
            var codComanda = 1;

            chai.request(app)
                .get('/api/conta/' + codEstabelecimento + '/' + codComanda)
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error').eql('ParametrosInvalidos');
                    done();
                });
        });

        it('Código de Estabelecimento com 16 caracteres deve retornar um erro', (done) => {
            var codEstabelecimento = 'ABCDEFGHIJKLMNOP'; // 16 caracteres, pois o limite é 15
            var codComanda = 1;

            chai.request(app)
                .get('/api/conta/' + codEstabelecimento + '/' + codComanda)
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error').eql('ParametrosInvalidos');
                    done();
                });
        });

        it.skip('Comanda inexistente deve retornar um erro', (done) => {
            var codEstabelecimento = 'BARDOFRAN';
            var codComanda = 321321;

            chai.request(app)
                .get('/api/conta/' + codEstabelecimento + '/' + codComanda)
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error').eql('ParametrosInvalidos');
                    done();
                });
        });

        it('Comanda invalida deve retornar um erro', (done) => {
            var codEstabelecimento = 'BARDOFRAN';
            var codComanda = 'e32e32dw';

            chai.request(app)
                .get('/api/conta/' + codEstabelecimento + '/' + codComanda)
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error').eql('ParametrosInvalidos');
                    done();
                });
        });

        it('Deve retornar a lista com os pedidos na conta e o total', (done) => {
            var codEstabelecimento = 'BARDOFRAN';
            var codComanda = 1;

            chai.request(app)
                .get('/api/conta/' + codEstabelecimento + '/' + codComanda)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('total_individual');
                    res.body.total_individual.should.be.a('number');
                    res.body.should.have.property('total_mesa');
                    res.body.total_mesa.should.be.a('number');
                    res.body.should.have.property('pedidos');
                    res.body.pedidos.should.be.a('array');
                    console.log(res.body);
                    done();
                });
        });
    });

    describe('Teste de Fechamento de Conta', () => {
        it('Deve retornar a lista com os pedidos na conta e o total', (done) => {
            var codEstabelecimento = 'BARDOFRAN';
            var nrMesa = 1;
            var codComanda = 2;

            chai.request(app)
                .get('/api/conta/' + codEstabelecimento + '/' + nrMesa + '/' + codComanda)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('total_individual');
                    res.body.total_individual.should.be.a('number');
                    res.body.should.have.property('total_mesa');
                    res.body.total_mesa.should.be.a('number');
                    res.body.should.have.property('pedidos');
                    res.body.pedidos.should.be.a('array');
                    // console.log(res.body)
                    done();
                });
        });
    });

    describe('Teste de Pagamento de Conta', () => {
        it('Deve retornar pagamento bem sucedido', (done) => {
            var nrMesa = 1;
            var codComanda = 2;

            chai.request(app)
                .post('/api/conta/pagar/' + nrMesa + '/' + codComanda)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('pagamentoRealizado').eql(true);
                    done();
                });
        });
    });
});