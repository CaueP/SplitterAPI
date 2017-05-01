// test libs
var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');
var should = chai.should();

chai.use(chaiHttp);


describe("API Check-in", function() {
    describe("Realização de Check-in com dados válidos", () => {
        it("Realização de Check-in sem informação do usuário", (done) => {
            // criando o request
            var checkin = {
                mesa: {
                    qrCode: '001BARFRAN',
                    nrMesa: 1,
                    codEstabelecimento: 'BARFRAN'
                }
            };
            chai.request(app)
                .post('/api/checkin')
                .send(checkin)
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.should.be.a('object');
                    res.body.should.have.property('isSucesso').eql(false);
                    res.body.should.have.property('error').eql('UsuarioInvalido');
                    done();
                });
        });

        it("Realização de Check-in sem informação da mesa", (done) => {
            // criando o request
            var checkin = {
                usuario: {
                    email: 'ana_maria@gmail.com'
                }
            };
            chai.request(app)
                .post('/api/checkin')
                .send(checkin)
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.should.be.a('object');
                    res.body.should.have.property('isSucesso').eql(false);
                    res.body.should.have.property('error').eql('MesaInvalida');
                    done();
                });
        });

        it("Realização de Check-in com informações de mesa inexistente", (done) => {
            // criando o request
            var checkin = {
                usuario: {
                    email: 'ana_maria@gmail.com'
                },
                mesa: {
                    qrCode: '001BARINEXISTENTE',
                    nrMesa: 30,
                    codEstabelecimento: 'BARINEXISTENTE'
                }
            };
            chai.request(app)
                .post('/api/checkin')
                .send(checkin)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    res.body.should.have.property('isSucesso').eql(false);
                    res.body.should.have.property('error').eql('MesaNaoEncontrada');
                    done();
                });
        });

    });

    describe("Realização de Check-in em mesa livre", () => {

        // desocupa a mesa antes de realizar checkin
        before((done) => {
            // criando o request
            var desocupaMesa = {
                usuario: {
                    email: 'ana_maria@gmail.com'
                },
                mesa: {
                    qrCode: '001BARFRAN',
                    nrMesa: 1,
                    novoStatus: "Vazio",
                    codEstabelecimento: 'BARFRAN'
                }
            };
            // envia request para desocupar a mesa
            chai.request(app)
                .put('/api/checkin')
                .send(desocupaMesa)
                .end((err, res) => {
                    res.body.should.be.a('object');
                    res.body.should.have.property('alterado').eql(true);
                    res.body.should.have.property('nrNovoStatus').eql(0);
                    done();
                });
        });

        it("Com dados válidos", (done) => {
            // criando o request
            var checkin = {
                usuario: {
                    email: 'ana_maria@gmail.com'
                },
                mesa: {
                    qrCode: '001BARFRAN',
                    nrMesa: 1,
                    codEstabelecimento: 'BARFRAN'
                }
            };
            chai.request(app)
                .post('/api/checkin')
                .send(checkin)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('isSucesso').eql(true);
                    res.body.should.have.property('mesa');
                    res.body.mesa.should.have.property('codEstabelecimento');
                    res.body.mesa.should.have.property('qrCodeOcupado');
                    res.body.mesa.should.have.property('nrMesa');
                    res.body.should.have.property('isPrimeiroUsuario').eql(true);
                    done();
                });
        });

    });

    describe("Realização de Check-in em mesa ocupada", () => {
        // ocupa a mesa antes de realizar checkin
        before((done) => {
            // criando o objeto para ocupar a mesa
            var ocupaMesa = {
                usuario: {
                    email: 'ana_maria@gmail.com'
                },
                mesa: {
                    qrCode: '001BARFRANana_maria@gmail.com',
                    nrMesa: 1,
                    novoStatus: "Ocupado",
                    codEstabelecimento: 'BARFRAN'
                }
            };
            // envia request para desocupar a mesa
            chai.request(app)
                .put('/api/checkin')
                .send(ocupaMesa)
                .end((err, res) => {
                    res.body.should.be.a('object');
                    res.body.should.have.property('alterado').eql(true);
                    res.body.should.have.property('nrNovoStatus').eql(1);
                    done();
                });
        });



        it("Com QR code mesa ocupada", (done) => {
            // criando o request
            var checkinOcupado = {
                usuario: {
                    email: 'paulo_paulo@gmail.com'
                },
                mesa: {
                    qrCode: '001BARFRANana_maria@gmail.com',
                    nrMesa: 1,
                    codEstabelecimento: 'BARFRAN'
                }
            };
            chai.request(app)
                .post('/api/checkin')
                .send(checkinOcupado)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('isSucesso').eql(true);
                    res.body.should.have.property('comanda');
                    res.body.comanda.should.have.property('codComanda');
                    res.body.mesa.should.have.property('codEstabelecimento');
                    res.body.mesa.should.have.property('nrMesa');
                    res.body.mesa.should.have.property('usuarioResponsavel');
                    res.body.should.have.property('mesa');
                    res.body.should.have.property('isPrimeiroUsuario').eql(false);
                    done();
                });
        });

        it("Sem QR code mesa ocupada", (done) => {
            // criando o request
            var checkinOcupado = {
                usuario: {
                    email: 'paulo_paulo@gmail.com'
                },
                mesa: {
                    qrCode: '001BARFRAN',
                    nrMesa: 1,
                    codEstabelecimento: 'BARFRAN'
                }
            };
            chai.request(app)
                .post('/api/checkin')
                .send(checkinOcupado)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    // "Check-in realizado com sucesso"
                    res.body.should.have.property('isSucesso').eql(false);
                    res.body.should.have.property('mesa');
                    res.body.mesa.should.have.property('nrMesa');
                    res.body.mesa.should.have.property('usuarioResponsavel');
                    res.body.should.have.property('isPrimeiroUsuario').eql(false);
                    done();
                });
        });

    });

});