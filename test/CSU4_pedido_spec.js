// test libs
var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');
var should = chai.should();

chai.use(chaiHttp);

describe('CSU04 - API Pedido', () => {

    /**
     * Testes de realização de pedido
     */
    describe('Realizar pedido POST /pedido', () => {
        it('Realizar um pedido sem algum campo e retornar um erro', (done) => {
            // pedido a ser enviado
            var pedido = {
                codEstabelecimento: 'BARFRAN',
                cod_produto: 6,
                qtd_produto: 1,
                txt_observacao: "Sem sal"
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

        it('Realizar um pedido e retornar o número do pedido', (done) => {
            // pedido a ser enviado
            var pedido = {
                codEstabelecimento: 'BARFRAN',
                nrMesa: 1,
                cod_comanda: 1,
                cod_produto: 6,
                qtd_produto: 1,
                txt_observacao: "Sem sal"
            };

            chai.request(app)
                .post('/api/pedido')
                .send(pedido)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('cod_pedido');
                    done();
                });
        });
    });

    /**
     * Testes de consulta de pedido 
     */
    describe('Consultar pedidos GET /pedido/:codEstabelecimento/:cod_comanda', () => {
        it('Passando parametros invalidos - deve retornar erro', (done) => {
            var codEstabelecimento = 'BARFRAN';
            var cod_comanda = 'dsada';

            chai.request(app)
                .get('/api/pedido/' + codEstabelecimento + '/' + cod_comanda)
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error').eql('ParametrosInvalidos');
                    done();
                })
        });

        it('Deve retornar os pedidos de uma comanda', (done) => {
            var codEstabelecimento = 'BARFRAN';
            var cod_comanda = 2;

            chai.request(app)
                .get('/api/pedido/' + codEstabelecimento + '/' + cod_comanda)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                })
        });
    });
});