// test libs
var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');
var should = chai.should();


chai.use(chaiHttp);

describe('API Conta', () => {

    describe('Teste de Consulta de Conta', () => {

        it.skip('Estabelecimento inexistente deve retornar um erro', (done) => {
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

        it('Comanda invalida deve retornar um erro', (done) => {
            var codEstabelecimento = 'BARFRAN';
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
            var codEstabelecimento = 'BARFRAN';
            var codComanda = 1;

            chai.request(app)
                .get('/api/conta/' + codEstabelecimento + '/' + codComanda)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('total');
                    res.body.total.should.be.a('number');
                    res.body.should.have.property('pedidos');
                    res.body.pedidos.should.be.a('array');
                    //console.log(res.body);
                    done();
                });
        });
    });

});