
// constantes
var MESA_OCUPADA = 'ocupada';
var MESA_LIVRE = 'livre';

// Variaveis para testar sem o banco
var nrMesa = 1;
var statusMesa = MESA_LIVRE;
var qrCode = '001BARBRAHMA';
var qrCodeOcupado = '001BARBRAHMAcaue.polimanti@gmail.com';
var usuarioResponsavel = 'caue.polimanti@gmail.com';

var checkinController = function(pool){

    var realizarCheckin = function(req, res) {
        var usuario, mesa;
        var respostaCheckin = {};

        if(req.body.usuario)
            var usuario = req.body.usuario; // informações do usuário (nome e email)
        if(req.body.mesa)
            var mesa = req.body.mesa    // informações coletadas pelo qr code da mesa (Estabelecimento e numero da mesa)
        
            console.log("Usuario recebido: " + JSON.stringify(usuario));
            console.log("Mesa recebida: " + JSON.stringify(mesa));

        // validação dos dados recebidos
        if (!usuario || !usuario.email || usuario.email == '') {
            respostaCheckin = {
                isSucesso: false,
                error: 'UsuarioInvalido'
            };
            res.status(400);
            res.json(respostaCheckin);
        } else if (!mesa 
            || !mesa.qrCode || mesa.qrCode == '' 
            || !mesa.nrMesa || mesa.nrMesa == '' 
            || !mesa.codEstabelecimento || mesa.codEstabelecimento == '') {
            respostaCheckin = {
                isSucesso: false,
                error: 'MesaInvalida'
            };
            res.status(400);
            res.json(respostaCheckin);
        } else {
            
            // consultar a mesa, para saber se mesa está ocupada

                // atualmente está mockado com os valores do cabeçalho deste arquivo
            // se mesa estiver livre, realizar checkin. Cria-se a comanda e retorna flag primeiroUsuario = true
            if(statusMesa == MESA_LIVRE) {

                respostaCheckin = {
                    isSucesso: true,
                    mesa: {
                        nrMesa: nrMesa,
                        qrCodeOcupado: mesa.qrCode + usuario.email
                    },
                    isPrimeiroUsuario: true
                }
                // ocupando a mesa manualmente
                statusMesa = MESA_OCUPADA;
                res.status(201);
                res.body = respostaCheckin;
                res.json(respostaCheckin);
            } else 
            // se mesa estiver ocupada, retornar mesa ocupada e informar que é necessário realizar check-in com pessoa x
            if (statusMesa == MESA_OCUPADA) {

                // se o codigo do id do usuario dono 
                            //e é o QR Code sem o id do usuario responsável pela mesa
                if(mesa.qrCode == qrCodeOcupado){
                    respostaCheckin = {
                        isSucesso: true,
                        mesa: {
                            nrMesa: nrMesa,
                            usuarioResponsavel: usuarioResponsavel
                        },
                        isPrimeiroUsuario: false
                    };
                    // desocupando a mesa manualmente
                    statusMesa = MESA_LIVRE;

                    res.status(200);
                    res.json(respostaCheckin);          
                } else {
                    respostaCheckin = {
                        isSucesso: false,
                        mesa: {
                            nrMesa: nrMesa,
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
                res.status(404);
                res.json(respostaCheckin); 
            }     
        }
    };

    return {
        realizarCheckin: realizarCheckin
    }
}

module.exports = checkinController;