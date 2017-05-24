-- ------------------------------------------------------------------------------------------------------------------------------
-- ------------------------------------------ POPULAÇÃO DOS STATUS E CONSTANTES -------------------------------------------------
-- ------------------------------------------------------------------------------------------------------------------------------
INSERT INTO tb_status_mesa VALUES (0, 'Vazio');
INSERT INTO tb_status_mesa VALUES (1, 'Ocupado');
INSERT INTO tb_status_mesa VALUES (2, 'Manutencao');

INSERT INTO tb_tp_parcelamento VALUES (0, 'Dinheiro');
INSERT INTO tb_tp_parcelamento VALUES (1, 'A vista');
INSERT INTO tb_tp_parcelamento VALUES (2, 'Parcelado Emissor');
INSERT INTO tb_tp_parcelamento VALUES (3, 'Parcelado Adquirente');

INSERT INTO tb_status_pagamento VALUES (0, 'Em aprovacao');
INSERT INTO tb_status_pagamento VALUES (1, 'Aprovado');
INSERT INTO tb_status_pagamento VALUES (2, 'Negado');


INSERT INTO tb_tp_divisao VALUES (0, 'Vazio');
INSERT INTO tb_tp_divisao VALUES (1, 'Mesa');
INSERT INTO tb_tp_divisao VALUES (2, 'Individual');

INSERT INTO tb_status_pedido VALUES (0, 'Realizado');
INSERT INTO tb_status_pedido VALUES (1, 'Entregue');
INSERT INTO tb_status_pedido VALUES (2, 'Finalizado');

INSERT INTO tb_tp_alimento VALUES(1, 'Aperitivos');
INSERT INTO tb_tp_alimento VALUES(2, 'Porções');
INSERT INTO tb_tp_alimento VALUES(3, 'Entradas');
INSERT INTO tb_tp_alimento VALUES(4, 'Saladas');
INSERT INTO tb_tp_alimento VALUES(5, 'Prato Principal');
INSERT INTO tb_tp_alimento VALUES(6, 'Pizzas');
INSERT INTO tb_tp_alimento VALUES(7, 'Sobremesas');
INSERT INTO tb_tp_alimento VALUES(8, 'Bebidas');

-- ------------------------------------------------------------------------------------------------------------------------------
-- ---------------------------------------------------- POPULAÇÃO DADOS ---------------------------------------------------------
-- ------------------------------------------------------------------------------------------------------------------------------

-- ----------------------------------
-- ---------- ESTABELECIMENTOS ------
-- ----------------------------------
INSERT INTO tb_estabelecimento (id_associacao_estabelecimento, nr_cnpj, dsc_razao_social, dsc_nome_fantasia, dsc_endereco, nr_telefone)
VALUES ('BARFRAN', 234235235, 'ALIMENTOS FRANCISCO', 'BAR DO FRANCISCO', 'Rua Alfredo Pujol, 101', 325423624);

INSERT INTO tb_estabelecimento (id_associacao_estabelecimento, nr_cnpj, dsc_razao_social, dsc_nome_fantasia, dsc_endereco, nr_telefone)
VALUES ('IMPBEBIDAS', 234235235, 'BEBIDAS IMPORTADAS', 'IMPORT BEBIDAS', 'Rua Vergueiro, 501', 65498422);

-- BARBRAHMA
INSERT INTO tb_estabelecimento (id_associacao_estabelecimento, nr_cnpj, dsc_razao_social, dsc_nome_fantasia, dsc_endereco, nr_telefone)
VALUES ('BARBRAHMA', 234235235, 'BAR BRAHMA', 'BAR BRAHMA', 'Rua Alfredo Pujol, 101', 325423624);

-- ----------------------------------
-- ---------- MESAS -----------------
-- ----------------------------------
-- BARFRAN
INSERT INTO tb_mesa (cod_mesa, ind_status_mesa, cod_estabelecimento, cod_qr, cod_qr_ocupado, tp_divisao, id, qtd_pessoas)
VALUES (1, 0, 2, '001BARFRAN', '001BARFRAN', 0, null, 0);

INSERT INTO tb_mesa (cod_mesa, ind_status_mesa, cod_estabelecimento, cod_qr, cod_qr_ocupado, tp_divisao, id, qtd_pessoas)
VALUES (2, 0, 2, '002BARFRAN', '002BARFRAN', 0, null, 0);

-- IMPBEBIDAS
INSERT INTO tb_mesa (cod_mesa, ind_status_mesa, cod_estabelecimento, cod_qr, cod_qr_ocupado, tp_divisao, id, qtd_pessoas)
VALUES (2, 0, 12, '001IMPBEBIDAS', '001IMPBEBIDAS', 0, null, 0);

-- BARBRAHMA
INSERT INTO tb_mesa (cod_mesa, ind_status_mesa, cod_estabelecimento, cod_qr, cod_qr_ocupado, tp_divisao, id, qtd_pessoas)
VALUES (1, 0, 22, '001BARBRAHMA', '', 0, null, 0);

-- ----------------------------------
-- ---------- CARDAPIOS -------------
-- ----------------------------------

-- BARFRAN
INSERT INTO tb_produto (nome_produto, cod_tp_alimento, dsc_produto, val_produto, link_img_produto, cod_estabelecimento)
VALUES ('Batata Frita', 2, 'Batata frita, porção de 500 gramas', 22.50, 'http://www.restaurantecozinhaitaliana.com.br/files/batata.jpg', 2);
INSERT INTO tb_produto (nome_produto, cod_tp_alimento, dsc_produto, val_produto, link_img_produto, cod_estabelecimento)
VALUES('Batata Frita Suprema', 2, 'Batata frita com cheddar, bacon e queijo ralado, porção de 500 gramas', 27.50, 'http://www.bigxpicanha.com.br/Content/Produto/Imagem/Fritas-com-Cheddar-e-Bacon-108.png', 2);
INSERT INTO tb_produto (nome_produto, cod_tp_alimento, dsc_produto, val_produto, link_img_produto, cod_estabelecimento)
VALUES ('Mini Coxinha', 2, 'Coxinhas de Frango, porção de 10 unidades', 32.00, 'http://natashopping.com.br/lojas/supermercadonata/produtos/15688/galeria/mini-coxinha-com-catupiry-cento-400x400-1.jpg', 2);
INSERT INTO tb_produto (nome_produto, cod_tp_alimento, dsc_produto, val_produto, link_img_produto, cod_estabelecimento)
VALUES ('Azeitonas', 2, 'Azeitonas (Verde ou Preta), porção de 100 gramas', 15.00, 'http://garotasfdp.com.br/wp-content/uploads/2017/02/azeitona.jpg', 2);
INSERT INTO tb_produto (nome_produto, cod_tp_alimento, dsc_produto, val_produto, link_img_produto, cod_estabelecimento)
VALUES ('Sucos', 8, 'Sucos Naturais de Uva, Manga, Goiaba, Pêssego, Maracujá', 9.00, 'http://www.seucorpoperfeito.com.br/wp-content/uploads/2015/01/sucos-funcionais-anti-acne.jpg', 2);
INSERT INTO tb_produto (nome_produto, cod_tp_alimento, dsc_produto, val_produto, link_img_produto, cod_estabelecimento)
VALUES ('Água', 8, 'Água (Natural ou Com gás)', 4.00, 'http://cdn.ecycle.com.br/images/eDicas/diaadia/garrafa-pet-agua.jpg', 2);
INSERT INTO tb_produto (nome_produto, cod_tp_alimento, dsc_produto, val_produto, link_img_produto, cod_estabelecimento)
VALUES ('Pizza Calabresa', 6, 'Pizza 8 fatias. Ingredientes: Molho, mussarela, calabresa, cebola fatiada e orégano.', 32.00, 'http://biancapizzaria.com.br/wp-content/uploads/2015/07/03-calabresa3-600x500.png', 2);
INSERT INTO tb_produto (nome_produto, cod_tp_alimento, dsc_produto, val_produto, link_img_produto, cod_estabelecimento)
VALUES ('Pizza Mussarela', 6, 'Pizza 8 fatias. Molho, mussarela, tomate em rodelas e orégano.', 28.00, 'http://biancapizzaria.com.br/wp-content/uploads/2015/07/01-mussarela7-600x500.png', 2);
INSERT INTO tb_produto (nome_produto, cod_tp_alimento, dsc_produto, val_produto, link_img_produto, cod_estabelecimento)
VALUES ('Pizza Margherita', 6, 'Pizza 8 fatias. Ingredientes: Molho, mussarela, calabresa, cebola fatiada e orégano.', 38.00, 'http://biancapizzaria.com.br/wp-content/uploads/2015/07/24-margherita3-600x500.png', 2);

-- IMPBEBIDAS
INSERT INTO tb_produto (nome_produto, cod_tp_alimento, dsc_produto, val_produto, link_img_produto, cod_estabelecimento)
VALUES('Batata Frita', 2, 'Batata frita, porção de 500 gramas', 22.50, 'http://www.restaurantecozinhaitaliana.com.br/files/batata.jpg', 12);
INSERT INTO tb_produto (nome_produto, cod_tp_alimento, dsc_produto, val_produto, link_img_produto, cod_estabelecimento)
VALUES ('Batata Frita Suprema', 2, 'Batata frita com cheddar, bacon e queijo ralado, porção de 500 gramas', 27.50, 'http://www.bigxpicanha.com.br/Content/Produto/Imagem/Fritas-com-Cheddar-e-Bacon-108.png', 12);
INSERT INTO tb_produto (nome_produto, cod_tp_alimento, dsc_produto, val_produto, link_img_produto, cod_estabelecimento)
VALUES ('Mini Coxinha', 2, 'Coxinhas de Frango, porção de 10 unidades', 32.00, 'http://natashopping.com.br/lojas/supermercadonata/produtos/15688/galeria/mini-coxinha-com-catupiry-cento-400x400-1.jpg', 12);
INSERT INTO tb_produto (nome_produto, cod_tp_alimento, dsc_produto, val_produto, link_img_produto, cod_estabelecimento)
VALUES('Azeitonas', 2, 'Azeitonas (Verde ou Preta), porção de 100 gramas', 15.00, 'http://garotasfdp.com.br/wp-content/uploads/2017/02/azeitona.jpg', 12);
INSERT INTO tb_produto (nome_produto, cod_tp_alimento, dsc_produto, val_produto, link_img_produto, cod_estabelecimento)
VALUES ('Sucos', 8, 'Sucos Naturais de Uva, Manga, Goiaba, Pêssego, Maracujá', 9.00, 'http://www.seucorpoperfeito.com.br/wp-content/uploads/2015/01/sucos-funcionais-anti-acne.jpg', 12);
INSERT INTO tb_produto (nome_produto, cod_tp_alimento, dsc_produto, val_produto, link_img_produto, cod_estabelecimento)
VALUES ('Água', 8, 'Água (Natural ou Com gás)', 4.00, 'http://cdn.ecycle.com.br/images/eDicas/diaadia/garrafa-pet-agua.jpg', 12);
INSERT INTO tb_produto (nome_produto, cod_tp_alimento, dsc_produto, val_produto, link_img_produto, cod_estabelecimento)
VALUES ('Comercial', 6, 'Bife, frango ou Calabresa com arroz, feijão, fritas e ovo', 15.00, 'http://grinvillefastfood.com.br/img/gallery/pratos/full/image22.jpg', 12);
INSERT INTO tb_produto (nome_produto, cod_tp_alimento, dsc_produto, val_produto, link_img_produto, cod_estabelecimento)
VALUES ('Contra-Filet', 6, 'Contra-Filet com arroz e fritas', 18.00, 'http://www.mouriscoforneria.com.br/images/picanha-prato.jpg', 12);
INSERT INTO tb_produto (nome_produto, cod_tp_alimento, dsc_produto, val_produto, link_img_produto, cod_estabelecimento)
VALUES ('Filet à Parmegiana', 6, 'Parmegiana com arroz e fritas', 20.00, 'https://i2.wp.com/bardohelio.com.br/wp-content/uploads/2015/08/contra-file-parmegiana.jpg?fit=988%2C659', 12);

-- BARBRAHMA
INSERT INTO tb_produto (nome_produto, cod_tp_alimento, dsc_produto, val_produto, link_img_produto, cod_estabelecimento)
VALUES('Batata Frita', 2, 'Batata frita, porção de 500 gramas', 22.50, 'http://www.restaurantecozinhaitaliana.com.br/files/batata.jpg', 22);
INSERT INTO tb_produto (nome_produto, cod_tp_alimento, dsc_produto, val_produto, link_img_produto, cod_estabelecimento)
VALUES ('Batata Frita Suprema', 2, 'Batata frita com cheddar, bacon e queijo ralado, porção de 500 gramas', 27.50, 'http://www.bigxpicanha.com.br/Content/Produto/Imagem/Fritas-com-Cheddar-e-Bacon-108.png', 22);
INSERT INTO tb_produto (nome_produto, cod_tp_alimento, dsc_produto, val_produto, link_img_produto, cod_estabelecimento)
VALUES ('Mini Coxinha', 2, 'Coxinhas de Frango, porção de 10 unidades', 32.00, 'http://natashopping.com.br/lojas/supermercadonata/produtos/15688/galeria/mini-coxinha-com-catupiry-cento-400x400-1.jpg', 22);
INSERT INTO tb_produto (nome_produto, cod_tp_alimento, dsc_produto, val_produto, link_img_produto, cod_estabelecimento)
VALUES('Azeitonas', 2, 'Azeitonas (Verde ou Preta), porção de 100 gramas', 15.00, 'http://garotasfdp.com.br/wp-content/uploads/2017/02/azeitona.jpg', 22);
INSERT INTO tb_produto (nome_produto, cod_tp_alimento, dsc_produto, val_produto, link_img_produto, cod_estabelecimento)
VALUES ('Sucos', 8, 'Sucos Naturais de Uva, Manga, Goiaba, Pêssego, Maracujá', 9.00, 'http://www.seucorpoperfeito.com.br/wp-content/uploads/2015/01/sucos-funcionais-anti-acne.jpg', 22);
INSERT INTO tb_produto (nome_produto, cod_tp_alimento, dsc_produto, val_produto, link_img_produto, cod_estabelecimento)
VALUES ('Água', 8, 'Água (Natural ou Com gás)', 4.00, 'http://cdn.ecycle.com.br/images/eDicas/diaadia/garrafa-pet-agua.jpg', 22);
INSERT INTO tb_produto (nome_produto, cod_tp_alimento, dsc_produto, val_produto, link_img_produto, cod_estabelecimento)
VALUES ('Comercial', 6, 'Bife, frango ou Calabresa com arroz, feijão, fritas e ovo', 15.00, 'http://grinvillefastfood.com.br/img/gallery/pratos/full/image22.jpg', 22);
INSERT INTO tb_produto (nome_produto, cod_tp_alimento, dsc_produto, val_produto, link_img_produto, cod_estabelecimento)
VALUES ('Contra-Filet', 6, 'Contra-Filet com arroz e fritas', 18.00, 'http://www.mouriscoforneria.com.br/images/picanha-prato.jpg', 22);
INSERT INTO tb_produto (nome_produto, cod_tp_alimento, dsc_produto, val_produto, link_img_produto, cod_estabelecimento)
VALUES ('Filet à Parmegiana', 6, 'Parmegiana com arroz e fritas', 20.00, 'https://i2.wp.com/bardohelio.com.br/wp-content/uploads/2015/08/contra-file-parmegiana.jpg?fit=988%2C659', 22);