-- CHAMADAS
CALL pr_consultar_status_mesa (1, 'BARFRAN');
CALL pr_consultar_status_mesa (1, 'IMPBEBIDAS');
CALL pr_consultar_status_mesa (2, 'BARFRAN');

-- email, tp_divisao, cod_qr_ocupado, id_associacao_estabelecimento, cod_mesa
CALL pr_associar_cliente_mesa ('ana_maria@gmail.com', 1, '001BARFRANana_maria@gmail.com', 'BARFRAN', 1);
CALL pr_associar_cliente_mesa ('paulo_paulo@gmail.com', 1, '001IMPBEBIDAS', 'IMPBEBIDAS', 1);
-- CALL pr_associar_cliente_mesa ('paulo_paulo@gmail.com', 1, '001IMPBEBIDAS', 'IMPBEBIDAS', 1);
CALL pr_associar_cliente_mesa ('ana_maria@gmail.com', 1, '001IMPBEBIDAS', 'IMPBEBIDAS', 1);
CALL pr_associar_cliente_mesa ('paulo_paulo@gmail.com', 1, '002BARFRAN', 'BARFRAN', 2);

-- cod_mesa,id_associacao_estabelecimento, cod_qr_ocupado, ind_status_mesa INT
CALL pr_consultar_cardapio('BARFRAN');
CALL pr_consultar_cardapio('IMPBEBIDAS');

-- id_associacao_estabelecimento,cod_comanda, cod_produto,qtd_produto,txt_observacao, cod_mesa
CALL pr_realizar_pedido('BARFRAN', 1, 3, 2, 'Bem passado', 1); -- ana - FRAN
CALL pr_realizar_pedido('IMPBEBIDAS', 2, 10, 1, 'Queimada', 1); -- ana/paulo - IM
CALL pr_realizar_pedido('IMPBEBIDAS', 2, 18, 1, 'Sem cebola', 1);  -- ana/paulo - IM
CALL pr_realizar_pedido('IMPBEBIDAS', 3, 17, 2, 'Mal passado', 1); -- ana/paulo - IM
CALL pr_realizar_pedido('BARFRAN', 4, 1, 2, 'Bem passado', 2); -- paulo - FRAN
CALL pr_realizar_pedido('IMPBEBIDAS', 2, 11, 1, 'Queimada', 1); -- ana/paulo - IM


-- id_associacao_estabelecimento,cod_comanda
CALL pr_consultar_pedido('BARFRAN', 3);
CALL pr_consultar_pedido('IMPBEBIDAS', 2);

-- id_associacao_estabelecimento,cod_comanda, cod_mesa
CALL pr_fechar_comanda ('BARFRAN', 3, 1);
CALL pr_fechar_comanda ('IMPBEBIDAS', 2, 1);


-- cod_comanda INT, cod_mesa INT
CALL pr_realizar_pagamento (3, 1);
CALL pr_realizar_pagamento (1, 1);

-- id_associacao_estabelecimento,cod_comanda, cod_pedido, cod_status_pedido
CALL pr_atualizar_status_pedido('BARFRAN', 1, 1, 1);
CALL pr_atualizar_status_pedido('BARFRAN', 1, 1, 0);
CALL pr_atualizar_status_pedido('IMPBEBIDAS', 2, 2, 1);
CALL pr_atualizar_status_pedido('IMPBEBIDAS', 2, 3, 1);
CALL pr_atualizar_status_pedido('IMPBEBIDAS', 2, 2, 0);

-- cod_mesa INT, id_associacao_estabelecimento VARCHAR(50), cod_qr_ocupado VARCHAR(200), ind_status_mesa INT
CALL pr_atualizar_status_mesa(1, 'BARFRAN', '001BARFRAN', 0);
CALL pr_atualizar_status_mesa(1, 'IMPBEBIDAS', '', 0);


-- ---------
-- TESTES BARBRAHMA
-- ----------

INSERT INTO tb_cliente (txt_nome, nr_cpf, dt_nascimento, txt_email, nr_telefone, conta_ativa)
VALUES ('Caue Polimanti', 945326423, '1946-12-02', 'caue.polimanti@gmail.com', 45335663, 1);

CALL pr_consultar_status_mesa (1, 'BARBRAHMA');

-- email, tp_divisao, cod_qr_ocupado, id_associacao_estabelecimento, cod_mesa
CALL pr_associar_cliente_mesa ('caue.polimanti@gmail.com', 1, '001BARBRAHMAnovo', 'BARBRAHMA', 1);

CALL pr_consultar_cardapio('BARBRAHMA');
-- id_associacao_estabelecimento,cod_comanda, cod_produto,qtd_produto,txt_observacao, cod_mesa
CALL pr_realizar_pedido('BARBRAHMA', 2, 22, 1, 'COXINHA SQL', 1);
-- ESTAB, nr comanda
CALL pr_consultar_pedido('BARBRAHMA', 2);
-- id_associacao_estabelecimento,cod_comanda, cod_mesa
CALL pr_fechar_comanda ('BARBRAHMA', 2, 1);
-- cod_comanda INT, cod_mesa INT
CALL pr_realizar_pagamento (2, 1);

CALL pr_atualizar_status_mesa(1, 'BARBRAHMA', '001BARBRAHMA', 0);

SELECT * FROM tb_estabelecimento;
SELECT * FROM tb_mesa;
SELECT * FROM tb_comanda;
SELECT * FROM tb_pagamento;
SELECT * FROM tb_pedido;
