var assert = require('assert');
var should = require('should');
var sinon = require('sinon');
request = require('supertest'),
app = require('../app.js');
// agent executes HTTP calls on our app
var agent = request.agent(app);

describe("Cardapio", function () {
    describe("Consultar cardapio informando estabelecimento válido", function () {
        it("Retorna lista com os itens do cardápio", function (done) {
            var codEstabelecimento = 'BARFRAN';

            agent.get('/api/cardapio/' + codEstabelecimento)
                .expect(200)
                .end(function (err, results) {
                    results.body.should.have.property('cardapio');
                    done();
                });
        });
    });

    describe("Consultar cardapio informando estabelecimento inválido", function () {
        it("Retorna estabelecimento inexistente", function (done) {
            var codEstabelecimento = 'NAOEXISTE';
            agent.get('/api/cardapio/' + codEstabelecimento)
                .expect(404)
                .end(function (err, results) {
                    results.body.estabEncontrado.should.equal(false);
                    done();
                });
        });
    });
});