-- CREATE PROCEDURE
 DROP PROCEDURE IF EXISTS pr_atualizar_conta;


DELIMITER $$
CREATE PROCEDURE pr_atualizar_conta (
 
IN txt_novo_nome VARCHAR (100) ,
IN nr_novo_cpf BIGINT ,
IN dt_novo_nascimento DATETIME ,
IN txt_email VARCHAR (100) ,
IN nr_novo_telefone BIGINT,
IN txt_nova_senha VARCHAR (30) -- ,
-- txt_nome_cartao VARCHAR (100),
-- nr_cartao BIGINT ,
-- cod_seguranca_cartao INT ,
-- cod_rede_origem INT ,
-- dt_validade DATETIME 
)
 
 
BEGIN 

DECLARE id_consulta int;

-- Identifica o id do cliente através do seu e-mail
SET id_consulta = (SELECT id FROM tb_cliente c 
						WHERE c.txt_email = txt_email);
	
-- Atualiza os dados na tb_cliente
UPDATE tb_cliente c 
	SET c.txt_nome = txt_novo_nome, c.nr_cpf = nr_novo_cpf, c.dt_nascimento = dt_novo_nascimento, c.nr_telefone = nr_novo_telefone
    WHERE c.id = id_consulta;
    
-- Atualiza a senha na tb_login    
UPDATE tb_login l
		SET l.txt_senha = txt_nova_senha
        WHERE l.id = id_consulta;
        
CALL pr_buscar_conta(txt_email);
END $$

DELIMITER ;