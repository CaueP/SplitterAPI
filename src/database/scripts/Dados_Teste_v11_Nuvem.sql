-- ------------------------------------------------------------------------------------------------------------------------------
-- ------------------------------------------ POPULAÇÃO DOS STATUS E CONSTANTES -------------------------------------------------
-- ------------------------------------------------------------------------------------------------------------------------------
-- Tipo de pagamento
INSERT INTO tb_tp_parcelamento VALUES (0, 'Dinheiro');
INSERT INTO tb_tp_parcelamento VALUES (1, 'A vista');
INSERT INTO tb_tp_parcelamento VALUES (2, 'Parcelado Emissor');
INSERT INTO tb_tp_parcelamento VALUES (3, 'Parcelado Adquirente');

-- Status do Pagamento
INSERT INTO tb_status_pagamento VALUES (0, 'Em aprovacao');
INSERT INTO tb_status_pagamento VALUES (1, 'Aprovado');
INSERT INTO tb_status_pagamento VALUES (2, 'Negado');

-- Status da Mesa
INSERT INTO tb_status_mesa VALUES (0, 'Vazio');
INSERT INTO tb_status_mesa VALUES (1, 'Ocupado');
INSERT INTO tb_status_mesa VALUES (2, 'Manutencao');

-- Tipo da Divisão
INSERT INTO tb_tp_divisao VALUES (1, 'Mesa');
INSERT INTO tb_tp_divisao VALUES (2, 'Individual');
INSERT INTO tb_tp_divisao VALUES (3, 'Vazio');

-- Status do Pedido
INSERT INTO tb_status_pedido VALUES (0, 'Realizado');
INSERT INTO tb_status_pedido VALUES (1, 'Entregue');
INSERT INTO tb_status_pedido VALUES (2, 'Finalizado');

-- Categorias de alimento
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
VALUES ('BARDOFRAN', 234235235, 'ALIMENTOS FRANCISCO', 'BAR DO FRANCISCO', 'Rua Alfredo Pujol, 101', 325423624);

INSERT INTO tb_estabelecimento (id_associacao_estabelecimento, nr_cnpj, dsc_razao_social, dsc_nome_fantasia, dsc_endereco, nr_telefone)
VALUES ('IMPBEBIDA', 234235235, 'BEBIDAS IMPORTADAS', 'IMPORT BEBIDAS', 'Rua Vergueiro, 501', 65498422);

-- BARBRAHMA
INSERT INTO tb_estabelecimento (id_associacao_estabelecimento, nr_cnpj, dsc_razao_social, dsc_nome_fantasia, dsc_endereco, nr_telefone)
VALUES ('BARBRAHMA', 234235235, 'Bar Brahma', 'Bar Brahma', 'Av. São João, 677 - Centro São Paulo', 325423624);

-- HAMBUERGUERIA SUJINHO
INSERT INTO tb_estabelecimento (id_associacao_estabelecimento, nr_cnpj, dsc_razao_social, dsc_nome_fantasia, dsc_endereco, nr_telefone)
VALUES ('SUJHAMBCO', 234235235, 'Hamburgueria do Sujinho', 'Hamburgueria do Sujinho', 'Rua Maceió, 64 - Consolação - São Paulo - SP', 1132311299 );

-- ----------------------------------
-- ---------- MESAS -----------------
-- ----------------------------------
-- BARDOFRAN
INSERT INTO tb_mesa (cod_mesa, ind_status_mesa, cod_estabelecimento, cod_qr, cod_qr_ocupado, tp_divisao, id, qtd_pessoas)
VALUES (1, 0, 2, '001BARDOFRAN', '', 3, null, 0);

INSERT INTO tb_mesa (cod_mesa, ind_status_mesa, cod_estabelecimento, cod_qr, cod_qr_ocupado, tp_divisao, id, qtd_pessoas)
VALUES (2, 0, 2, '002BARDOFRAN', '', 3, null, 0);

-- IMPBEBIDAS
INSERT INTO tb_mesa (cod_mesa, ind_status_mesa, cod_estabelecimento, cod_qr, cod_qr_ocupado, tp_divisao, id, qtd_pessoas)
VALUES (2, 0, 12, '001IMPBEBIDA', '', 3, null, 0);

-- BARBRAHMA
INSERT INTO tb_mesa (cod_mesa, ind_status_mesa, cod_estabelecimento, cod_qr, cod_qr_ocupado, tp_divisao, id, qtd_pessoas)
VALUES (1, 0, 22, '001BARBRAHMA', '', 3, null, 0);

INSERT INTO tb_mesa (cod_mesa, ind_status_mesa, cod_estabelecimento, cod_qr, cod_qr_ocupado, tp_divisao, id, qtd_pessoas)
VALUES (2, 0, 22, '002BARBRAHMA', '', 3, null, 0);

-- HAMBUERGUERIA SUJINHO
INSERT INTO tb_mesa (cod_mesa, ind_status_mesa, cod_estabelecimento, cod_qr, cod_qr_ocupado, tp_divisao, id, qtd_pessoas)
VALUES (1, 0, 32, '001SUJHAMBCO', '', 3, null, 0);

-- ----------------------------------
-- ---------- CARDAPIOS -------------
-- ----------------------------------

-- BARDOFRAN
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

-- HAMBUERGUERIA SUJINHO
INSERT INTO tb_produto (nome_produto, cod_tp_alimento, dsc_produto, val_produto, link_img_produto, cod_estabelecimento)
VALUES('Alagoas Burger', 5, 'Hamburguer clássico de 160g grelhado com picles de pimenta, queijo prato, maionese sujinho e alface no pão de hamburguer', 26.50, 'http://www.sujinho.com.br/hamburgueria/images/370x312_Alagoas%20Burger.jpg', 32);
INSERT INTO tb_produto (nome_produto, cod_tp_alimento, dsc_produto, val_produto, link_img_produto, cod_estabelecimento)
VALUES('Itacolomi Burger', 5, 'Hamburguer de salmão de 160g grelhado com cogumelo shitake, chapeados com molho shoyo e catupiry no pão de hamburguer', 29.50, 'http://www.sujinho.com.br/hamburgueria/images/370X312_Itacolomi%20Burger.jpg', 32);
INSERT INTO tb_produto (nome_produto, cod_tp_alimento, dsc_produto, val_produto, link_img_produto, cod_estabelecimento)
VALUES('Mathias Burger', 5, 'Hamburguer classico de 160g grelhado com lascas de cebola assada na brasa, maionese sujinho e queijo cheddar derretido no pão de hamburguer', 22.50, 'http://www.sujinho.com.br/hamburgueria/images/370x312_Mathias%20Burger.jpg', 32);
INSERT INTO tb_produto (nome_produto, cod_tp_alimento, dsc_produto, val_produto, link_img_produto, cod_estabelecimento)
VALUES('Sabará Burger', 5, 'Hamburguer de calabresa de 160g grelhado com mussarela de búfala derretida, rúcula e tomate seco no pão de hamburguer', 25.50, 'http://www.sujinho.com.br/hamburgueria/images/370x312_Sabara%20Burger.jpg', 32);
INSERT INTO tb_produto (nome_produto, cod_tp_alimento, dsc_produto, val_produto, link_img_produto, cod_estabelecimento)
VALUES('Beirute Maranhão', 5, 'Rosbife, ovo, queijo prato, presunto, alface, tomate e maionese sujinho no pão sírio', 27.50, 'http://www.sujinho.com.br/hamburgueria/images/370x312_Beirute%20Maranhao.jpg', 32);
INSERT INTO tb_produto (nome_produto, cod_tp_alimento, dsc_produto, val_produto, link_img_produto, cod_estabelecimento)
VALUES('Beirute Pará', 5, 'Filet de frango grelhado na brasa, queijo prato, presunto, alface, tomate e maionese sujinho no pão sírio', 25.90, 'http://www.sujinho.com.br/hamburgueria/images/370x312_Beirute%20Par%C3%A1.jpg', 32);
INSERT INTO tb_produto (nome_produto, cod_tp_alimento, dsc_produto, val_produto, link_img_produto, cod_estabelecimento)
VALUES('Beirute Pernambuco', 5, 'Peito de peru, mussarela de búfala, orégano, tomate seco e rúcula no pão sírio', 22.50, 'http://www.sujinho.com.br/hamburgueria/images/370x312_Beirute%20Pernambuco.jpg', 32);
INSERT INTO tb_produto (nome_produto, cod_tp_alimento, dsc_produto, val_produto, link_img_produto, cod_estabelecimento)
VALUES('Beirute Sujinho', 5, 'Filet mignon grelhado na brasa, ovo, bacon, queijo prato, presunto, alface, tomate e maionese sujinho no pão sírio', 35.50, 'http://www.sujinho.com.br/hamburgueria/images/370x312_Beirute%20Sujinho.jpg', 32);
INSERT INTO tb_produto (nome_produto, cod_tp_alimento, dsc_produto, val_produto, link_img_produto, cod_estabelecimento)
VALUES('Carpaccio Sujinho', 4, 'Finas fatias de carne bovina crua coberto de alface americana e rúcula, croutons, molho de alcaparras e queijo parmesão em lascas', 32.50, 'http://www.sujinho.com.br/hamburgueria/images/370x312_Salada%20Carpaccio.jpg', 32);
INSERT INTO tb_produto (nome_produto, cod_tp_alimento, dsc_produto, val_produto, link_img_produto, cod_estabelecimento)
VALUES('Saladão Hamburgueria', 4, 'Alface lisa, alface americana, agrião, rúcula, cenoura, pepino, tomate, palmito, queijo branco em cubos, azeitonas, torradas de alho', 30.50, 'http://www.sujinho.com.br/hamburgueria/images/370x312_salada%20Hamburgueria.jpg', 32);
INSERT INTO tb_produto (nome_produto, cod_tp_alimento, dsc_produto, val_produto, link_img_produto, cod_estabelecimento)
VALUES('Salmão Maravilha', 4, 'Alface crespa, rúcula, pepino e tomate cereja coberto com finas fatias de salmão marinado em molho a base de azeite, limão, laranja e gergelim', 33.90, 'http://www.sujinho.com.br/hamburgueria/images/370x312_Salada%20de%20Salmao.jpg', 32);
INSERT INTO tb_produto (nome_produto, cod_tp_alimento, dsc_produto, val_produto, link_img_produto, cod_estabelecimento)
VALUES('Salada de frutas', 7, 'Deliciosa salada preparada com as frutas da época', 12.00, 'http://www.sujinho.com.br/hamburgueria/images/370x312_Salada%20de%20Frutas.jpg', 32);
INSERT INTO tb_produto (nome_produto, cod_tp_alimento, dsc_produto, val_produto, link_img_produto, cod_estabelecimento)
VALUES('Loucura de Chocolate', 7, 'Chocolate com chantilly e respas de chocolate meio amargo', 17.50, 'http://www.sujinho.com.br/hamburgueria/images/370x312_Loucura%20de%20chocolate%202.jpg', 32);
INSERT INTO tb_produto (nome_produto, cod_tp_alimento, dsc_produto, val_produto, link_img_produto, cod_estabelecimento)
VALUES('Creme Papaya com Cassis', 7, 'Creme de papaya com licor de cassis', 15.50, 'http://www.sujinho.com.br/hamburgueria/images/370x312_creme%20de%20papaya.jpg', 32);
INSERT INTO tb_produto (nome_produto, cod_tp_alimento, dsc_produto, val_produto, link_img_produto, cod_estabelecimento)
VALUES('Milkshake de Nutella', 8, 'Milk Shake chocolate com nutella', 18.80, 'http://www.sujinho.com.br/hamburgueria/images/370x312_Netella%202.jpg', 32);
INSERT INTO tb_produto (nome_produto, cod_tp_alimento, dsc_produto, val_produto, link_img_produto, cod_estabelecimento)
VALUES('Nutella Hamburgueria', 8, 'Milk Shake creme com nutella', 22.50, 'http://www.sujinho.com.br/hamburgueria/images/370x312_Nutella%20Hamburgueria.jpg', 32);
