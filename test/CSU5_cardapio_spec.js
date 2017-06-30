// test libs
var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');
var should = chai.should();

describe("CSU5 - API Cardapio", function() {

    /**
     * Testes de consulta de cardapio
     */
    describe('Consultar cardapio existente', () => {
        it('Retorna lista com os itens do cardápio', (done) => {
            var codEstabelecimento = 'BARDOFRAN';

            chai.request(app)
                .get('/api/cardapio/' + codEstabelecimento)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                })
        });
    });

    describe("Consultar cardapio informando estabelecimento inválido", function() {
        it("Retorna estabelecimento inexistente", function(done) {
            var codEstabelecimento = 'NAOEXISTE';
            chai.request(app)
                .get('/api/cardapio/' + codEstabelecimento)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.have.property('estabEncontrado').eql(false);
                    done();
                })
        });
    });
});