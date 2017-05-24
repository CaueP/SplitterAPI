	-- CREATE PROCEDURE
    DROP PROCEDURE IF EXISTS pr_criar_nova_conta;

DELIMITER $$
CREATE PROCEDURE pr_criar_nova_conta (
 
IN txt_nome VARCHAR (100) ,
IN nr_cpf BIGINT ,
IN dt_nascimento DATETIME ,
IN txt_email VARCHAR (100) ,
IN nr_telefone BIGINT,
IN txt_login VARCHAR (30) ,
IN txt_senha VARCHAR (30) -- ,
-- txt_nome_cartao VARCHAR (100),
-- nr_cartao BIGINT ,
-- cod_seguranca_cartao INT ,
-- cod_rede_origem INT ,
-- dt_validade DATETIME 
)
 
 
BEGIN 
 
INSERT INTO tb_cliente
VALUES (null, txt_nome, nr_cpf, dt_nascimento, txt_email, nr_telefone,1);
 
INSERT INTO tb_login
VALUES (LAST_INSERT_ID(), txt_login, txt_senha);

-- SELECT MAX(id) FROM tb_cliente;
 CALL pr_buscar_conta(txt_email);
-- INSERT INTO tb_cartao
-- VALUES (id, @txt_nome_cartao, @nr_cartao, @cod_seguranca_cartao, @cod_rede_origem, @dt_validade);
 
 
END $$

DELIMITER ;