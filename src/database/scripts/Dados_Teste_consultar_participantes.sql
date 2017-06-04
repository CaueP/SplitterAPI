INSERT INTO tb_cliente (txt_nome, nr_cpf, dt_nascimento, txt_email, nr_telefone, conta_ativa)
VALUES ('Ana Maria', 345332423, '1975-03-02', 'ana_maria@gmail.com', 67883973, 1);

INSERT INTO tb_cliente (txt_nome, nr_cpf, dt_nascimento, txt_email, nr_telefone, conta_ativa) 
VALUES ('Paulo', 6768682423, '1984-03-15', 'paulo_paulo@gmail.com', 45623256, 1);

INSERT INTO tb_cliente (txt_nome, nr_cpf, dt_nascimento, txt_email, nr_telefone, conta_ativa)
VALUES ('Francisco', 945326423, '1946-12-02', 'francisco_fran@gmail.com', 45335663, 1);

INSERT INTO tb_estabelecimento (id_associacao_estabelecimento, nr_cnpj, dsc_razao_social, dsc_nome_fantasia, dsc_endereco, nr_telefone)
VALUES ('BARFRAN', 234235235, 'ALIMENTOS FRANCISCO', 'BAR DO FRANCISCO', 'Rua Alfredo Pujol, 101', 325423624);

INSERT INTO tb_estabelecimento (id_associacao_estabelecimento, nr_cnpj, dsc_razao_social, dsc_nome_fantasia, dsc_endereco, nr_telefone)
VALUES ('IMPBEBIDAS', 234235235, 'BEBIDAS IMPORTADAS', 'IMPORT BEBIDAS', 'Rua Vergueiro, 501', 65498422);

INSERT INTO tb_status_mesa VALUES (0, 'Vazio');
INSERT INTO tb_status_mesa VALUES (1, 'Ocupado');
INSERT INTO tb_status_mesa VALUES (2, 'Manutencao');

INSERT INTO tb_tp_parcelamento VALUES (0, 'Dinheiro');
INSERT INTO tb_tp_parcelamento VALUES (1, 'A vista');
INSERT INTO tb_tp_parcelamento VALUES (2, 'Parcelado Emissor');
INSERT INTO tb_tp_parcelamento VALUES (2, 'Parcelado Adquirente');

INSERT INTO tb_status_pagamento VALUES (0, 'Em aprovacao');
INSERT INTO tb_status_pagamento VALUES (1, 'Aprovado');
INSERT INTO tb_status_pagamento VALUES (2, 'Negado');


INSERT INTO tb_tp_divisao VALUES (0, 'Vazio');
INSERT INTO tb_tp_divisao VALUES (1, 'Mesa');
INSERT INTO tb_tp_divisao VALUES (2, 'Individual');

INSERT INTO tb_status_pedido VALUES (0, 'Realizado');
INSERT INTO tb_status_pedido VALUES (1, 'Entregue');
INSERT INTO tb_status_pedido VALUES (2, 'Finalizado');


INSERT INTO tb_mesa (cod_mesa, ind_status_mesa, cod_estabelecimento, cod_qr, cod_qr_ocupado, tp_divisao, id, qtd_pessoas)
VALUES (1, 0, 1, '82374234', '8237423495', 0, null, 0);

INSERT INTO tb_mesa (cod_mesa, ind_status_mesa, cod_estabelecimento, cod_qr, cod_qr_ocupado, tp_divisao, id, qtd_pessoas)
VALUES (1, 0, 2, '45633453', '34536356', 0, null, 0);

INSERT INTO tb_mesa (cod_mesa, ind_status_mesa, cod_estabelecimento, cod_qr, cod_qr_ocupado, tp_divisao, id, qtd_pessoas)
VALUES (2, 0, 1, '45543453', '', 0, null, 0);


INSERT INTO tb_tp_alimento VALUES(1, 'Aperitivos');
INSERT INTO tb_tp_alimento VALUES(2, 'Porções');
INSERT INTO tb_tp_alimento VALUES(3, 'Entradas');
INSERT INTO tb_tp_alimento VALUES(4, 'Saladas');
INSERT INTO tb_tp_alimento VALUES(5, 'Prato Principal');
INSERT INTO tb_tp_alimento VALUES(6, 'Pizzas');
INSERT INTO tb_tp_alimento VALUES(7, 'Sobremesas');
INSERT INTO tb_tp_alimento VALUES(8, 'Bebidas');


INSERT INTO tb_produto (nome_produto, cod_tp_alimento, dsc_produto, val_produto, link_img_produto, cod_estabelecimento)
VALUES ('Batata Frita', 2, 'Batata frita, porção de 500 gramas', 22.50, 'http://www.restaurantecozinhaitaliana.com.br/files/batata.jpg', 1);
INSERT INTO tb_produto (nome_produto, cod_tp_alimento, dsc_produto, val_produto, link_img_produto, cod_estabelecimento)
VALUES('Batata Frita Suprema', 2, 'Batata frita com cheddar, bacon e queijo ralado, porção de 500 gramas', 27.50, 'http://www.bigxpicanha.com.br/Content/Produto/Imagem/Fritas-com-Cheddar-e-Bacon-108.png', 1);
INSERT INTO tb_produto (nome_produto, cod_tp_alimento, dsc_produto, val_produto, link_img_produto, cod_estabelecimento)
VALUES ('Mini Coxinha', 2, 'Coxinhas de Frango, porção de 10 unidades', 32.00, 'http://natashopping.com.br/lojas/supermercadonata/produtos/15688/galeria/mini-coxinha-com-catupiry-cento-400x400-1.jpg', 1);
INSERT INTO tb_produto (nome_produto, cod_tp_alimento, dsc_produto, val_produto, link_img_produto, cod_estabelecimento)
VALUES ('Azeitonas', 2, 'Azeitonas (Verde ou Preta), porção de 100 gramas', 15.00, 'http://garotasfdp.com.br/wp-content/uploads/2017/02/azeitona.jpg', 1);
INSERT INTO tb_produto (nome_produto, cod_tp_alimento, dsc_produto, val_produto, link_img_produto, cod_estabelecimento)
VALUES ('Sucos', 8, 'Sucos Naturais de Uva, Manga, Goiaba, Pêssego, Maracujá', 9.00, 'http://www.seucorpoperfeito.com.br/wp-content/uploads/2015/01/sucos-funcionais-anti-acne.jpg', 1);
INSERT INTO tb_produto (nome_produto, cod_tp_alimento, dsc_produto, val_produto, link_img_produto, cod_estabelecimento)
VALUES ('Água', 8, 'Água (Natural ou Com gás)', 4.00, 'http://cdn.ecycle.com.br/images/eDicas/diaadia/garrafa-pet-agua.jpg', 1);
INSERT INTO tb_produto (nome_produto, cod_tp_alimento, dsc_produto, val_produto, link_img_produto, cod_estabelecimento)
VALUES ('Pizza Calabresa', 6, 'Pizza 8 fatias. Ingredientes: Molho, mussarela, calabresa, cebola fatiada e orégano.', 32.00, 'http://biancapizzaria.com.br/wp-content/uploads/2015/07/03-calabresa3-600x500.png', 1);
INSERT INTO tb_produto (nome_produto, cod_tp_alimento, dsc_produto, val_produto, link_img_produto, cod_estabelecimento)
VALUES ('Pizza Mussarela', 6, 'Pizza 8 fatias. Molho, mussarela, tomate em rodelas e orégano.', 28.00, 'http://biancapizzaria.com.br/wp-content/uploads/2015/07/01-mussarela7-600x500.png', 1);
INSERT INTO tb_produto (nome_produto, cod_tp_alimento, dsc_produto, val_produto, link_img_produto, cod_estabelecimento)
VALUES ('Pizza Margherita', 6, 'Pizza 8 fatias. Ingredientes: Molho, mussarela, calabresa, cebola fatiada e orégano.', 38.00, 'http://biancapizzaria.com.br/wp-content/uploads/2015/07/24-margherita3-600x500.png', 1);

INSERT INTO tb_produto (nome_produto, cod_tp_alimento, dsc_produto, val_produto, link_img_produto, cod_estabelecimento)
VALUES('Batata Frita', 2, 'Batata frita, porção de 500 gramas', 22.50, 'http://www.restaurantecozinhaitaliana.com.br/files/batata.jpg', 2);
INSERT INTO tb_produto (nome_produto, cod_tp_alimento, dsc_produto, val_produto, link_img_produto, cod_estabelecimento)
VALUES ('Batata Frita Suprema', 2, 'Batata frita com cheddar, bacon e queijo ralado, porção de 500 gramas', 27.50, 'http://www.bigxpicanha.com.br/Content/Produto/Imagem/Fritas-com-Cheddar-e-Bacon-108.png', 2);
INSERT INTO tb_produto (nome_produto, cod_tp_alimento, dsc_produto, val_produto, link_img_produto, cod_estabelecimento)
VALUES ('Mini Coxinha', 2, 'Coxinhas de Frango, porção de 10 unidades', 32.00, 'http://natashopping.com.br/lojas/supermercadonata/produtos/15688/galeria/mini-coxinha-com-catupiry-cento-400x400-1.jpg', 2);
INSERT INTO tb_produto (nome_produto, cod_tp_alimento, dsc_produto, val_produto, link_img_produto, cod_estabelecimento)
VALUES('Azeitonas', 2, 'Azeitonas (Verde ou Preta), porção de 100 gramas', 15.00, 'http://garotasfdp.com.br/wp-content/uploads/2017/02/azeitona.jpg', 2);
INSERT INTO tb_produto (nome_produto, cod_tp_alimento, dsc_produto, val_produto, link_img_produto, cod_estabelecimento)
VALUES ('Sucos', 8, 'Sucos Naturais de Uva, Manga, Goiaba, Pêssego, Maracujá', 9.00, 'http://www.seucorpoperfeito.com.br/wp-content/uploads/2015/01/sucos-funcionais-anti-acne.jpg', 2);
INSERT INTO tb_produto (nome_produto, cod_tp_alimento, dsc_produto, val_produto, link_img_produto, cod_estabelecimento)
VALUES ('Água', 8, 'Água (Natural ou Com gás)', 4.00, 'http://cdn.ecycle.com.br/images/eDicas/diaadia/garrafa-pet-agua.jpg', 2);
INSERT INTO tb_produto (nome_produto, cod_tp_alimento, dsc_produto, val_produto, link_img_produto, cod_estabelecimento)
VALUES ('Comercial', 6, 'Bife, frango ou Calabresa com arroz, feijão, fritas e ovo', 15.00, 'http://grinvillefastfood.com.br/img/gallery/pratos/full/image22.jpg', 2);
INSERT INTO tb_produto (nome_produto, cod_tp_alimento, dsc_produto, val_produto, link_img_produto, cod_estabelecimento)
VALUES ('Contra-Filet', 6, 'Contra-Filet com arroz e fritas', 18.00, 'http://www.mouriscoforneria.com.br/images/picanha-prato.jpg', 2);
INSERT INTO tb_produto (nome_produto, cod_tp_alimento, dsc_produto, val_produto, link_img_produto, cod_estabelecimento)
VALUES ('Filet à Parmegiana', 6, 'Parmegiana com arroz e fritas', 20.00, 'https://i2.wp.com/bardohelio.com.br/wp-content/uploads/2015/08/contra-file-parmegiana.jpg?fit=988%2C659', 2);


-- CHAMADAS
CALL pr_consultar_status_mesa (1, 'BARFRAN');
CALL pr_consultar_status_mesa (1, 'IMPBEBIDAS');
CALL pr_consultar_status_mesa (2, 'BARFRAN');

-- email, tp_divisao, cod_qr_ocupado, id_associacao_estabelecimento, cod_mesa
CALL pr_associar_cliente_mesa ('ana_maria@gmail.com', 1, '82374234', 'BARFRAN', 1);
CALL pr_associar_cliente_mesa ('paulo_paulo@gmail.com', 1, '45633453', 'IMPBEBIDAS', 1);
-- CALL pr_associar_cliente_mesa ('paulo_paulo@gmail.com', 1, '001IMPBEBIDAS', 'IMPBEBIDAS', 1);
CALL pr_associar_cliente_mesa ('ana_maria@gmail.com', 1, '001IMPBEBIDAS', 'IMPBEBIDAS', 1);
CALL pr_associar_cliente_mesa ('paulo_paulo@gmail.com', 1, '002BARFRAN', 'BARFRAN', 2);

-- cod_mesa,id_associacao_estabelecimento, cod_qr_ocupado, ind_status_mesa INT
CALL pr_consultar_cardapio('BARFRAN');
CALL pr_consultar_cardapio('IMPBEBIDAS');

-- id_associacao_estabelecimento,cod_comanda, cod_produto,qtd_produto,txt_observacao, cod_mesa
CALL pr_realizar_pedido('BARFRAN', 1, 1, 2, 'Bem passado', 1); -- ana - FRAN
CALL pr_realizar_pedido('IMPBEBIDAS', 2, 10, 1, 'Queimada', 1); -- ana/paulo - IM
CALL pr_realizar_pedido('IMPBEBIDAS', 2, 18, 1, 'Sem cebola', 1);  -- ana/paulo - IM
CALL pr_realizar_pedido('IMPBEBIDAS', 3, 17, 2, 'Mal passado', 1); -- ana/paulo - IM
CALL pr_realizar_pedido('BARFRAN', 4, 1, 2, 'Bem passado', 2); -- paulo - FRAN
CALL pr_realizar_pedido('IMPBEBIDAS', 2, 11, 1, 'Queimada', 1); -- ana/paulo - IM


-- id_associacao_estabelecimento,cod_comanda
CALL pr_consultar_pedido('BARFRAN', 1);
CALL pr_consultar_pedido('IMPBEBIDAS', 2);


-- id_associacao_estabelecimento,cod_comanda, cod_mesa
CALL pr_fechar_comanda ('IMPBEBIDAS', 2, 1);
CALL pr_fechar_comanda ('BARFRAN', 1, 1);

CALL pr_realizar_pagamento (2, 1);
CALL pr_realizar_pagamento (1, 1);

-- id_associacao_estabelecimento,cod_comanda, cod_pedido, cod_status_pedido
CALL pr_atualizar_status_pedido('BARFRAN', 1, 1, 1);
CALL pr_atualizar_status_pedido('BARFRAN', 1, 1, 0);
CALL pr_atualizar_status_pedido('IMPBEBIDAS', 2, 2, 1);
CALL pr_atualizar_status_pedido('IMPBEBIDAS', 2, 3, 1);
CALL pr_atualizar_status_pedido('IMPBEBIDAS', 2, 2, 0);


CALL pr_atualizar_status_mesa(1, 'BARFRAN', '', 0);
CALL pr_atualizar_status_mesa(1, 'IMPBEBIDAS', '', 0);



CALL pr_consultar_participantes ('BARFRAN', 1);
CALL pr_consultar_participantes ('IMPBEBIDAS', 1);
CALL pr_consultar_participantes ('BARFRAN', 2);

