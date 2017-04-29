// test libs
var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');
var should = chai.should();

chai.use(chaiHttp);

describe('Pedido', () => {

    /**
     * Testes de realização de pedido
     */
    describe('Realizar pedido POST /pedido', () => {
        it('Realizar um pedido sem algum campo e retornar um erro', (done) => {
            // pedido a ser enviado
            var pedido = {
                codEstabelecimento: 'BARFRAN',
                codProduto: 6,
                qtdProduto: 1,
                descObservacao: "Sem sal"
            };

            chai.request(app)
                .post('/api/pedido')
                .send(pedido)
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error').eql('ParametrosInvalidos');
                    done();
                });

        });

        it('Realizar um pedido realizado e retornar o número do pedido realizado', (done) => {
            // pedido a ser enviado
            var pedido = {
                codEstabelecimento: 'BARFRAN',
                codComanda: 19,
                codProduto: 6,
                qtdProduto: 1,
                descObservacao: "Sem sal"
            };

            chai.request(app)
                .post('/api/pedido')
                .send(pedido)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('codPedido');
                    done();
                });
        });
    });

    /**
     * Testes de consulta de pedido 
     */
    describe('Consultar pedidos GET /pedido/:codEstabelecimento/:codComanda', () => {
        it.skip('Deve retornar um erro', (done) => {
            var codEstabelecimento = 'BARFRAN';
            var codComanda = 1;

            chai.request(app)
                .get('/api/pedido/' + codEstabelecimento + '/' + codComanda)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error').eql('ParametrosInvalidos');
                    done();
                })
        });

        it('Deve retornar os pedidos de uma comanda', (done) => {
            var codEstabelecimento = 'BARFRAN';
            var codComanda = 1;

            chai.request(app)
                .get('/api/pedido/' + codEstabelecimento + '/' + codComanda)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(1)
                    done();
                })
        });
    });
});